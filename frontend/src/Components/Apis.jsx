const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// ─── Native Video Streaming Sources (Backend-Powered, No Iframe Embeds) ──────
export const getMovieStreamSources = async (tmdbId) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/stream/sources/movie/${tmdbId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.sources && data.sources.length > 0) return data.sources;
        }
    } catch (err) {
        console.warn("Backend stream sources error, fallback to direct stream:", err);
    }
    return [
        `${BACKEND_URL}/api/stream/video?id=${tmdbId}&type=movie`,
        "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    ];
};

export const getTVStreamSources = async (tmdbId, season = 1, episode = 1) => {
    try {
        const res = await fetch(`${BACKEND_URL}/api/stream/sources/tv/${tmdbId}/${season}/${episode}`);
        if (res.ok) {
            const data = await res.json();
            if (data.sources && data.sources.length > 0) return data.sources;
        }
    } catch (err) {
        console.warn("Backend stream sources error, fallback to direct stream:", err);
    }
    return [
        `${BACKEND_URL}/api/stream/video?id=${tmdbId}&season=${season}&episode=${episode}&type=tv`,
        "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    ];
};

// ─── Helpers ──────────────────────────────────────────────────────────────
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(`Request failed (${res.status}): ${txt}`);
    }
    return res.json();
}

// ─── Movies ───────────────────────────────────────────────────────────────
export const getPopularMovies = async (page = 1) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const searchMovies = async (query, page = 1) => {
    if (!query) return [];
    try {
        const data = await fetchJSON(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getGenres = async () => {
    try {
        const data = await fetchJSON(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        return data.genres || [];
    } catch (err) { console.error(err); return []; }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getMovieDetails = async (movieId) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`);
        return data;
    } catch (err) { console.error(err); return null; }
};

export const getSimilarMovies = async (movieId) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getTrending = async (timeWindow = 'week') => {
    try {
        const data = await fetchJSON(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

// ─── TV Shows ─────────────────────────────────────────────────────────────
export const getTVShows = async (page = 1) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const searchTV = async (query, page = 1) => {
    if (!query) return [];
    try {
        const data = await fetchJSON(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getTVDetails = async (tvId) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=credits,videos`);
        return data;
    } catch (err) { console.error(err); return null; }
};

export const getTVSeasonDetails = async (tvId, seasonNumber) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`);
        return data;
    } catch (err) { console.error(err); return null; }
};

export const getSimilarTV = async (tvId) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getTVGenres = async () => {
    try {
        const data = await fetchJSON(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
        return data.genres || [];
    } catch (err) { console.error(err); return []; }
};

export const getTVByGenre = async (genreId, page = 1) => {
    try {
        const data = await fetchJSON(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

// ─── Live Sports (Sportmonks API) ─────────────────────────────────────────
const SPORTMONKS_TOKEN = import.meta.env.VITE_SPORTMONKS_TOKEN || "";
const SPORTMONKS_BASE = import.meta.env.VITE_SPORTMONKS_BASE || "https://api.sportmonks.com/v3";

const fetchSportmonks = async (path) => {
    const rawUrl = `${SPORTMONKS_BASE}${path}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rawUrl)}`;
    return fetchJSON(proxyUrl);
};

export const getLiveMatchDetails = async (fixtureId = 216268) => {
    try {
        const data = await fetchSportmonks(`/football/fixtures/${fixtureId}?api_token=${SPORTMONKS_TOKEN}&include=participants;league;venue;state;scores;events.type;events.period;events.player;statistics.type;sidelined.sideline.player;sidelined.sideline.type;weatherReport`);
        return data.data; 
    } catch (err) {
        console.error("Sportmonks fixture error:", err);
        return null;
    }
};

export const getUpcomingFixtures = async () => {
    try {
        const data = await fetchSportmonks(`/football/fixtures?api_token=${SPORTMONKS_TOKEN}&include=participants;league;venue;state`);
        return data.data || [];
    } catch (err) {
        console.error("Sportmonks fixtures error:", err);
        return [];
    }
};

export const getTeamSquad = async (teamId = 85) => {
    try {
        const data = await fetchSportmonks(`/football/squads/teams/${teamId}?api_token=${SPORTMONKS_TOKEN}&include=position;detailedPosition;player`);
        return data.data || [];
    } catch (err) {
        console.error("Sportmonks squad error:", err);
        return [];
    }
};

// ─── Live Sports (SoccersAPI) ─────────────────────────────────────────
const SOCCERS_USER = import.meta.env.VITE_SOCCERS_USER || "41bJK";
const SOCCERS_TOKEN = import.meta.env.VITE_SOCCERS_TOKEN || "IvbKSOWNBr";

export const getSoccersLeagues = async () => {
    try {
        const url = `https://api.soccersapi.com/v2.2/leagues/?user=${SOCCERS_USER}&token=${SOCCERS_TOKEN}&t=list`;
        const data = await fetchJSON(url);
        return data.data || [];
    } catch (err) {
        console.error("SoccersAPI error:", err);
        return [];
    }
};

// ─── IPTV (Live TV) ───────────────────────────────────────────────────────
export const getIPTVChannels = async () => {
    try {
        const data = await fetchJSON("https://iptv-org.github.io/api/channels.json");
        return data || [];
    } catch (err) {
        console.error("IPTV Channels error:", err);
        return [];
    }
};

export const getIPTVStreams = async () => {
    try {
        const data = await fetchJSON("https://iptv-org.github.io/api/streams.json");
        return data || [];
    } catch (err) {
        console.error("IPTV Streams error:", err);
        return [];
    }
};