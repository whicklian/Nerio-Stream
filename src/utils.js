import { auth, db, doc, setDoc } from "./firebase";

export const getContinueWatching = () => {
    try {
        const data = localStorage.getItem("continue_watching");
        if (data) return JSON.parse(data);
        return [];
    } catch (e) {
        return [];
    }
};

export const saveContinueWatching = async (item) => {
    let list = getContinueWatching();
    list = list.filter(i => i.showId !== item.showId); // Remove existing entry for the same show
    list.unshift(item); // Add to the top
    const updatedList = list.slice(0, 10); // Keep last 10

    localStorage.setItem("continue_watching", JSON.stringify(updatedList));

    // If Firebase user is authenticated, sync to Firestore
    if (auth?.currentUser && db) {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef, { continueWatching: updatedList }, { merge: true });
        } catch (err) {
            console.error("Failed to sync continue watching to Firestore:", err);
        }
    }
};

export const getWatchedEpisodes = (showId) => {
    try {
        const data = localStorage.getItem(`watched_${showId}`);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
};

export const markEpisodeWatched = async (showId, seasonNum, episodeNum) => {
    let list = getWatchedEpisodes(showId);
    const epId = `${seasonNum}-${episodeNum}`;
    if (!list.includes(epId)) {
        list.push(epId);
        localStorage.setItem(`watched_${showId}`, JSON.stringify(list));

        if (auth?.currentUser && db) {
            try {
                const userRef = doc(db, "users", auth.currentUser.uid);
                await setDoc(userRef, {
                    [`watchedEpisodes_${showId}`]: list
                }, { merge: true });
            } catch (err) {
                console.error("Failed to sync watched episode to Firestore:", err);
            }
        }
    }
};

export const getCustomStreamUrl = (id) => {
    try {
        const streams = JSON.parse(localStorage.getItem("nerio_custom_streams") || "{}");
        return streams[id] || null;
    } catch {
        return null;
    }
};

export const saveCustomStreamUrl = async (id, url) => {
    try {
        const streams = JSON.parse(localStorage.getItem("nerio_custom_streams") || "{}");
        streams[id] = url;
        localStorage.setItem("nerio_custom_streams", JSON.stringify(streams));

        if (auth?.currentUser && db) {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef, { customStreams: streams }, { merge: true });
        }
    } catch (e) {
        console.error("Failed to save custom stream:", e);
    }
};
