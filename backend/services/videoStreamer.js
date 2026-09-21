import fs from "fs";
import path from "path";
import axios from "axios";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEDIA_ROOT = path.resolve(__dirname, "..", "media");

export function getMediaPath(type, id, season, episode) {
    const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "");
    if (!safeId) return null;

    if (type === "tv") {
        const safeSeason = Number.parseInt(season, 10);
        const safeEpisode = Number.parseInt(episode, 10);
        if (!Number.isInteger(safeSeason) || !Number.isInteger(safeEpisode)) return null;
        return path.join(MEDIA_ROOT, "tv", safeId, `s${String(safeSeason).padStart(2, "0")}e${String(safeEpisode).padStart(2, "0")}.mp4`);
    }

    return path.join(MEDIA_ROOT, "movies", `${safeId}.mp4`);
}

export function hasMedia(type, id, season, episode) {
    const mediaPath = getMediaPath(type, id, season, episode);
    return Boolean(mediaPath && fs.existsSync(mediaPath));
}

export function getMediaRelativePath(type, id, season, episode) {
    const mediaPath = getMediaPath(type, id, season, episode);
    return mediaPath ? path.relative(path.resolve(__dirname, ".."), mediaPath) : null;
}

/**
 * Handles HTTP 206 Range-based video streaming for local files and remote media.
 */
export async function streamMedia(req, res, sourcePathOrUrl) {
    const range = req.headers.range;

    // Check if it's a local file path
    const isLocal = !sourcePathOrUrl.startsWith("http://") && !sourcePathOrUrl.startsWith("https://");

    if (isLocal) {
        const filePath = path.resolve(__dirname, "..", sourcePathOrUrl);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "Local media file not found" });
        }

        const videoSize = fs.statSync(filePath).size;

        if (!range) {
            const head = {
                "Content-Length": videoSize,
                "Content-Type": "video/mp4",
                "Accept-Ranges": "bytes"
            };
            res.writeHead(200, head);
            return fs.createReadStream(filePath).pipe(res);
        }

        // Parse range: e.g. "bytes=1024-"
        const CHUNK_SIZE = 10 ** 6; // ~1MB chunks for snappy seeking
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + CHUNK_SIZE, videoSize - 1);

        if (start >= videoSize) {
            res.status(416).set("Content-Range", `bytes */${videoSize}`);
            return res.end();
        }

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        };

        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(filePath, { start, end });
        return videoStream.pipe(res);
    }

    // Remote HTTP Range Streaming
    try {
        const axiosHeaders = {};
        if (range) {
            axiosHeaders["Range"] = range;
        }

        const response = await axios({
            method: "GET",
            url: sourcePathOrUrl,
            responseType: "stream",
            headers: {
                ...axiosHeaders,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Referer": new URL(sourcePathOrUrl).origin
            },
            validateStatus: (status) => status >= 200 && status < 400
        });

        const headers = {
            "Accept-Ranges": "bytes",
            "Content-Type": response.headers["content-type"] || "video/mp4"
        };

        if (response.headers["content-range"]) {
            headers["Content-Range"] = response.headers["content-range"];
        }
        if (response.headers["content-length"]) {
            headers["Content-Length"] = response.headers["content-length"];
        }

        res.writeHead(response.status, headers);
        response.data.pipe(res);
    } catch (err) {
        console.warn("Remote stream warning:", err.message, "- Falling back to local sample video");
        // Seamlessly fallback to local sample video
        const fallbackPath = path.resolve(__dirname, "..", "public", "sample.mp4");
        if (fs.existsSync(fallbackPath)) {
            return streamMedia(req, res, "public/sample.mp4");
        }
        if (!res.headersSent) {
            res.status(502).json({ error: "Failed to stream media from remote source", details: err.message });
        }
    }
}

/**
 * Proxies HLS manifests (.m3u8) and segment chunks (.ts), rewriting URLs to pass through proxy.
 */
export async function proxyHlsStream(req, res, targetUrl) {
    try {
        const target = decodeURIComponent(targetUrl);
        const isManifest = target.includes(".m3u8");

        const response = await axios({
            method: "GET",
            url: target,
            responseType: isManifest ? "text" : "stream",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) NerioStream/1.0",
                "Referer": new URL(target).origin
            },
            timeout: 10000
        });

        if (isManifest && typeof response.data === "string") {
            const baseUrl = target.substring(0, target.lastIndexOf("/") + 1);
            const host = req.protocol + "://" + req.get("host");

            // Rewrite relative URLs inside the playlist to proxy through our backend
            const modifiedManifest = response.data
                .split("\n")
                .map(line => {
                    const trimmed = line.trim();
                    if (!trimmed || trimmed.startsWith("#")) {
                        // Check if line has URI attribute e.g. URI="something.m3u8"
                        if (trimmed.includes('URI="')) {
                            return trimmed.replace(/URI="([^"]+)"/, (_, uri) => {
                                const fullUri = uri.startsWith("http") ? uri : `${baseUrl}${uri}`;
                                return `URI="${host}/api/stream/proxy?url=${encodeURIComponent(fullUri)}"`;
                            });
                        }
                        return line;
                    }

                    const absoluteUrl = trimmed.startsWith("http") ? trimmed : `${baseUrl}${trimmed}`;
                    return `${host}/api/stream/proxy?url=${encodeURIComponent(absoluteUrl)}`;
                })
                .join("\n");

            res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
            res.setHeader("Access-Control-Allow-Origin", "*");
            return res.send(modifiedManifest);
        }

        // Binary chunks (.ts, .m4s, etc.)
        res.setHeader("Content-Type", response.headers["content-type"] || "video/MP2T");
        res.setHeader("Access-Control-Allow-Origin", "*");
        response.data.pipe(res);
    } catch (err) {
        console.error("Proxy error:", err.message);
        if (!res.headersSent) {
            res.status(502).json({ error: "Failed to proxy stream", details: err.message });
        }
    }
}
