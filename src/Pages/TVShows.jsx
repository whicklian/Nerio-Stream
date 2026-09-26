import { useState, useEffect, useRef } from "react";
import { getTVShows, getTVByGenre } from "../Components/Apis";
import { getContinueWatching } from "../utils";
import TVCard from "../Components/TVCard";
import { Link } from "react-router-dom";
import HeroCarousel from "../Components/HeroCarousel";
import "../css/Home.css";

const DEFAULT_TV_GENRE_ROWS = [
    { id: 10759, title: "Action & Adventure" },
    { id: 18, title: "Drama Stories" },
    { id: 35, title: "Comedy Picks" },
    { id: 80, title: "Crime Thrillers" },
    { id: 9648, title: "Mystery Series" }
];

function TVShows() {
    const [shows, setShows] = useState([]);
    const [genreRows, setGenreRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [continueWatching, setContinueWatching] = useState([]);
    const genreRowRefs = useRef({});

    const handleLoadMoreTVGenre = async (genreId) => {
        const row = genreRows.find((item) => item.id === genreId);
        if (!row || row.isLoadingMore || !row.hasMore) return;

        setGenreRows((prev) =>
            prev.map((item) =>
                item.id === genreId
                    ? { ...item, isLoadingMore: true }
                    : item
            )
        );

        try {
            const nextPage = (row.page || 1) + 1;
            const moreShows = await getTVByGenre(genreId, nextPage);

            setGenreRows((prev) =>
                prev.map((item) => {
                    if (item.id !== genreId) return item;

                    const mergedShows = [...(item.movies || []), ...(moreShows || [])];
                    const nextPageValue = moreShows && moreShows.length > 0 ? nextPage : item.page || 1;

                    return {
                        ...item,
                        movies: mergedShows,
                        page: nextPageValue,
                        hasMore: Boolean(moreShows && moreShows.length > 0),
                        isLoadingMore: false,
                    };
                })
            );
        } catch (error) {
            console.error("Failed to load more TV shows for genre:", genreId, error);
            setGenreRows((prev) =>
                prev.map((row) =>
                    row.id === genreId ? { ...row, isLoadingMore: false } : row
                )
            );
        }
    };

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

                    handleLoadMoreTVGenre(genreId);
                });
            },
            { rootMargin: "200px", threshold: 0.1 }
        );

        refs.forEach((ref) => observer.observe(ref));
        return () => observer.disconnect();
    }, [genreRows, handleLoadMoreTVGenre]);

    useEffect(() => {
        const loadInitial = async () => {
            setLoading(true);
            try {
                const popularShows = await getTVShows();
                setShows(popularShows || []);

                const rows = await Promise.all(
                    DEFAULT_TV_GENRE_ROWS.map(async ({ id, title }) => {
                        const items = await getTVByGenre(id, 1);
                        return {
                            id,
                            title,
                            movies: items || [],
                            page: 1,
                            hasMore: Boolean((items || []).length > 0),
                            isLoadingMore: false,
                        };
                    })
                );

                setGenreRows(rows.filter((row) => row.movies.length > 0));
            } catch (error) {
                console.error("Failed to load TV rows:", error);
                setGenreRows([]);
            }

            setContinueWatching(getContinueWatching());
            setLoading(false);
        };

        loadInitial();
    }, []);

    return (
        <div className="home pb-8 w-full">
            <HeroCarousel />

            <div className="pt-4 pb-8" style={{ paddingLeft: 'clamp(0.75rem, 4vw, 4rem)', paddingRight: 'clamp(0.75rem, 4vw, 4rem)' }}>
                <div className="mb-2 sm:mb-4">
                    <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                        <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">TV Shows</h1>
                    </div>
                    <p className="text-sm text-zinc-400">Binge-worthy series, trending premieres, and fan-favorite episodes.</p>
                </div>

                {continueWatching.length > 0 && (
                    <div className="continue-watching-section rounded-2xl" style={{ padding: '1.5rem 4%', background: 'rgba(229, 9, 20, 0.05)', marginBottom: '1rem' }}>
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Continue Watching</h2>
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

                {loading ? (
                    <div className="loading-container">
                        <div className="loader"></div>
                        <p>Loading shows...</p>
                    </div>
                ) : (
                    <div className="flex flex-col" style={{ gap: '2rem' }}>
                        {shows.length > 0 && (
                            <section className="section-row" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                                <div className="flex items-center justify-between mb-5 md:mb-6" style={{ marginBottom: '1.25rem' }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Popular Series</h2>
                                    </div>
                                </div>

                                <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2.5 scroll-smooth pb-3" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '2px', paddingRight: '2px' }}>
                                    {shows.slice(0, 8).map((show) => (
                                        <div key={`popular-${show.id}`} className="w-40 sm:w-44 md:w-52 shrink-0">
                                            <TVCard show={show} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {genreRows.map((row) => (
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
                                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{row.title}</h2>
                                    </div>
                                </div>

                                <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2.5 scroll-smooth pb-3" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '2px', paddingRight: '2px' }}>
                                    {row.movies.map((show) => (
                                        <div key={`${row.title}-${show.id}`} className="w-40 sm:w-44 md:w-52 shrink-0">
                                            <TVCard show={show} />
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="h-px w-full overflow-hidden opacity-0"
                                    aria-hidden="true"
                                />
                            </section>
                        ))}

                        {shows.length > 0 && (
                            <section className="section-row" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                                <div className="flex items-center justify-between mb-5 md:mb-6" style={{ marginBottom: '1.25rem' }}>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-1.5 h-6 bg-red-600 rounded-full shrink-0" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Browse All</h2>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 items-stretch">
                                    {shows.map((show) => (
                                        <TVCard show={show} key={`all-${show.id}`} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TVShows;
