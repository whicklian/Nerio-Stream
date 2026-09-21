import { streamMedia, proxyHlsStream } from "../services/videoStreamer.js";

const DEFAULT_STREAM_URL = process.env.DEFAULT_STREAM_URL || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const DEFAULT_HLS_STREAM = process.env.DEFAULT_HLS_STREAM || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

/**
 * Controller for video range streaming endpoint
 * GET /api/stream/video?id=123&type=movie
 */
export async function streamVideo(req, res) {
    const { id, type = "movie", season = 1, episode = 1, src } = req.query;

    // If a specific source URL is requested to stream
    const targetSource = src || DEFAULT_STREAM_URL;

    console.log(`[Stream] Serving ${type} stream for ID: ${id || "default"} (Season ${season}, Ep ${episode})`);
    await streamMedia(req, res, targetSource);
}

/**
 * Controller to resolve native streaming sources for a Movie
 * GET /api/stream/sources/movie/:id
 */
export async function getMovieSources(req, res) {
    const { id } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const sources = [
        `${host}/api/stream/video?id=${id}&type=movie`,
        `${host}/api/stream/proxy?url=${encodeURIComponent(DEFAULT_HLS_STREAM)}`,
        DEFAULT_HLS_STREAM,
        DEFAULT_STREAM_URL
    ];

    res.json({
        id,
        type: "movie",
        sources
    });
}

/**
 * Controller to resolve native streaming sources for a TV show episode
 * GET /api/stream/sources/tv/:id/:season/:episode
 */
export async function getTVSources(req, res) {
    const { id, season = 1, episode = 1 } = req.params;
    const host = req.protocol + "://" + req.get("host");

    const sources = [
        `${host}/api/stream/video?id=${id}&season=${season}&episode=${episode}&type=tv`,
        `${host}/api/stream/proxy?url=${encodeURIComponent(DEFAULT_HLS_STREAM)}`,
        DEFAULT_HLS_STREAM,
        DEFAULT_STREAM_URL
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
