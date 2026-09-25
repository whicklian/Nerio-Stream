import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import AuthModal from "./AuthModal";
import MovieSearchBar from "./MovieSearchBar";

function TopNavbar({ toggleSidebar, isSidebarOpen }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-24 bg-[#0d0d11]/85 border-b border-white/10 z-[70] px-6 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between pt-safe backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center justify-between w-full h-full gap-4 min-w-0">
          {/* Hamburger Menu & Brand Logo Group */}
          <div className="flex items-center gap-4 shrink-0 pl-6 sm:pl-10 md:pl-14 lg:pl-16">
            {/* ── Hamburger / Close toggle button ── */}
            <button
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={isSidebarOpen}
              onClick={toggleSidebar}
              className="relative flex items-center justify-center p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none shrink-0 cursor-pointer"
              style={{ marginLeft: '1.5rem' }}
            >
              {/* Menu icon — slides out when open */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={[
                  "w-6 h-6 absolute transition-all duration-300 ease-in-out",
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

              {/* X / Close icon — slides in when open */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={[
                  "w-6 h-6 absolute transition-all duration-300 ease-in-out",
                  isSidebarOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50",
                ].join(" ")}
                aria-hidden="true"
              >
                <line x1="18" y1="6"  x2="6"  y2="18" />
                <line x1="6"  y1="6"  x2="18" y2="18" />
              </svg>

              {/* Invisible spacer keeps the button's natural size */}
              <span className="w-6 h-6 invisible" aria-hidden="true" />
            </button>

            <Link
              to="/"
              className="text-sm sm:text-base md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-400 tracking-tight shrink-0 drop-shadow-[0_2px_10px_rgba(229,9,20,0.35)] whitespace-nowrap"
            >
              NERIO STREAM
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-2 sm:mx-6 min-w-0">
            <MovieSearchBar />
          </div>

          <div className="flex items-center justify-end shrink-0 pr-6 sm:pr-10 md:pr-14 lg:pr-16">
            {currentUser ? (
              <Link
                to="/profile"
                title="View Profile"
                className="shrink-0 rounded-full p-1 ring-2 ring-white/10 hover:ring-red-500/60 transition-all duration-200"
                style={{ marginRight: '1.5rem' }}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-black text-sm shadow-[0_0_12px_rgba(229,9,20,0.4)]">
                    {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                  </div>
                )}
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
                style={{ marginRight: '1rem' }}
              >
                <svg className="w-4 h-4 text-rose-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

export default TopNavbar;
