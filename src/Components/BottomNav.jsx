import { NavLink } from "react-router-dom";

function BottomNav() {
  const navItems = [
    { to: "/", icon: "🎬", label: "Home", end: true },
    { to: "/trending", icon: "🔥", label: "Trending" },
    { to: "/tv", icon: "📺", label: "TV" },
    { to: "/live", icon: "📡", label: "Live" },
    { to: "/favourites", icon: "❤️", label: "Favs" },
    { to: "/downloads", icon: "📥", label: "Downloads" },
    { to: "/subscriptions", icon: "💎", label: "Premium" },
    { to: "/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/80 z-50"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 4px)' }}
    >
      <ul
        className="flex items-stretch overflow-x-auto whitespace-nowrap"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: '4px', paddingRight: '24px', paddingTop: '4px' }}
      >
        {navItems.map((item) => (
          <li key={item.to} style={{ flex: '0 0 auto', minWidth: '64px' }}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 px-1 py-2 rounded-xl transition-all duration-200 w-full min-h-[52px] ${
                  isActive
                    ? "text-red-500"
                    : "text-zinc-500 hover:text-zinc-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-lg leading-none">{item.icon}</span>
                  <span
                    className={`text-[9px] font-semibold leading-tight mt-0.5 ${
                      isActive ? "text-red-500" : "text-zinc-500"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
