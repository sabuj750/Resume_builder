import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { logout } from "../../app/features/authSlice.js";

const css = `
@keyframes nav-drop { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes nav-menu { from { opacity: 0; transform: translateY(-8px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes nav-ring { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,.45); } 70% { box-shadow: 0 0 0 7px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
.nav-drop { animation: nav-drop .7s cubic-bezier(.22,1,.36,1) backwards; }
.nav-menu { transform-origin: top right; animation: nav-menu .25s cubic-bezier(.22,1,.36,1) backwards; }
.nav-ring { animation: nav-ring 2.4s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .nav-drop, .nav-menu, .nav-ring { animation: none !important; } }
`;

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click / Escape
  React.useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const logoutUser = () => {
    setMenuOpen(false);
    navigate("/");
    dispatch(logout());
  };

  const name = user?.name || "Guest";
  const initial = name.trim().charAt(0).toUpperCase();
  const onDashboard = location.pathname === "/app";

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 print:hidden">
      <style>{css}</style>

      <nav
        className={`nav-drop mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-2.5 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-green-100 bg-white/85 shadow-xl shadow-green-200/40"
            : "border-gray-200/70 bg-white/70 shadow-md shadow-slate-200/50"
        }`}
      >
        {/* Left: logo + link */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <img src="/logo.svg" alt="logo" className="h-9" />
          </Link>

          <span className="hidden h-6 w-px bg-gray-200 sm:block" />

          <Link
            to="/app"
            className={`group relative hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-300 sm:flex ${
              onDashboard
                ? "bg-green-50 text-green-700"
                : "text-slate-600 hover:bg-gray-50 hover:text-green-700"
            }`}
          >
            <LayoutDashboard className="size-4 transition-transform duration-300 group-hover:scale-110" />
            Dashboard
          </Link>
        </div>

        {/* Right: user menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className={`group flex items-center gap-2.5 rounded-full border py-1 pl-1 pr-3 transition-all duration-300 hover:border-green-300 hover:shadow-md hover:shadow-green-100 active:scale-95 ${
              menuOpen
                ? "border-green-300 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <span className="nav-ring flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-sm font-semibold text-white transition-transform duration-300 group-hover:scale-110">
              {initial}
            </span>
            <span className="hidden max-w-32 truncate text-sm font-medium text-slate-700 sm:block">
              {name}
            </span>
            <ChevronDown
              className={`size-4 text-slate-400 transition-transform duration-300 ${
                menuOpen ? "rotate-180 text-green-600" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="nav-menu absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl shadow-slate-300/50"
            >
              <div className="flex items-center gap-3 bg-gradient-to-br from-green-50 to-white px-4 py-3.5 border-b border-gray-100">
                <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 font-semibold text-white">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-green-700/80">Welcome back,</p>
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {name}
                  </p>
                  {user?.email && (
                    <p className="truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-1.5">
                <Link
                  to="/app"
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className="group/item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:bg-green-50 hover:text-green-700 hover:pl-4"
                >
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Link>
                <button
                  role="menuitem"
                  onClick={logoutUser}
                  className="group/item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:pl-4"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;