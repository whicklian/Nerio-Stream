import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db, doc, setDoc, onSnapshot, hasFirebaseConfig } from "../firebase";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { currentUser } = useAuth();

    // Sync with Firestore when logged in, or localStorage when logged out
    useEffect(() => {
        if (currentUser && db && hasFirebaseConfig) {
            const userRef = doc(db, "users", currentUser.uid);
            const unsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    if (Array.isArray(data.favorites)) {
                        setFavorites(data.favorites);
                        localStorage.setItem("favorites", JSON.stringify(data.favorites));
                    }
                }
            }, (err) => {
                console.error("Error fetching favorites from Firestore:", err);
            });

            return () => unsubscribe();
        } else {
            // Load favorites from local storage when logged out
            const storedFavs = localStorage.getItem("favorites");
            if (storedFavs) {
                try {
                    setFavorites(JSON.parse(storedFavs));
                } catch (e) {
                    setFavorites([]);
                }
            }
        }
    }, [currentUser]);

    // Save to local storage and Firestore
    const syncFavorites = async (updatedFavorites) => {
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

        if (currentUser && db && hasFirebaseConfig) {
            try {
                const userRef = doc(db, "users", currentUser.uid);
                await setDoc(userRef, { favorites: updatedFavorites }, { merge: true });
            } catch (err) {
                console.error("Failed to sync favorites to Firestore:", err);
            }
        }
    };

    const addToFavorites = (movie) => {
        if (!favorites.some(fav => fav.id === movie.id)) {
            const updated = [...favorites, movie];
            syncFavorites(updated);
        }
    };

    const removeFromFavorites = (movieId) => {
        const updated = favorites.filter(movie => movie.id !== movieId);
        syncFavorites(updated);
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};