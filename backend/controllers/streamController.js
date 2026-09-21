import { proxyHlsStream } from "../services/videoStreamer.js";

const DEFAULT_HLS_STREAM = process.env.DEFAULT_HLS_STREAM || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

/**
 * Controller for video streaming endpoint — redirects to the proxied HLS stream.
 * The proxy rewrites all segment URLs so the browser never needs to contact the
 * origin CDN directly (bypasses CORS / hotlink protection).
 *
 * GET /api/stream/video?id=123&type=movie
 * GET /api/stream/video?id=123&season=1&episode=1&type=tv
 */
export async function streamVideo(req, res) {
    const { id, type = "movie", season = 1, episode = 1, src } = req.query;

    // If a caller passes an explicit src= URL, proxy that; otherwise use the default HLS demo stream.
    const targetStream = src || DEFAULT_HLS_STREAM;

    console.log(`[Stream] ${type.toUpperCase()} id=${id || "demo"} S${season}E${episode} → proxying HLS`);

    // Redirect to our own HLS proxy endpoint so the client loads the playlist through the backend
    const proxyUrl = `/api/stream/proxy?url=${encodeURIComponent(targetStream)}`;
    return res.redirect(302, proxyUrl);
}

/**
 * Controller to resolve native streaming sources for a Movie
 * GET /api/stream/sources/movie/:id
 */
export async function getMovieSources(req, res) {
    const { id } = req.params;
    const host = req.protocol + "://" + req.get("host");

    // Primary: proxied HLS (rewrites all segment URLs → no CORS issues)
    // Secondary: direct HLS (works on most browsers natively)
    const sources = [
        `${host}/api/stream/proxy?url=${encodeURIComponent(DEFAULT_HLS_STREAM)}`,
        DEFAULT_HLS_STREAM
    ];

    res.json({ id, type: "movie", sources });
}

/**
 * Controller to resolve native streaming sources for a TV show episode
 * GET /api/stream/sources/tv/:id/:season/:episode
 */
export async function getTVSources(req, res) {
    const { id, season = 1, episode = 1 } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const sources = [
        `${host}/api/stream/proxy?url=${encodeURIComponent(DEFAULT_HLS_STREAM)}`,
        DEFAULT_HLS_STREAM
    ];

    res.json({
        id,
        season: parseInt(season, 10),
        episode: parseInt(episode, 10),
        type: "tv",
        sources
    });
}

/**
 * Controller to proxy external media & HLS playlists to bypass CORS/hotlinks
 * GET /api/stream/proxy?url=...
 */
export async function proxyStream(req, res) {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: "Missing 'url' query parameter" });
    }

    await proxyHlsStream(req, res, url);
}
