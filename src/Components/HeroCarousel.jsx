import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPopularMovies } from "../Components/Apis";

const FALLBACK_SLIDES = [
  {
    id: 653346,
    title: "Kingdom of the Planet of the Apes",
    overview: "One generation after Caesar's reign, apes are the dominant species living harmoniously, while humans have been reduced to living in the shadows.",
    release_date: "2024",
    vote_average: 7.2,
    backdrop_path: "/fqv8VfvShKMWRgOSSp3GIwScSjT.jpg"
  },
  {
    id: 1022789,
    title: "Inside Out 2",
    overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions!",
    release_date: "2024",
    vote_average: 7.6,
    backdrop_path: "/stKGOm9Uy92x2m1zGZ7P921R9w.jpg"
  },
  {
    id: 573435,
    title: "Bad Boys: Ride or Die",
    overview: "After their late former Captain is framed, Miami cops Mike Lowrey and Marcus Burnett go on the run to clear his name.",
    release_date: "2024",
    vote_average: 7.5,
    backdrop_path: "/gRAkg8hLMy6vQgCSGZLVywDh9vi.jpg"
  }
];

export default function HeroCarousel() {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    getPopularMovies()
      .then((movies) => {
        if (isMounted && movies && movies.length > 0) {
          const validMovies = movies.filter(m => m.backdrop_path).slice(0, 8);
          if (validMovies.length > 0) {
            setSlides(validMovies);
          }
        }
      })
      .catch((err) => console.error("Failed to load hero carousel movies:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (isHovered || slides.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex] || slides[0];

  const getBackdropUrl = (slide) => {
    if (!slide) return "";
    if (slide.backdrop_path) {
      if (slide.backdrop_path.startsWith("http")) return slide.backdrop_path;
      return `https://image.tmdb.org/t/p/w1280${slide.backdrop_path}`;
    }
    return slide.backdropUrl || "";
  };

  return (
    <div
      className="relative w-full h-[70vh] md:h-[82vh] lg:h-[88vh] min-h-[560px] max-h-[880px] overflow-hidden group bg-[#09090b]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => {
        const bgUrl = getBackdropUrl(slide);
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
              isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
              backgroundColor: "#09090b"
            }}
          >
            {/* Multilayered Seamless Hero Gradient Vignettes */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, #09090b 0%, rgba(9,9,11,0.92) 35%, rgba(9,9,11,0.4) 70%, transparent 100%)"
              }}
            />
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(0deg, #09090b 0%, rgba(9,9,11,0.85) 30%, transparent 70%)"
              }}
            />
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 80% 20%, rgba(229, 9, 20, 0.18) 0%, transparent 55%)"
              }}
            />
          </div>
        );
      })}

      {/* Content Overlay - Proportional sizing & no button clipping */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end items-start text-left px-6 md:px-8 pb-6 md:pb-8 max-w-3xl">
        
        {/* Rating, Year & Tech Badges Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          {/* TMDB Rating Pill */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black text-amber-300 bg-amber-500/20 border border-amber-500/40 backdrop-blur-xl shadow-md">
            <svg className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {currentSlide?.vote_average ? currentSlide.vote_average.toFixed(1) : "8.5"}
          </span>

          {/* Release Year Pill */}
          <span className="px-3 py-1 rounded-full text-xs font-extrabold text-red-300 bg-red-500/20 border border-red-500/40 backdrop-blur-xl shadow-md">
            {currentSlide?.release_date?.split("-")[0] || currentSlide?.year || "2026"}
          </span>

          {/* Original Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-zinc-200 bg-zinc-900/80 border border-zinc-700/80 backdrop-blur-xl shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            Nerio Original
          </span>

          {/* 4K Ultra HD Badge */}
          <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider text-zinc-300 bg-zinc-800/60 border border-zinc-700/60 backdrop-blur-md">
            4K ULTRA HD
          </span>
        </div>

        {/* Hero Title - Balanced Size */}
        <h1 
          className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight mb-2.5 tracking-tight break-words text-left max-w-2xl"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #f4f4f5 65%, #a1a1aa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.95))"
          }}
        >
          {currentSlide?.title || currentSlide?.name}
        </h1>

        {/* Hero Overview - Line Clamp 2 */}
        <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 mb-5 max-w-xl font-medium text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {currentSlide?.overview || "Experience high definition ad-free streaming on Nerio Stream."}
        </p>

        {/* Action Buttons: Watch Now & Details - 100% Fully Visible */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={() => navigate(`/movie/${currentSlide.id}`)}
            className="flex items-center gap-2 px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_6px_20px_rgba(229,9,20,0.45)] transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>WATCH NOW</span>
          </button>

          <Link
            to={`/movie/${currentSlide.id}`}
            className="flex items-center gap-2 px-5 py-2.5 md:py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 text-white font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-xl transition-all hover:scale-[1.03] active:scale-95 shadow-md"
          >
            <svg className="w-4 h-4 stroke-zinc-300 fill-none" viewBox="0 0 24 24" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>DETAILS</span>
          </Link>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                index === currentIndex 
                  ? "w-8 bg-gradient-to-r from-red-500 to-rose-500 shadow-md shadow-red-500/50" 
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Manual Navigation Arrows */}
      <div className="absolute bottom-6 right-6 md:right-8 z-30 hidden sm:flex items-center gap-2.5">
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-950/80 hover:bg-red-600 hover:border-red-500 text-white flex items-center justify-center backdrop-blur-xl transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer group/btn"
        >
          <svg className="w-4 h-4 text-zinc-300 group-hover/btn:text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-950/80 hover:bg-red-600 hover:border-red-500 text-white flex items-center justify-center backdrop-blur-xl transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer group/btn"
        >
          <svg className="w-4 h-4 text-zinc-300 group-hover/btn:text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
