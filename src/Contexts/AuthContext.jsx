import { createContext, useContext, useEffect, useState } from "react";
import { 
  auth, 
  db, 
  googleProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from "../firebase";
import { getRedirectResult } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Handle Google redirect result on page load (fallback from popup-blocked scenario)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          // User signed in via redirect – onAuthStateChanged will pick this up automatically.
          console.debug("Google redirect sign-in completed:", result.user.displayName);
        }
      })
      .catch((err) => {
        // Ignore "no redirect operation pending" which fires on normal page loads
        if (err.code !== "auth/no-auth-event") {
          console.error("Google redirect result error:", err);
        }
      });
  }, []);

  // Sync user profile document from Firestore
  useEffect(() => {
    let unsubscribeFirestore = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        const userRef = doc(db, "users", user.uid);
        
        // Ensure user document exists in Firestore
        try {
          const docSnap = await getDoc(userRef);
          if (!docSnap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              email: user.email || "",
              displayName: user.displayName || user.email?.split("@")[0] || "User",
              photoURL: user.photoURL || "",
              createdAt: new Date().toISOString(),
              points: 0,
              level: 1,
              badges: [],
              hoursWatched: 0,
              favorites: [],
              continueWatching: []
            }, { merge: true });
          }
        } catch (err) {
          console.error("Error creating/checking Firestore user document:", err);
        }

        // Listen for real-time updates to user document
        unsubscribeFirestore = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserProfile(snapshot.data());
          }
        }, (error) => {
          console.error("Firestore snapshot error:", error);
        });
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  const signup = async (email, password, displayName) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && res.user) {
      await updateProfile(res.user, { displayName });
    }
    return res;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * Google Sign-In:
   * - Tries a popup first (works on desktop and most browsers).
   * - If popup is blocked (e.g. mobile WebView / Capacitor),
   *   falls back to a full-page redirect automatically.
   */
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (err) {
      // Popup blocked or not supported — fall back to redirect
      if (
        err.code === "auth/popup-blocked" ||
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request"
      ) {
        return signInWithRedirect(auth, googleProvider);
      }
      throw err;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
