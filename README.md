# 🎬 Nerio Stream

A modern, high-performance Movie, TV Shows & Live Sports streaming platform with native video playback.

---

## 📁 Project Architecture

```
Nerio-Stream/
├── frontend/             # React 19 + Vite client application
│   ├── src/              # Components, Pages, Contexts, Hooks, CSS
│   ├── public/           # Static web assets & icons
│   ├── .env              # Frontend environment variables (TMDB, Firebase, Backend URL)
│   ├── .env.example      # Frontend env template
│   ├── vite.config.js    # Vite bundling config
│   └── package.json      # Frontend dependencies
│
├── backend/              # Node.js + Express video streaming engine
│   ├── controllers/      # Video streaming and proxy logic
│   ├── routes/           # Stream endpoints (/api/stream/video, /sources, /proxy)
│   ├── services/         # HTTP Range 206 streaming and HLS proxying
│   ├── .env              # Backend environment variables
│   ├── .env.example      # Backend env template
│   ├── server.js         # Express server entry point
│   └── package.json      # Backend dependencies
│
├── package.json          # Root workspace scripts (concurrent runner)
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies
Run from root:
```bash
npm run install:all
```
Or install in each directory:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment Variables
Copy and check `.env` files:
- In `frontend/`: ensure `.env` has your `VITE_TMDB_API_KEY`, `VITE_FIREBASE_*`, and `VITE_BACKEND_URL=http://localhost:5000`.
- In `backend/`: ensure `.env` has `PORT=5000` and `FRONTEND_URL=http://localhost:5173`.

### 3. Run Development Servers
From the root directory, start both frontend and backend concurrently:
```bash
npm run dev
```

Or start individually:
- **Frontend only**: `npm run dev:frontend` (starts at `http://localhost:5173`)
- **Backend only**: `npm run dev:backend` (starts at `http://localhost:5000`)

---

## 🎥 Native Video Streaming Engine

- **HTTP 206 Partial Content**: Full support for `Range: bytes=start-end` requests for instant seeking and minimal buffering.
- **No Iframe Embeds**: Movie and TV streaming routes natively via HTML5 `<video>` and Hls.js with custom player controls.
- **HLS Proxy**: Proxies HLS manifests and segment chunks with rewritten headers to bypass CORS and hotlink protection.
