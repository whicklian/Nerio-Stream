import { NavLink } from "react-router-dom";

const HomeIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M9 20v-7h6v7" />
  </svg>
);

const FlameIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 2c1.8 2.5 2.8 3.9 2.8 6.1A3.2 3.2 0 0 1 11.6 11c-.4 1.7-1.8 2.9-3.5 3.2 1.4 2 3.1 3.1 5.4 3.1A7 7 0 1 0 5 8.3c0-1.7.6-3.3 1.6-4.5C7.7 4.9 9.3 4 12 2Z" />
  </svg>
);

const TvIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="5" width="20" height="13" rx="2" />
    <path d="M8 19h8" />
    <path d="M10 9.5 14.5 12 10 14.5v-5Z" fill="currentColor" stroke="none" />
  </svg>
);

const HeartIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 20.5s-7.5-4.35-9.5-8.34C.9 9.42 2.3 4.5 7 4.5c2.2 0 3.5 1.1 5 2.5 1.5-1.4 2.8-2.5 5-2.5 4.7 0 6.1 4.92 4.5 7.66-2 3.99-9.5 8.34-9.5 8.34Z" />
  </svg>
);

const UserIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

function BottomNav() {
  const navItems = [
    { to: "/", label: "Home", end: true, Icon: HomeIcon },
    { to: "/trending", label: "Trending", Icon: FlameIcon },
    { to: "/tv", label: "TV Shows", Icon: TvIcon },
    { to: "/favourites", label: "Favorites", Icon: HeartIcon },
    { to: "/profile", label: "Profile", Icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl px-4 py-2 md:hidden" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.5rem)" }}>
      <div className="mx-auto flex max-w-md items-center justify-around gap-1">
        {navItems.map(({ to, label, end, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                "flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors duration-200",
                isActive ? "text-red-500 font-bold" : "text-zinc-400 hover:text-white",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`h-5 w-5 ${isActive ? "text-red-500" : "text-zinc-400"}`} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
