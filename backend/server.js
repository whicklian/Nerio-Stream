import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import streamRoutes from "./routes/stream.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Configure CORS for local development and production
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            FRONTEND_URL,
            "http://localhost:5173",
            "http://localhost:3000",
            "http://127.0.0.1:5173"
        ];
        
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }
        return callback(null, true); // Allow all during dev/testing
    },
    credentials: true
}));

app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Nerio Stream Video Backend",
        timestamp: new Date().toISOString()
    });
});

// Video Streaming Routes
app.use("/api/stream", streamRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎬 Nerio Stream Video Backend running on http://localhost:${PORT}`);
    console.log(`📡 Ready for Range Requests & HLS Proxying`);
});
