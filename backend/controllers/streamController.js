import { streamMedia, hasMedia, getMediaRelativePath } from "../services/videoStreamer.js";

/**
 * Controller for video streaming endpoint — serves media owned by this app.
 *
 * GET /api/stream/video?id=123&type=movie
 * GET /api/stream/video?id=123&season=1&episode=1&type=tv
 */
export async function streamVideo(req, res) {
    const { id, type = "movie", season = 1, episode = 1, src } = req.query;
    if (src) return res.status(400).json({ error: "External stream URLs are not supported" });
    if (!id || !hasMedia(type, id, season, episode)) {
        return res.status(404).json({ error: "This title is not available in the media library" });
    }

    const relativePath = getMediaRelativePath(type, id, season, episode);
    console.log(`[Stream] ${type.toUpperCase()} id=${id} S${season}E${episode}`);
    return streamMedia(req, res, relativePath);
}

/**
 * Controller to resolve native streaming sources for a Movie
 * GET /api/stream/sources/movie/:id
 */
export async function getMovieSources(req, res) {
    const { id } = req.params;
    const host = req.protocol + "://" + req.get("host");
    const sources = hasMedia("movie", id) ? [`${host}/api/stream/video?id=${encodeURIComponent(id)}&type=movie`] : [];

    res.json({ id, type: "movie", sources });
}

/**
 * Controller to resolve native streaming sources for a TV show episode
 * GET /api/stream/sources/tv/:id/:season/:episode
 */
export async function getTVSources(req, res) {
    const { id, season = 1, episode = 1 } = req.params;
    const host = req.protocol + "://" + req.get("host");
    const sources = hasMedia("tv", id, season, episode)
        ? [`${host}/api/stream/video?id=${encodeURIComponent(id)}&season=${season}&episode=${episode}&type=tv`]
        : [];

    res.json({
        id,
        season: parseInt(season, 10),
        episode: parseInt(episode, 10),
        type: "tv",
        sources
    });
}

