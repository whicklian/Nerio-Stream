import { useState } from "react";
import { useMovieContext } from "../Contexts/MovieContexts";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    const rating = movie.vote_average?.toFixed(1) ?? "N/A";
    const releaseYear = movie.release_date?.split("-")[0] || "TBA";
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    const qualityBadge = movie.vote_average >= 7.5 ? "4K" : "HD";

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link group block h-full">
            <div className="movie-card relative flex flex-col h-full rounded-2xl overflow-hidden bg-zinc-900/90 border border-zinc-800/80 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:border-red-600/50 group-hover:shadow-[0_12px_30px_rgba(229,9,20,0.25)]">
                
                {/* Poster Container */}
                <div className="movie-poster relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                    
                    {/* Floating Metadata Badges Pinned to Top Corners */}
                    <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-600/90 text-white shadow-md backdrop-blur-md border border-red-500/30">
                            {qualityBadge}
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
                            alt={movie.title}
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
                    <div className="movie-overlay absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out p-3 flex flex-col justify-between items-end pointer-events-none">
                        <button
                            className={`favourite-btn pointer-events-auto p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
                                favorite ? "bg-red-600/80 border-red-500 text-white" : "bg-zinc-900/60 border-zinc-700/60 text-zinc-300 hover:text-white"
                            }`}
                            onClick={onFavoriteClick}
                            title={favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {favorite ? "❤️" : "🤍"}
                        </button>
                    </div>
                </div>

                {/* Movie Information Footer */}
                <div className="movie-info p-3.5 flex flex-col justify-between flex-1 gap-2 bg-zinc-900/90 border-t border-zinc-800/60">
                    <div>
                        <span className="inline-block px-2 py-0.5 mb-1.5 rounded-full bg-red-600/15 text-red-400 border border-red-500/20 text-[10px] font-bold uppercase tracking-wider">
                            {movie.media_type === "tv" ? "TV Series" : "Feature Film"}
                        </span>
                        <h3 className="text-sm font-bold text-zinc-100 truncate transition-colors duration-200 group-hover:text-red-500" title={movie.title}>
                            {movie.title}
                        </h3>
                    </div>
                    
                    <div className="movie-meta flex items-center justify-between text-xs text-zinc-400 font-medium pt-1 border-t border-zinc-800/40">
                        <span className="flex items-center gap-1.5">
                            <span className="text-zinc-300 font-semibold">{releaseYear}</span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-amber-400 font-bold flex items-center gap-0.5">
                                ★ {rating}
                            </span>
                        </span>
                        {movie.vote_count > 0 && (
                            <span className="text-[10px] text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded border border-zinc-700/40">
                                {movie.vote_count > 999 ? `${(movie.vote_count / 1000).toFixed(1)}k` : movie.vote_count}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;