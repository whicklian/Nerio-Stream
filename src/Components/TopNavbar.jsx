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
      <header className="fixed top-0 left-0 w-full h-16 bg-[#141414]/95 border-b border-[#2b2b2b] z-50 px-3 py-4 md:px-8 flex items-center justify-between pt-safe backdrop-blur-md">
        <div className="flex items-center justify-between w-full h-full gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 shrink-0">
            <button
              aria-label="Toggle sidebar"
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg border border-[#2b2b2b] bg-[#1f1f1f]/80 text-[#aaaaaa] hover:text-white cursor-pointer transition-all shrink-0 hover:bg-[#2b2b2b]"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link
              to="/"
              className="block truncate text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-rose-400 tracking-tight sm:text-base md:text-xl shrink-0 drop-shadow-[0_2px_10px_rgba(229,9,20,0.35)]"
            >
              NERIO STREAM
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-1 sm:mx-4 min-w-0">
            <MovieSearchBar />
          </div>

          <div className="flex items-center justify-end gap-2 pr-1 shrink-0">
            {currentUser ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-red-500/40 bg-red-950/40 hover:bg-red-900/60 text-xs text-zinc-100 transition-all cursor-pointer shadow-sm"
                title="View Profile"
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-6 h-6 rounded-full border border-red-500 object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center font-black text-[11px] shadow-sm">
                    {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-bold max-w-[110px] truncate text-red-200">
                  {currentUser.displayName || currentUser.email?.split("@")[0]}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-700 text-xs font-bold text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
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
