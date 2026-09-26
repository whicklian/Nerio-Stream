const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const hasTMDBConfig = Boolean(API_KEY && BASE_URL);

const warnMissingTMDBConfig = () => {
    if (!hasTMDBConfig) {
        console.warn("TMDB API is not configured. Add VITE_TMDB_API_KEY and VITE_TMDB_BASE_URL to enable movie data.");
    }
};

// ─── Embed URLs (vidsrc.me) ────────────────────────────────────────────────
export const getMovieEmbedUrl = (tmdbId) =>
    `https://vidsrc.me/embed/movie?tmdb=${tmdbId}`;

export const getTVEpisodeEmbedUrl = (tmdbId, season, episode) =>
    `https://vidsrc.me/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`;

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
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const searchMovies = async (query, page = 1) => {
    if (!query) return [];
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getGenres = async () => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        return data.genres || [];
    } catch (err) { console.error(err); return []; }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getMovieDetails = async (movieId) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return null;
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`);
        return data;
    } catch (err) { console.error(err); return null; }
};

export const getSimilarMovies = async (movieId) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getTrending = async (timeWindow = 'week') => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getTopRatedMovies = async (page = 1) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

// ─── TV Shows ─────────────────────────────────────────────────────────────
export const getTVShows = async (page = 1) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const searchTV = async (query, page = 1) => {
    if (!query) return [];
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getTVDetails = async (tvId) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return null;
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&append_to_response=credits,videos`);
        return data;
    } catch (err) { console.error(err); return null; }
};

export const getTVSeasonDetails = async (tvId, seasonNumber) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return null;
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`);
        return data;
    } catch (err) { console.error(err); return null; }
};

export const getSimilarTV = async (tvId) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

export const getTVGenres = async () => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
        return data.genres || [];
    } catch (err) { console.error(err); return []; }
};

export const getTVByGenre = async (genreId, page = 1) => {
    if (!hasTMDBConfig) {
        warnMissingTMDBConfig();
        return [];
    }

    try {
        const data = await fetchJSON(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);
        return data.results || [];
    } catch (err) { console.error(err); return []; }
};

// ─── Live Sports (Sportmonks API) ─────────────────────────────────────────
const SPORTMONKS_TOKEN = import.meta.env.VITE_SPORTMONKS_TOKEN;
const SPORTMONKS_BASE = import.meta.env.VITE_SPORTMONKS_BASE_URL;
const ALLORIGINS_BASE = import.meta.env.VITE_ALLORIGINS_BASE_URL;

const fetchSportmonks = async (path) => {
    const rawUrl = `${SPORTMONKS_BASE}${path}`;
    const proxyUrl = `${ALLORIGINS_BASE}/raw?url=${encodeURIComponent(rawUrl)}`;
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
export const getSoccersLeagues = async () => {
    try {
        const url = `${import.meta.env.VITE_SOCCERS_API_BASE_URL}/leagues/?user=${import.meta.env.VITE_SOCCERS_API_USER}&token=${import.meta.env.VITE_SOCCERS_API_TOKEN}&t=list`;
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
        const data = await fetchJSON(`${import.meta.env.VITE_IPTV_API_BASE_URL}/channels.json`);
        return data || [];
    } catch (err) {
        console.error("IPTV Channels error:", err);
        return [];
    }
};

export const getIPTVStreams = async () => {
    try {
        const data = await fetchJSON(`${import.meta.env.VITE_IPTV_API_BASE_URL}/streams.json`);
        return data || [];
    } catch (err) {
        console.error("IPTV Streams error:", err);
        return [];
    }
};