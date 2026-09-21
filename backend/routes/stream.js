import express from "express";
import {
    streamVideo,
    getMovieSources,
    getTVSources
} from "../controllers/streamController.js";

const router = express.Router();

// Direct Range-based Video Streaming Endpoint
router.get("/video", streamVideo);

// Sources Resolution Endpoints
router.get("/sources/movie/:id", getMovieSources);
router.get("/sources/tv/:id/:season/:episode", getTVSources);

export default router;
