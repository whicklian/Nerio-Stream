import { useState } from "react";
import { useMovieContext } from "../Contexts/MovieContexts";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie?.id);

    if (!movie) return null;

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    }

    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
    const releaseYear = movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0] || "TBA";
    const title = movie.title || movie.name || "Untitled";
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    return (
        <Link 
            to={movie.media_type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`} 
            className="movie-card-link group block shrink-0 w-full hover:scale-105 transition-all duration-300"
        >
            <div className="movie-card relative flex flex-col h-full rounded-xl overflow-hidden bg-zinc-900/90 border border-zinc-800/80 shadow-lg">
                
                {/* Poster Container with aspect 2/3 */}
                <div className="movie-poster relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                    
                    {/* Floating Rating Badge in Top-Right Corner */}
                    <div className="absolute top-2 right-2 z-20 flex items-center">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-extrabold bg-zinc-950/85 border border-zinc-700/60 text-amber-400 backdrop-blur-md shadow-md">
                            <span className="text-amber-400">★</span>
                            <span>{rating}</span>
                        </span>
                    </div>

                    {/* Skeleton Shimmer Loader */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 z-10 bg-zinc-800 animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-red-600/40 border-t-red-600 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Poster Image */}
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={title}
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${
                                imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 text-xs font-semibold">
                            No Poster
                        </div>
                    )}

                    {/* Hover Favorite Button Overlay */}
                    <div className="movie-overlay absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-2.5 flex items-end justify-between pointer-events-none">
                        <span className="text-[10px] font-bold text-zinc-300 bg-zinc-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                            {releaseYear}
                        </span>
                        <button
                            className={`favourite-btn pointer-events-auto p-1.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                                favorite ? "bg-red-600/90 border-red-500 text-white" : "bg-zinc-900/80 border-zinc-700/60 text-zinc-300 hover:text-white"
                            }`}
                            onClick={onFavoriteClick}
                            title={favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            {favorite ? "❤️" : "🤍"}
                        </button>
                    </div>
                </div>

                {/* Compact Movie Title Footer */}
                <div className="movie-info p-2.5 bg-zinc-900/90 border-t border-zinc-800/60">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-100 truncate transition-colors duration-200 group-hover:text-red-500" title={title}>
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;