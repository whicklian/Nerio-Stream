import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import AuthModal from "./AuthModal";
import MovieSearchBar from "./MovieSearchBar";

function TopNavbar({ toggleSidebar, isSidebarOpen }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showSidebarToggle, setShowSidebarToggle] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setShowSidebarToggle(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Single header — all horizontal spacing controlled here with px-* */}
      <header className="relative top-0 left-0 w-full h-14 sm:h-16 md:h-20 bg-[#0d0d11]/85 border-b border-white/10 z-40 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 gap-2 sm:gap-3 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.04)]">

        {/* ── LEFT: Hamburger + Brand ────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-1 sm:pl-2">

          {/* Hamburger / Close toggle */}
          {showSidebarToggle && (
            <button
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={isSidebarOpen}
              onClick={toggleSidebar}
              className="nav-hamburger relative items-center justify-center w-10 h-10 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none shrink-0 cursor-pointer"
            >
            {/* Menu bars — slides out when sidebar opens */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={[
                "w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ease-in-out",
                isSidebarOpen
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100",
              ].join(" ")}
              aria-hidden="true"
            >
              <line x1="4" y1="6"  x2="20" y2="6"  />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>

            {/* X — slides in when sidebar opens */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={[
                "w-5 h-5 sm:w-6 sm:h-6 absolute transition-all duration-300 ease-in-out",
                isSidebarOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50",
              ].join(" ")}
              aria-hidden="true"
            >
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>

              {/* Invisible spacer — keeps the button's natural footprint */}
              <span className="w-5 h-5 sm:w-6 sm:h-6 invisible" aria-hidden="true" />
            </button>
          )}

          {/* Brand wordmark */}
          <Link
            to="/"
            className="text-sm sm:text-base md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-400 tracking-tight shrink-0 drop-shadow-[0_2px_10px_rgba(229,9,20,0.35)] whitespace-nowrap"
          >
            NERIO STREAM
          </Link>
        </div>

        {/* ── CENTER: Search bar ─────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex justify-center">
          <div className="w-full max-w-[170px] sm:max-w-[260px] md:max-w-md lg:max-w-xl">
            <MovieSearchBar />
          </div>
        </div>

        {/* ── RIGHT: Avatar or Sign In ───────────────────────────── */}
        <div className="shrink-0 flex items-center ml-auto pr-1 sm:pr-2">
          {currentUser ? (
            <Link
              to="/profile"
              title="View Profile"
              className="rounded-full p-1 ring-2 ring-white/10 hover:ring-red-500/60 transition-all duration-200"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Avatar"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-[0_0_12px_rgba(229,9,20,0.4)]">
                  {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                </div>
              )}
            </Link>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700 text-[10px] sm:text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="max-[380px]:hidden">Sign In</span>
            </button>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

export default TopNavbar;
