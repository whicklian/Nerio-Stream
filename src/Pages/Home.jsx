import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies, getGenres, getMoviesByGenre, getTrending } from "../Components/Apis";
import { getContinueWatching } from "../utils";
import MovieCard from "../Components/MovieCard";
import { Link, useSearchParams } from "react-router-dom";
import HeroCarousel from "../Components/HeroCarousel";
import "../css/Home.css";

const GENRE_ICONS = {
  Action: "💥",
  Adventure: "🤠",
  Animation: "🎨",
  Comedy: "😂",
  Crime: "🕵️",
  Documentary: "📹",
  Drama: "🎭",
  Family: "👨‍👩‍👧‍👦",
  Fantasy: "🧙‍♂️",
  History: "📜",
  Horror: "😱",
  Music: "🎵",
  Mystery: "🔍",
  Romance: "💖",
  "Science Fiction": "🚀",
  "TV Movie": "📺",
  Thriller: "⚡",
  War: "🪖",
  Western: "🤠",
};

function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [continueWatching, setContinueWatching] = useState([]);

  useEffect(() => {
    getGenres().then(setGenres).catch(console.error);
    getTrending("week").then(res => setTrendingMovies(res || [])).catch(console.error);
    setContinueWatching(getContinueWatching());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const results = await searchMovies(searchQuery);
          setMovies(results);
        } else if (selectedGenre) {
          const results = await getMoviesByGenre(selectedGenre);
          setMovies(results);
        } else {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, selectedGenre]);

  const handleGenreSelect = (genreId) => {
      if (selectedGenre === genreId) {
          setSelectedGenre(null);
      } else {
          setSelectedGenre(genreId);
      }
  };

  return (
    <div className="home pb-8 w-full">
      {/* Hero Banner - full bleed, no padding */}
      <div className="w-full">
        <HeroCarousel />
      </div>

      {/* Main Content Sections below Hero */}
      <div className="px-6 md:px-8 pt-4 space-y-8">
        {continueWatching.length > 0 && !searchQuery && !selectedGenre && (
            <div className="continue-watching-section rounded-2xl" style={{ padding: '2rem 5%', background: 'rgba(229, 9, 20, 0.05)', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', display: 'flex', items: 'center', gap: '0.5rem' }}>
                    ▶ Continue Watching
                </h2>
                <div className="continue-watching-grid hide-scroll" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                    {continueWatching.map(item => (
                        <Link to={`/tv/${item.showId}`} key={item.showId} style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }} className="w-48 md:w-64">
                            <div className="cw-card" style={{ background: '#18181b', borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.2s', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ position: 'relative', width: '100%', height: '140px' }}>
                                    <img src={`https://image.tmdb.org/t/p/w500${item.posterPath}`} alt={item.showName} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '4px', background: '#333' }}>
                                        <div style={{ width: '65%', height: '100%', background: '#e50914' }}></div>
                                    </div>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.showName}</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#a1a1aa', margin: 0 }}>S{item.seasonNum} E{item.episodeNum} • {item.episodeName}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )}

        {/* Top 10 Movies This Week Carousel */}
        {!loading && !searchQuery && !selectedGenre && trendingMovies.length > 0 && (
          <div className="top-10-section mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-0.5 block">
                  Weekly Chart Leaders
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  🏆 Top 10 Movies This Week
                </h2>
              </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto hide-scroll py-3 scrollbar-none" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
              {trendingMovies.slice(0, 10).map((movie, idx) => (
                <div key={`top10-${movie.id}`} className="relative shrink-0 w-44 md:w-52 group">
                  <div className="absolute -left-3 -bottom-1 z-20 text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-700 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] pointer-events-none select-none">
                    #{idx + 1}
                  </div>
                  <div className="pl-4">
                    <MovieCard movie={movie} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="genres-section" style={{ padding: '1rem 0', marginBottom: '1.5rem' }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-0.5 block">
                  Category Explorer
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  🎭 Browse by Genre
                </h2>
              </div>
              {selectedGenre && (
                <button
                  onClick={() => setSelectedGenre(null)}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 px-3 py-1.5 rounded-full transition-all"
                >
                  Clear Selection ✕
                </button>
              )}
            </div>

            <div className="flex overflow-x-auto whitespace-nowrap hide-scroll py-2.5 px-1 gap-3.5" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {genres.map(genre => {
                    const isSelected = selectedGenre === genre.id;
                    const icon = GENRE_ICONS[genre.name] || "🎬";
                    return (
                        <button 
                            key={genre.id} 
                            className={`relative flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ease-in-out shrink-0 overflow-hidden group cursor-pointer ${
                              isSelected 
                                ? 'bg-gradient-to-r from-red-600 to-rose-600 border-2 border-red-500 shadow-[0_0_24px_rgba(229,9,20,0.5)] scale-105 z-10 text-white' 
                                : 'bg-zinc-900/90 border border-zinc-800/80 hover:bg-zinc-800/90 hover:scale-105 hover:border-red-500/40 text-zinc-300 hover:text-white'
                            }`}
                            onClick={() => {
                                handleGenreSelect(genre.id);
                            }}
                        >
                            <span className="text-xl shrink-0">{icon}</span>
                            <span className="font-bold text-sm tracking-wide">
                                {genre.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>

        {!loading && !searchQuery && !selectedGenre && movies.length > 0 && (
            <div className="continue-watching-section" style={{ padding: '0', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ✨ AI Recommended for You
                </h2>
                <div className="continue-watching-grid hide-scroll" style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                    {movies.slice(0, 5).map(movie => (
                        <div key={`ai-${movie.id}`} style={{ flexShrink: 0 }} className="w-40 md:w-48 lg:w-56">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {loading ? (
          <div className="loading-container px-4 py-6">
              <div className="loader"></div>
              <p>Loading movies...</p>
          </div>
        ) : (
          <div className="px-0 py-4 my-4">
            {/* Section Header & Subheading */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-zinc-800/80 gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1 block">
                  {selectedGenre ? "Genre Collection" : searchQuery ? "Search Results" : "Featured Selection"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                  {searchQuery ? `Results for "${searchQuery}"` : selectedGenre ? "Explore Category" : "🔥 Trending & Popular Hits"}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-md">
                Hand-picked blockbuster movies streaming now in 4K Ultra HD
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
              {movies.length > 0 ? movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              )) : (
                <div className="col-span-full text-center text-slate-400 py-10">No movies found. Try a different search.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;