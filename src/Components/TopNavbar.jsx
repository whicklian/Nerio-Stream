import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import AuthModal from "./AuthModal";
import MovieSearchBar from "./MovieSearchBar";

function TopNavbar({ toggleSidebar }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-[#0f172a] border-b border-slate-800/80 z-50 px-3 py-4 md:px-8 flex items-center justify-between pt-safe">
        <div className="flex items-center justify-between w-full h-full gap-2 sm:gap-4 min-w-0">
          {/* Left: Hamburger & Logo */}
          <div className="flex items-center gap-2 md:gap-4 min-w-0 shrink-0">
            <button
              aria-label="Toggle sidebar"
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-900/50 text-slate-300 hover:text-white cursor-pointer transition-all shrink-0 hover:bg-slate-800/80"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="block truncate text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight sm:text-base md:text-xl shrink-0">
              NERIO STREAM
            </Link>
          </div>

          {/* Center: Live Movie Search Bar */}
          <div className="flex-1 max-w-md mx-1 sm:mx-4 min-w-0">
            <MovieSearchBar />
          </div>

          {/* Right: Auth / Profile Button */}
          <div className="flex items-center justify-end gap-2 pr-1 shrink-0">
            {currentUser ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-indigo-500/40 bg-indigo-950/40 hover:bg-indigo-900/60 text-xs text-slate-100 transition-all cursor-pointer shadow-sm"
                title="View Profile"
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-6 h-6 rounded-full border border-indigo-400 object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center font-black text-[11px] shadow-sm">
                    {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-bold max-w-[110px] truncate text-indigo-200">
                  {currentUser.displayName || currentUser.email?.split("@")[0]}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <svg className="w-4 h-4 text-cyan-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}

export default TopNavbar;
