import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies, getGenres } from "./Apis";

// Fallback genre dictionary for instant tag lookup
const DEFAULT_GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

/**
 * MovieSearchBar Component
 * 
 * Sleek, dark-themed search bar with live TMDB search suggestions,
 * wider dropdown container to prevent scrolling, right-aligned ratings,
 * and clean slate/indigo styling without red hover outlines.
 */
function MovieSearchBar({ className = "" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [genreMap, setGenreMap] = useState(DEFAULT_GENRES);

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch genre list on mount
  useEffect(() => {
    let isMounted = true;
    getGenres().then((genres) => {
      if (isMounted && genres && genres.length > 0) {
        const map = {};
        genres.forEach((g) => {
          map[g.id] = g.name;
        });
        setGenreMap(map);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Live debounced search as user types
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchMovies(trimmed);
        setSuggestions(results.slice(0, 5)); // Show top 5 items cleanly without scrollbar
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (err) {
        console.error("Live search error:", err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Form submission
  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelectMovie(suggestions[selectedIndex]);
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Select a suggestion item
  const handleSelectMovie = (movie) => {
    navigate(`/movie/${movie.id}`);
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Field */}
      <form onSubmit={handleSubmit} className="relative flex items-center w-full group">
        <div className="relative w-full flex items-center">
          {/* Left Search Icon Button */}
          <button
            type="submit"
            aria-label="Search"
            className="absolute left-3.5 z-10 text-[#aaaaaa] hover:text-white transition-colors cursor-pointer flex items-center justify-center p-0.5 border-0 bg-transparent outline-none"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query.trim() && suggestions.length > 0) setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search movies..."
            style={{
              paddingLeft: "2.75rem",
              paddingRight: "2.5rem",
              outline: "none",
              boxShadow: "none",
            }}
            className="w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-[#17191d]/90 text-xs sm:text-sm text-white placeholder-[#aaaaaa] focus:outline-none focus:border-red-500/80 hover:border-red-500/40 transition-all duration-200 shadow-inner"
          />

          {/* Right Action: Loading Spinner or Clear Button Only */}
          <div className="absolute right-3 flex items-center justify-center">
            {isLoading ? (
              <span className="text-indigo-400 animate-spin">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSuggestions([]);
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-slate-800 flex items-center justify-center border-0 bg-transparent outline-none"
                title="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : null}
          </div>
        </div>
      </form>

      {/* Floating Live Suggestions Dropdown (Wider container, fits all features without scrolling) */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[480px] md:w-[510px] z-50 rounded-2xl border border-slate-800 bg-[#0f172a]/98 p-2.5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.length > 0 ? (
            <div className="flex flex-col gap-1">
              <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase text-indigo-400/80 flex items-center justify-between border-b border-slate-800/80 pb-2 mb-1">
                <span>Top Results</span>
                <span className="text-slate-500 normal-case font-normal text-[11px]">Press ↑↓ to navigate</span>
              </div>
              
              {suggestions.map((movie, index) => {
                const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : null;
                const posterUrl = movie.poster_path
                  ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                  : null;
                const genres = (movie.genre_ids || [])
                  .slice(0, 2)
                  .map((id) => genreMap[id])
                  .filter(Boolean);

                const isSelected = selectedIndex === index;

                return (
                  <div
                    key={movie.id}
                    onClick={() => handleSelectMovie(movie)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`group flex items-center justify-between gap-3 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-950/80 border-l-4 border-indigo-500 translate-x-1 pl-3 shadow-md"
                        : "hover:bg-slate-800/70 hover:translate-x-1"
                    }`}
                  >
                    {/* Left: Poster & Text Info */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Mini Poster Thumbnail */}
                      <div className="relative w-10 h-13 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60 shadow-sm group-hover:shadow-indigo-500/20">
                        {posterUrl ? (
                          <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            🎬
                          </div>
                        )}
                      </div>

                      {/* Movie Information */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-indigo-300 truncate transition-colors">
                          {movie.title}
                        </h4>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400 truncate">
                          {releaseYear && <span className="font-medium text-slate-400 shrink-0">{releaseYear}</span>}
                          {genres.length > 0 && (
                            <div className="flex items-center gap-1 truncate">
                              {releaseYear && <span className="text-slate-600">•</span>}
                              {genres.map((g) => (
                                <span
                                  key={g}
                                  className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700/40 shrink-0"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Rating Badge (Always visible, aligned on right) */}
                    {movie.vote_average > 0 && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold shrink-0 border border-amber-500/20 shadow-sm">
                        <span>★</span>
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* View All Results Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-1.5 py-2.5 px-3 text-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border-t border-slate-800/80 pt-2.5"
              >
                <span>View all results for "{query}"</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          ) : !isLoading && query.trim() ? (
            /* Empty State */
            <div className="p-4 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
              <span className="text-2xl">🔍</span>
              <p>No movies found for "<span className="text-slate-200 font-medium">{query}</span>"</p>
              <p className="text-[11px] text-slate-500">Try searching for another movie or keyword</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default MovieSearchBar;
