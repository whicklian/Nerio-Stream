import express from "express";
import {
    streamVideo,
    getMovieSources,
    getTVSources,
    proxyStream
} from "../controllers/streamController.js";

const router = express.Router();

// Direct Range-based Video Streaming Endpoint
router.get("/video", streamVideo);

// Sources Resolution Endpoints
router.get("/sources/movie/:id", getMovieSources);
router.get("/sources/tv/:id/:season/:episode", getTVSources);

// HLS and Media Proxy Endpoint
router.get("/proxy", proxyStream);

export default router;
