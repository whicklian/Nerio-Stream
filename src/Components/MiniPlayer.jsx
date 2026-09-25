import { useState } from "react";

function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMedia] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  if (!activeMedia || !isVisible) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 z-50 pointer-events-none">
      <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-2.5 flex items-center justify-between shadow-2xl pointer-events-auto w-72">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
            {activeMedia?.poster ? (
              <img src={activeMedia.poster} alt={activeMedia.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-600 to-rose-600"></div>
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm font-semibold text-zinc-100 line-clamp-1">{activeMedia?.title || "Interstellar"}</h4>
            <p className="text-xs text-zinc-400 line-clamp-1">Currently playing</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-600/30"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
            onClick={() => setIsVisible(false)}
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniPlayer;
