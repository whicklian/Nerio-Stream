import { useState, useEffect, useRef, useCallback } from "react";
import { getTrending } from "../Components/Apis";
import MovieCard from "../Components/MovieCard";
import "../css/Home.css";

function Trending() {
    const [movies, setMovies] = useState([]);
    const [timeWindow, setTimeWindow] = useState("week");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const sentinelRef = useRef(null);

    const loadPage = useCallback(async (nextPage = 1) => {
        const data = await getTrending(timeWindow, nextPage);
        if (!data || data.length === 0) {
            setHasMore(false);
            return [];
        }
        return data;
    }, [timeWindow]);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            setLoading(true);
            setLoadingMore(false);
            const data = await loadPage(1);
            if (!isMounted) return;
            setMovies(data || []);
            setPage(1);
            setHasMore(Boolean((data || []).length > 0));
            setLoading(false);
        };

        load();
        return () => { isMounted = false; };
    }, [timeWindow, loadPage]);

    const handleLoadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        const nextPage = page + 1;
        const data = await loadPage(nextPage);

        if (data && data.length > 0) {
            setMovies((prev) => [...prev, ...data]);
            setPage(nextPage);
            setHasMore(true);
        } else {
            setHasMore(false);
        }

        setLoadingMore(false);
    }, [hasMore, loadingMore, loadPage, page]);

    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    handleLoadMore();
                }
            },
            { rootMargin: "200px", threshold: 0.1 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [handleLoadMore]);

    return (
        <div className="home py-4 sm:py-6" style={{ paddingLeft: 'clamp(0.75rem, 4vw, 4rem)', paddingRight: 'clamp(0.75rem, 4vw, 4rem)' }}>
            <div className="hero-section" style={{ paddingBottom: "2rem" }}>
                <h1 className="hero-title">🔥 Trending Now</h1>
                <p className="hero-subtitle">The most popular movies everyone's watching right now.</p>
                <div className="time-toggle">
                    <button
                        className={`genre-pill ${timeWindow === "day" ? "active" : ""}`}
                        onClick={() => setTimeWindow("day")}
                    >
                        Today
                    </button>
                    <button
                        className={`genre-pill ${timeWindow === "week" ? "active" : ""}`}
                        onClick={() => setTimeWindow("week")}
                    >
                        This Week
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading trending movies...</p>
                </div>
            ) : (
                <div className="px-0 py-4 sm:py-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 items-stretch">
                        {movies.map(movie => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>

                    {hasMore && (
                        <div
                            ref={sentinelRef}
                            className="h-px w-full overflow-hidden opacity-0"
                            aria-hidden="true"
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Trending;
