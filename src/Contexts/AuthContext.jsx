import { createContext, useContext, useEffect, useState } from "react";
import { 
  auth, 
  db, 
  googleProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  updateProfile,
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
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
