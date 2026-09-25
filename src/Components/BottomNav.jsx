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
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/80 z-50 pb-safe">
      <ul className="flex items-center gap-1 overflow-x-auto px-2 py-2 whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navItems.map((item) => (
          <li key={item.to} className="flex-none min-w-[72px]">
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-red-500 font-bold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomNav;
