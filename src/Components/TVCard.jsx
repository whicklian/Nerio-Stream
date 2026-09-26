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
        <Link to={`/tv/${show.id}`} className="movie-card-link group block h-full w-full hover:scale-105 transition-all duration-300">
            <div className="movie-card relative flex flex-col h-full rounded-xl overflow-hidden bg-zinc-900/90 border border-zinc-800/80 shadow-lg">
                <div className="movie-poster relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                    <div className="absolute top-2 right-2 z-20 flex items-center">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-extrabold bg-zinc-950/85 border border-zinc-700/60 text-amber-400 backdrop-blur-md shadow-md">
                            <span className="text-amber-400">★</span>
                            <span>{rating}</span>
                        </span>
                    </div>

                    <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600/90 text-white shadow-md backdrop-blur-md border border-rose-500/30">
                            TV
                        </span>
                    </div>

                    {!imageLoaded && (
                        <div className="absolute inset-0 z-10 bg-zinc-800 animate-pulse flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-red-600/40 border-t-red-600 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={show.name}
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

                    <div className="movie-overlay absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-2.5 flex items-end justify-between pointer-events-none">
                        <span className="text-[10px] font-bold text-zinc-300 bg-zinc-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                            {releaseYear}
                        </span>
                    </div>
                </div>

                <div className="movie-info p-2.5 bg-zinc-900/90 border-t border-zinc-800/60">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-100 truncate transition-colors duration-200 group-hover:text-red-500" title={show.name}>
                        {show.name}
                    </h3>
                </div>
            </div>
        </Link>
    );
}

export default TVCard;
