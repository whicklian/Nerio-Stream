import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getTrending, getPopularMovies } from "./Apis";

export default function HeroCarousel() {
  const [movies, setMovies]         = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading]       = useState(true);
  const timerRef = useRef(null);

  /* ── Fetch ─────────────────────────────────────────────────────── */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        let results = await getTrending("week");
        if (!results?.length) results = await getPopularMovies();
        if (alive && results?.length) setMovies(results.slice(0, 8));
      } catch (e) {
        console.error("HeroCarousel:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  /* ── Auto-advance ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!movies.length) return;
    timerRef.current = setInterval(
      () => setCurrentIndex(i => (i + 1) % movies.length),
      7000
    );
    return () => clearInterval(timerRef.current);
  }, [movies]);

  const prev = () => setCurrentIndex(i => (i - 1 + movies.length) % movies.length);
  const next = () => setCurrentIndex(i => (i + 1) % movies.length);

  /* ── Loading skeleton ───────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="w-full h-[50vh] sm:h-[65vh] md:h-[78vh] min-h-[360px] sm:min-h-[480px] md:min-h-[580px] max-h-[880px] bg-zinc-900 animate-pulse flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 rounded-full border-2 border-red-600 border-t-transparent animate-spin" />
          <p className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">
            Loading featured titles…
          </p>
        </div>
      </div>
    );
  }

  if (!movies.length) return null;

  const film = movies[currentIndex];

  const backdrop = film.backdrop_path
    ? `https://image.tmdb.org/t/p/original${film.backdrop_path}`
    : film.poster_path
    ? `https://image.tmdb.org/t/p/original${film.poster_path}`
    : null;

  const year = film.release_date
    ? new Date(film.release_date).getFullYear()
    : film.first_air_date
    ? new Date(film.first_air_date).getFullYear()
    : null;

  const rating = film.vote_average ? film.vote_average.toFixed(1) : "—";
  const title  = film.title || film.name || "Untitled";

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <section className="relative w-full h-[42vh] sm:h-[58vh] md:h-[78vh] min-h-[300px] sm:min-h-[420px] md:min-h-[580px] max-h-[880px] overflow-hidden bg-zinc-950">

      {/* ── 1. Background backdrop ─────────────────────────────────── */}
      {backdrop && (
        <img
          key={backdrop}           /* re-mount on slide change for fade */
          src={backdrop}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center
                     animate-[fadeIn_0.8s_ease-in-out]"
        />
      )}

      {/* ── 2. Gradient overlays ────────────────────────────────────── */}
      {/* Left-to-right: black covers left content, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
      {/* Top dark wash so navbar stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
      {/* Bottom fade — blends into the movie grid below */}
      <div className="absolute inset-x-0 bottom-0 h-40
                      bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

      {/* ── 3. Main content ─────────────────────────────────────────── */}
      <div
        className="relative z-10 h-full flex flex-col justify-end md:justify-center pt-5 pb-20 sm:pt-8 sm:pb-24 md:py-12"
        style={{ paddingLeft: 'clamp(0.85rem, 3.5vw, 4rem)', paddingRight: 'clamp(0.85rem, 3.5vw, 4rem)' }}
      >

        {/* ── Left column: all the text content ─────────────────────── */}
        <div className="flex flex-col justify-end md:justify-center w-full" style={{ maxWidth: '680px' }}>

          {/* Top Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3 md:mb-4">
            {/* Featured Tag */}
            <span className="bg-red-600 text-white font-semibold text-xs uppercase tracking-wider" style={{ borderRadius: '6px', padding: '6px 14px' }}>
              #{currentIndex + 1} FEATURED MOVIE
            </span>

            {/* Year */}
            {year && (
              <span className="bg-white/10 backdrop-blur-md text-zinc-200 text-xs border border-white/10" style={{ borderRadius: '6px', padding: '6px 12px' }}>
                {year}
              </span>
            )}

            {/* Rating Badge */}
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 flex items-center gap-1.5" style={{ borderRadius: '6px', padding: '6px 12px' }}>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>{rating}</span>
            </span>

            {/* Resolution */}
            <span className="bg-white/10 backdrop-blur-md text-zinc-200 text-xs border border-white/10" style={{ borderRadius: '6px', padding: '6px 12px' }}>
              4K ULTRA HD
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
            {title}
          </h1>

          {/* Overview */}
          <p className="mt-2 sm:mt-3 md:mt-5 max-w-xl text-[11px] sm:text-sm md:text-[17px] text-zinc-300 leading-relaxed line-clamp-2 sm:line-clamp-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {film.overview ||
              "Stream this blockbuster exclusively in 4K Ultra HD on Nerio Stream."}
          </p>

          {/* Call-to-Action (CTA) Buttons */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-7">
            {/* Play Now Button (Subtle 6px Rounded CTA) */}
            <Link
              to={`/movie/${film.id}`}
              className="inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
              style={{
                background: 'linear-gradient(135deg, #e50914 0%, #b81d24 100%)',
                color: '#ffffff',
                fontSize: 'clamp(13px, 2vw, 16px)',
                fontWeight: '700',
                padding: 'clamp(10px, 2vw, 14px) clamp(18px, 3vw, 28px)',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 25px rgba(229, 9, 20, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
              }}
            >
              <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Play Now</span>
            </Link>

            {/* More Info Button (Subtle 6px Glassmorphic CTA) */}
            <Link
              to={`/movie/${film.id}`}
              className="inline-flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                color: '#ffffff',
                fontSize: 'clamp(13px, 2vw, 16px)',
                fontWeight: '600',
                padding: 'clamp(10px, 2vw, 14px) clamp(18px, 3vw, 28px)',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              }}
            >
              <svg className="w-5 h-5 fill-none stroke-white stroke-[2.2] shrink-0" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 8h.01M12 11v5" />
              </svg>
              <span>More Info</span>
            </Link>
          </div>
        </div>

        {/* ── Right column: hidden — poster removed to avoid overlap ─── */}
        {/*
            The vertical poster was causing visual collision with the backdrop.
            Intentionally removed from desktop layout per design spec.
            Re-enable this block if a side-by-side layout is preferred later.
        */}
      </div>

      {/* ── 4. Bottom indicator row ─────────────────────────────────── */}
      <div
        className="absolute bottom-4 sm:bottom-7 inset-x-0 z-20 flex items-center justify-between"
        style={{ paddingLeft: 'clamp(0.85rem, 3.5vw, 7rem)', paddingRight: 'clamp(0.85rem, 3.5vw, 5rem)' }}
      >

        {/* Slide dots */}
        <div className="flex items-center gap-2.5">
          {movies.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300
                ${idx === currentIndex
                  ? "w-8 bg-red-600 shadow-[0_0_10px_rgba(229,9,20,0.8)]"
                  : "w-2.5 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>

        {/* Prev / Next arrows */}
        <div className="flex items-center gap-2">
          {[{ fn: prev, icon: "‹", label: "Previous" },
            { fn: next, icon: "›", label: "Next" }].map(({ fn, icon, label }) => (
            <button
              key={label}
              onClick={fn}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center
                         rounded-lg border border-white/20 bg-black/50
                         text-white text-xl font-bold backdrop-blur-md
                         hover:bg-red-600 hover:border-red-600
                         transition-all duration-200 shadow-md"
            >
              {icon}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
