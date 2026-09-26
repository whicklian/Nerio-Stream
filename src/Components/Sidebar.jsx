import { NavLink } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   Lucide-style inline SVG icons (no external package needed).
   Each renders at w-[18px] h-[18px] with stroke="currentColor".
───────────────────────────────────────────────────────────── */
const Icon = ({ d, children, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.85}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

/* Individual icons — paths match Lucide 0.x exactly */
const ClapperboardIcon = () => (
  <Icon>
    <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
    <path d="m6.2 5.3 3.1 3.9" />
    <path d="m12.4 3.4 3.1 3.9" />
    <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8Z" />
  </Icon>
);

const FlameIcon = () => (
  <Icon>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </Icon>
);

const TvIcon = () => (
  <Icon>
    <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </Icon>
);

const RadioIcon = () => (
  <Icon>
    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
    <circle cx="12" cy="12" r="2" />
    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
    <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
  </Icon>
);

const HeartIcon = () => (
  <Icon>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </Icon>
);

const DownloadIcon = () => (
  <Icon>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

const GemIcon = () => (
  <Icon>
    <polygon points="6 3 18 3 22 9 12 22 2 9" />
    <path d="m12 22 4-13-4-6" />
    <path d="m12 22-4-13 4-6" />
    <path d="M2 9h20" />
  </Icon>
);

const UserIcon = () => (
  <Icon>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

const XIcon = () => (
  <Icon width={16} height={16}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Icon>
);

/* ─────────────────────────────────────────────────────────────
   Navigation items config
───────────────────────────────────────────────────────────── */
const navItems = [
  { to: "/",              Icon: ClapperboardIcon, label: "Movies",       end: true },
  { to: "/tv",            Icon: TvIcon,           label: "TV Shows" },
  { to: "/live",          Icon: RadioIcon,        label: "Live & Sports" },
  { to: "/subscriptions", Icon: GemIcon,          label: "Premium" },
  { to: "/profile",       Icon: UserIcon,         label: "Profile" },
];

/* ─────────────────────────────────────────────────────────────
   Sidebar component
───────────────────────────────────────────────────────────── */
function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* ── Backdrop overlay ── */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`hidden md:block fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Drawer panel ── */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          hidden md:flex fixed left-0 bottom-0 w-64 md:w-72
          flex-col justify-between
          bg-[#0b0f0c]/95 backdrop-blur-xl
          border-r border-white/10
          z-[65]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          top: 'clamp(4rem, 5vw, 6rem)',
          height: 'calc(100vh - clamp(4rem, 5vw, 6rem))',
        }}
      >

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-8 px-3 scrollbar-hide">
          <div className="mb-7 px-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
              Navigate
            </p>
          </div>

          <ul className="space-y-4">
            {navItems.map(({ to, Icon: NavIcon, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-4 px-4 py-4 rounded-xl text-base md:text-lg font-semibold tracking-wide transition-all duration-150",
                      isActive
                        ? "bg-red-600/12 text-red-400 border-l-2 border-red-500 pl-[14px]"
                        : "text-zinc-300 border-l-2 border-transparent",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isActive ? "text-red-400" : "text-zinc-500"
                        }`}
                      >
                        <NavIcon />
                      </span>
                      <span className="truncate">{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
