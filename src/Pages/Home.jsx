import { useState, useEffect, useRef, useCallback } from "react";
import { getPopularMovies, searchMovies, getMoviesByGenre, getTrending, getTopRatedMovies } from "../Components/Apis";
import { getContinueWatching } from "../utils";
import MovieCard from "../Components/MovieCard";
import { Link, useSearchParams } from "react-router-dom";
import HeroCarousel from "../Components/HeroCarousel";

import "../css/Home.css";

const DEFAULT_GENRE_ROWS = [
  { id: 28, title: "Action Hits" },
  { id: 35, title: "Comedy Picks" },
  { id: 878, title: "Sci‑Fi Adventures" },
  { id: 18, title: "Drama Stories" },
  { id: 53, title: "Thriller & Suspense" }
];

function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [exploreMovies, setExploreMovies] = useState([]);
  const [explorePage, setExplorePage] = useState(2);
  const [loadingMore, setLoadingMore] = useState(false);
  const [genreRows, setGenreRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [continueWatching, setContinueWatching] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const genreRowRefs = useRef({});

  useEffect(() => {
    getTrending("week").then(res => setTrendingMovies(res || [])).catch(console.error);
    getPopularMovies(1).then(res => setNewReleases(res || [])).catch(console.error);
    getTopRatedMovies(1).then(res => setTopRatedMovies(res || [])).catch(console.error);
    setContinueWatching(getContinueWatching());

    const fetchGenreRows = async () => {
      try {
        const rows = await Promise.all(
          DEFAULT_GENRE_ROWS.map(async ({ id, title }) => {
            const movies = await getMoviesByGenre(id, 1);
            return {
              id,
              title,
              movies: movies || [],
              page: 1,
              hasMore: Boolean((movies || []).length > 0),
              isLoadingMore: false,
            };
          })
        );
        setGenreRows(rows);
      } catch (err) {
        console.error("Failed to load genre rows:", err);
      }
    };

    fetchGenreRows();
  }, []);

  const handleLoadMoreGenre = useCallback(async (genreId) => {
    const row = genreRows.find((item) => item.id === genreId);
    if (!row || row.isLoadingMore || !row.hasMore) return;

    setGenreRows((prev) =>
      prev.map((item) =>
        item.id === genreId ? { ...item, isLoadingMore: true } : item
      )
    );

    try {
      const nextPage = (row.page || 1) + 1;
      const moreMovies = await getMoviesByGenre(genreId, nextPage);

      setGenreRows((prev) =>
        prev.map((item) => {
          if (item.id !== genreId) return item;

          const mergedMovies = [...(item.movies || []), ...(moreMovies || [])];
          const nextPageValue = moreMovies && moreMovies.length > 0 ? nextPage : item.page || 1;

          return {
            ...item,
            movies: mergedMovies,
            page: nextPageValue,
            hasMore: Boolean(moreMovies && moreMovies.length > 0),
            isLoadingMore: false,
          };
        })
      );
    } catch (error) {
      console.error("Failed to load more movies for genre:", genreId, error);
      setGenreRows((prev) =>
        prev.map((row) =>
          row.id === genreId ? { ...row, isLoadingMore: false } : row
        )
      );
    }
  }, [genreRows]);

  useEffect(() => {
    const refs = Object.values(genreRowRefs.current).filter(Boolean);
    if (refs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const genreId = Number(entry.target.dataset.genreId);
          const row = genreRows.find((item) => item.id === genreId);
          if (!row || row.isLoadingMore || !row.hasMore) return;

          handleLoadMoreGenre(genreId);
        });
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    refs.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, [genreRows, handleLoadMoreGenre]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchQuery) {
          const results = await searchMovies(searchQuery);
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
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery) {
      const initialMovies = async () => {
        const res = await getPopularMovies(1);
        setExploreMovies(res || []);
      };
      initialMovies();
    }
  }, [searchQuery]);

  const handleLoadMoreMovies = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = explorePage + 1;
      const res = await getPopularMovies(nextPage);
      if (res && res.length > 0) {
        setExploreMovies(prev => [...prev, ...res]);
        setExplorePage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more movies:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, explorePage]);

  // Infinite scroll — watch sentinel div
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMoreMovies();
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleLoadMoreMovies]);

  return (
    <div className="home w-full flex flex-col min-h-screen">
      {/* Hero Banner - full bleed, no padding */}
      <div className="w-full">
        <HeroCarousel />
      </div>

      {/* Main Content Sections below Hero */}
      <div className="pt-4 flex-1" style={{ paddingLeft: 'clamp(0.75rem, 4vw, 4rem)', paddingRight: 'clamp(0.75rem, 4vw, 4rem)' }}>
        {/* Continue Watching Section */}
        {continueWatching.length > 0 && !searchQuery && (
            <div className="continue-watching-section rounded-2xl" style={{ padding: '1.5rem 4%', background: 'rgba(229, 9, 20, 0.05)', marginBottom: '1rem' }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Continue Watching
                  </h2>
                </div>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1 scroll-smooth pb-3" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
                    {continueWatching.map(item => (
                        <Link to={`/tv/${item.showId}`} key={item.showId} style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }} className="w-48 md:w-64 shrink-0">
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

        {/* ── Main Organized Rows (when browsing default feed) ── */}
        {!searchQuery ? (
          <div className="flex flex-col" style={{ gap: '2rem' }}>
            {/* 1. Trending Now Section */}
            {trendingMovies.length > 0 && (
              <section className="section-row" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <div className="flex items-center justify-between mb-5 md:mb-6" style={{ marginBottom: '1.25rem' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Trending Now
                    </h2>
                  </div>
                  <Link 
                    to="/trending" 
                    className="text-xs sm:text-sm font-semibold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    See All &rsaquo;
                  </Link>
                </div>
                
                <div 
                  className="flex gap-4 overflow-x-auto scrollbar-hide py-2.5 scroll-smooth pb-3" 
                  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '2px', paddingRight: '2px' }}
                >
                  {trendingMovies.map((movie) => (
                    <div key={`trending-${movie.id}`} className="w-40 sm:w-44 md:w-52 shrink-0">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 2. Genre-based Collections */}
            {genreRows.map((row) => (
              row.movies.length > 0 && (
                <section
                  key={row.title}
                  ref={(el) => {
                    if (el) genreRowRefs.current[row.id] = el;
                  }}
                  data-genre-id={row.id}
                  className="section-row"
                  style={{ marginTop: '1rem', marginBottom: '2rem' }}
                >
                  <div className="flex items-center justify-between mb-5 md:mb-6" style={{ marginBottom: '1.25rem' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {row.title}
                      </h2>
                    </div>
                  </div>

                  <div
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-2.5 scroll-smooth pb-3"
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '2px', paddingRight: '2px' }}
                  >
                    {row.movies.map((movie) => (
                      <div key={`${row.title}-${movie.id}`} className="w-40 sm:w-44 md:w-52 shrink-0">
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>

                  {row.isLoadingMore && (
                    <div className="mt-3 flex items-center justify-center text-sm text-zinc-400">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-zinc-700 border-t-red-500" />
                      Loading more...
                    </div>
                  )}
                </section>
              )
            ))}

            {/* 3. New Releases Section */}
            {newReleases.length > 0 && (
              <section className="section-row" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <div className="flex items-center justify-between mb-5 md:mb-6" style={{ marginBottom: '1.25rem' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      New Releases
                    </h2>
                  </div>
                  <Link 
                    to="/movie" 
                    className="text-xs sm:text-sm font-semibold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    See All &rsaquo;
                  </Link>
                </div>
                
                <div 
                  className="flex gap-4 overflow-x-auto scrollbar-hide py-2.5 scroll-smooth pb-3" 
                  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '2px', paddingRight: '2px' }}
                >
                  {newReleases.map((movie) => (
                    <div key={`new-${movie.id}`} className="w-40 sm:w-44 md:w-52 shrink-0">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Top Rated Section */}
            {topRatedMovies.length > 0 && (
              <section className="section-row" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <div className="flex items-center justify-between mb-5 md:mb-6" style={{ marginBottom: '1.25rem' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Top Rated
                    </h2>
                  </div>
                  <Link 
                    to="/trending" 
                    className="text-xs sm:text-sm font-semibold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    See All &rsaquo;
                  </Link>
                </div>
                
                <div 
                  className="flex gap-4 overflow-x-auto scrollbar-hide py-2.5 scroll-smooth pb-3" 
                  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '2px', paddingRight: '2px' }}
                >
                  {topRatedMovies.map((movie) => (
                    <div key={`top-${movie.id}`} className="w-40 sm:w-44 md:w-52 shrink-0">
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. More Movies to Explore Section (Dynamically loaded) */}
            {exploreMovies.length > 0 && (
              <section className="section-row" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                <div className="flex items-center justify-between mb-5 md:mb-6" style={{ marginBottom: '1.25rem' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      More Movies to Explore
                    </h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
                  {exploreMovies.map((movie, idx) => (
                    <MovieCard movie={movie} key={`explore-${movie.id}-${idx}`} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Infinite scroll sentinel ── */}
            <div ref={sentinelRef} className="w-full py-10 flex flex-col items-center justify-center gap-3">
              {loadingMore && (
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-700 border-t-red-500 animate-spin" />
                  <span>Loading more movies…</span>
                </div>
              )}
              {!hasMore && !loadingMore && (
                <p className="text-zinc-600 text-xs tracking-widest uppercase">You've seen it all</p>
              )}
            </div>
          </div>
        ) : (
          <div className="px-0 py-4 my-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-zinc-800/80 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Results for "{searchQuery}"
                </h2>
              </div>
            </div>

            {loading ? (
              <div className="loading-container px-4 py-6 text-center text-zinc-400">
                <div className="loader mx-auto mb-2"></div>
                <p>Loading movies...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6">
                {movies.length > 0 ? movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                )) : (
                  <div className="col-span-full text-center text-slate-400 py-10">No movies found. Try a different search.</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;