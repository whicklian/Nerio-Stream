import { auth, db, doc, setDoc, hasFirebaseConfig } from "./firebase";

let guestContinueWatching = [];
let guestWatchedEpisodes = {};
let guestCustomStreams = {};

export const getContinueWatching = () => guestContinueWatching;

export const saveContinueWatching = async (item) => {
    const nextList = guestContinueWatching.filter((i) => i.showId !== item.showId);
    nextList.unshift(item);
    guestContinueWatching = nextList.slice(0, 10);

    if (auth?.currentUser?.isGuest || !auth?.currentUser) {
        return;
    }

    if (hasFirebaseConfig && auth?.currentUser && db) {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef, { continueWatching: guestContinueWatching }, { merge: true });
        } catch (err) {
            console.error("Failed to sync continue watching to Firestore:", err);
        }
    }
};

export const getWatchedEpisodes = (showId) => guestWatchedEpisodes[showId] || [];

export const markEpisodeWatched = async (showId, seasonNum, episodeNum) => {
    const list = [...(guestWatchedEpisodes[showId] || [])];
    const epId = `${seasonNum}-${episodeNum}`;
    if (!list.includes(epId)) {
        const nextList = [...list, epId];
        guestWatchedEpisodes[showId] = nextList;

        if (auth?.currentUser?.isGuest || !auth?.currentUser) {
            return;
        }

        if (hasFirebaseConfig && auth?.currentUser && db) {
            try {
                const userRef = doc(db, "users", auth.currentUser.uid);
                await setDoc(userRef, {
                    [`watchedEpisodes_${showId}`]: nextList
                }, { merge: true });
            } catch (err) {
                console.error("Failed to sync watched episode to Firestore:", err);
            }
        }
    }
};

export const getCustomStreamUrl = (id) => guestCustomStreams[id] || null;

export const saveCustomStreamUrl = async (id, url) => {
    guestCustomStreams[id] = url;

    if (auth?.currentUser?.isGuest || !auth?.currentUser) {
        return;
    }

    if (hasFirebaseConfig && auth?.currentUser && db) {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userRef, { customStreams: guestCustomStreams }, { merge: true });
        } catch (e) {
            console.error("Failed to save custom stream:", e);
        }
    }
};
