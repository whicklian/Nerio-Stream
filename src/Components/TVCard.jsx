import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";

function TVCard({ show }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const rating = show.vote_average?.toFixed(1) ?? "N/A";
    const releaseYear = show.first_air_date?.split("-")[0] || "TBA";
    const posterUrl = show.poster_path
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : null;

    return (
        <Link to={`/tv/${show.id}`} className="movie-card-link group block h-full">
            <div className="movie-card relative flex flex-col h-full rounded-2xl overflow-hidden bg-zinc-900/90 border border-zinc-800/80 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:border-red-600/50 group-hover:shadow-[0_12px_30px_rgba(229,9,20,0.25)]">
                
                {/* Poster Container */}
                <div className="movie-poster relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                    
                    {/* Floating Metadata Badges Pinned to Top Corners */}
                    <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600/90 text-white shadow-md backdrop-blur-md border border-rose-500/30">
                            TV SERIES
                        </span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-zinc-950/80 border border-zinc-700/60 text-amber-400 backdrop-blur-md shadow-md">
                            <span className="text-amber-400">★</span>
                            <span>{rating}</span>
                        </span>
                    </div>

                    {/* Skeleton Shimmer Loader */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 z-10 bg-zinc-800 animate-pulse flex items-center justify-center">
                            <div className="w-10 h-10 border-2 border-red-600/40 border-t-red-600 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Poster Image */}
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={show.name}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${
                                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            }`}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 text-xs font-semibold">
                            No Poster
                        </div>
                    )}

                    {/* Hover Gradient Overlay */}
                    <div className="movie-overlay absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out p-3">
                    </div>
                </div>

                {/* Show Information Footer */}
                <div className="movie-info p-3.5 flex flex-col justify-between flex-1 gap-1.5 bg-zinc-900/90 border-t border-zinc-800/60">
                    <h3 className="text-sm font-bold text-zinc-100 truncate transition-colors duration-200 group-hover:text-red-500" title={show.name}>
                        {show.name}
                    </h3>
                    <div className="movie-meta flex items-center justify-between text-xs text-zinc-400 font-medium">
                        <span>{releaseYear}</span>
                        {show.vote_count > 0 && (
                            <span className="text-[11px] text-zinc-500">{show.vote_count.toLocaleString()} votes</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default TVCard;
