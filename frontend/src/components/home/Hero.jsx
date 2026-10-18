import React from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Sparkles } from "lucide-react";
import logo from "../../assets/logo.svg";
import { useSelector } from "react-redux";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* { font-family: 'Poppins', sans-serif; }

@keyframes hero-up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
@keyframes hero-blob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(40px,-30px) scale(1.12); } 66% { transform: translate(-30px,30px) scale(0.95); } }
@keyframes hero-gradient { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
@keyframes hero-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@keyframes hero-ring { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,.5); } 70% { box-shadow: 0 0 0 14px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
@keyframes hero-menu-item { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.hero-up { animation: hero-up .9s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.hero-float { animation: hero-float 6s ease-in-out infinite; animation-delay: var(--fd, 0s); }
.hero-blob { animation: hero-blob 16s ease-in-out infinite; }
.hero-ring { animation: hero-ring 2.2s ease-out infinite; }
.hero-gradient-text {
  background: linear-gradient(90deg, #15803d, #22c55e, #86efac, #22c55e, #15803d);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: hero-gradient 5s linear infinite;
}
.hero-shimmer {
  background-image: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: hero-shimmer 3s linear infinite;
}
.hero-menu-item { animation: hero-menu-item .5s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }

@media (prefers-reduced-motion: reduce) {
  .hero-up, .hero-float, .hero-blob, .hero-ring, .hero-gradient-text, .hero-shimmer, .hero-menu-item {
    animation: none !important; opacity: 1 !important; transform: none !important;
  }
}
`;

const d = (i, step = 90) => ({ "--d": `${i * step}ms` });

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#cta" },
];

const avatars = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
  "https://randomuser.me/api/portraits/men/75.jpg",
];

const Hero = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { user } = useSelector((state) => state.auth);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headlineWords = ["Land", "your", "Dream", "job", "with"];

  return (
    <>
      <style>{css}</style>

      <div className="relative isolate min-h-screen pb-24">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-blob absolute top-10 left-1/4 size-72 sm:size-96 xl:size-120 rounded-full bg-green-300/40 blur-[100px]" />
          <div
            className="hero-blob absolute top-40 right-10 size-64 sm:size-80 rounded-full bg-emerald-200/50 blur-[90px]"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="hero-blob absolute bottom-0 left-10 size-56 sm:size-72 rounded-full bg-lime-200/40 blur-[90px]"
            style={{ animationDelay: "-11s" }}
          />
          {/* subtle dotted grid */}
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #86efac 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse at center top, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center top, black 30%, transparent 75%)",
            }}
          />
        </div>

        {/* Navbar */}
        <nav
          className={`sticky top-0 z-50 flex items-center justify-between w-full py-3 px-6 md:px-16 lg:px-24 xl:px-40 text-sm transition-all duration-500 ${
            scrolled
              ? "bg-white/70 backdrop-blur-lg shadow-sm shadow-green-100 border-b border-green-100"
              : "bg-transparent"
          }`}
        >
          <a href="/" className="transition-transform duration-300 hover:scale-105">
            <img src={logo} alt="logo" className="h-11 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8 text-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 transition-colors hover:text-green-600 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:rounded-full after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* auth buttons */}
          <div className="hidden md:flex gap-2">
            {!user && (
              <>
                <Link
                  to="/app?state=register"
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-300 rounded-full text-white shadow-md shadow-green-300/50 hover:shadow-lg hover:shadow-green-300/70 hover:-translate-y-0.5"
                >
                  Get started
                </Link>
                <Link
                  to="/app?state=login"
                  className="px-6 py-2 border border-slate-300 active:scale-95 hover:bg-white hover:border-green-300 transition-all duration-300 rounded-full text-slate-700 hover:text-slate-900 hover:-translate-y-0.5"
                >
                  Login
                </Link>
              </>
            )}
            {user && (
              <Link
                to="/app"
                className="px-6 py-2 border border-slate-300 active:scale-95 hover:bg-white hover:border-green-300 hover:shadow-lg transition-all duration-300 rounded-full text-slate-700 hover:text-slate-900 hover:-translate-y-0.5"
              >
                Dashboard
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-[100] bg-gradient-to-br from-green-900/80 to-black/80 backdrop-blur-md flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {menuOpen &&
            navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="hero-menu-item text-white text-2xl font-medium hover:text-green-300 transition-colors"
                style={d(i + 1, 80)}
              >
                {link.label}
              </a>
            ))}
          {menuOpen && (
            <Link
              to={user ? "/app" : "/app?state=register"}
              onClick={() => setMenuOpen(false)}
              className="hero-menu-item mt-2 px-8 py-3 rounded-full bg-green-500 text-white font-medium"
              style={d(6, 80)}
            >
              {user ? "Dashboard" : "Get started"}
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 hover:rotate-90 transition-all duration-300 text-white rounded-full flex"
          >
            X
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
          {/* Avatars + Stars */}
          <div
            className="hero-up flex items-center mt-16 md:mt-20 rounded-full border border-green-200 bg-white/70 backdrop-blur px-4 py-2 shadow-sm"
            style={d(0)}
          >
            <div className="flex -space-x-3 pr-3">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`user${i + 1}`}
                  className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-1 hover:scale-110 transition duration-300"
                  style={{ zIndex: i + 1 }}
                />
              ))}
            </div>

            <div>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hero-up lucide lucide-star text-transparent fill-green-600"
                      style={d(i + 2, 70)}
                      aria-hidden="true"
                    >
                      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                    </svg>
                  ))}
              </div>
              <p className="text-xs text-gray-700">Used by 10,000+ users</p>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-8 md:leading-[72px]">
            {headlineWords.map((word, i) => (
              <span
                key={word}
                className="hero-up inline-block mr-3"
                style={d(i + 2, 80)}
              >
                {word}
              </span>
            ))}
            <span className="hero-up inline-block mr-3" style={d(7, 80)}>
              <span className="hero-gradient-text text-nowrap">AI-powered</span>
            </span>
            <span className="hero-up inline-block" style={d(8, 80)}>
              Resume.
            </span>
          </h1>

          <p
            className="hero-up max-w-md text-center text-base text-slate-600 my-7"
            style={d(10, 80)}
          >
            Create, edit and download professional resume with AI-powered
            assistance.
          </p>

          {/* CTA Buttons */}
          <div className="hero-up flex items-center gap-4" style={d(11, 80)}>
            <Link
              to="/app"
              className="hero-ring group bg-green-500 hover:bg-green-600 text-white rounded-full px-9 h-12 flex items-center gap-1 shadow-lg shadow-green-300/60 hover:shadow-xl hover:shadow-green-400/60 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Get started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <button className="group flex items-center gap-2 border border-slate-300 bg-white/60 backdrop-blur hover:bg-green-50 hover:border-green-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 rounded-full px-7 h-12 text-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-video size-5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>
              <span>Try demo</span>
            </button>
          </div>

          {/* Product mockup */}
          <div
            className="hero-up relative mt-16 w-full max-w-3xl"
            style={d(13, 80)}
          >
            <div className="hero-float relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-2xl shadow-green-200/60 p-5">
              <div className="flex items-center gap-1.5 mb-5">
                <span className="size-3 rounded-full bg-red-300" />
                <span className="size-3 rounded-full bg-yellow-300" />
                <span className="size-3 rounded-full bg-green-400" />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="size-16 rounded-full bg-gradient-to-br from-green-300 to-emerald-500" />
                  <div className="hero-shimmer h-3 w-3/4 rounded-full" />
                  <div className="hero-shimmer h-2.5 w-1/2 rounded-full" />
                  <div className="pt-3 space-y-2">
                    <div className="h-2.5 w-1/3 rounded-full bg-green-300" />
                    <div className="hero-shimmer h-2 w-full rounded-full" />
                    <div className="hero-shimmer h-2 w-5/6 rounded-full" />
                    <div className="hero-shimmer h-2 w-2/3 rounded-full" />
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-4 text-left">
                  <div>
                    <div className="h-2.5 w-24 rounded-full bg-green-300 mb-3" />
                    <div className="hero-shimmer h-2 w-full rounded-full mb-2" />
                    <div className="hero-shimmer h-2 w-11/12 rounded-full mb-2" />
                    <div className="hero-shimmer h-2 w-4/5 rounded-full" />
                  </div>
                  <div>
                    <div className="h-2.5 w-28 rounded-full bg-green-300 mb-3" />
                    <div className="space-y-2 border-l-2 border-green-300 pl-3">
                      <div className="hero-shimmer h-3 w-1/2 rounded-full" />
                      <div className="hero-shimmer h-2 w-full rounded-full" />
                      <div className="hero-shimmer h-2 w-5/6 rounded-full" />
                    </div>
                    <div className="space-y-2 border-l-2 border-green-200 pl-3 mt-4">
                      <div className="hero-shimmer h-3 w-2/5 rounded-full" />
                      <div className="hero-shimmer h-2 w-full rounded-full" />
                      <div className="hero-shimmer h-2 w-3/4 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating chips */}
            <div
              className="hero-float absolute -left-2 sm:-left-8 top-16 flex items-center gap-2 rounded-xl border border-green-200 bg-white px-3 py-2 shadow-lg shadow-green-100 text-xs text-slate-700"
              style={{ "--fd": "-1.5s" }}
            >
              <Sparkles className="size-4 text-green-600" />
              AI improved your summary
            </div>
            <div
              className="hero-float absolute -right-2 sm:-right-8 bottom-12 flex items-center gap-2 rounded-xl border border-green-200 bg-white px-3 py-2 shadow-lg shadow-green-100 text-xs text-slate-700"
              style={{ "--fd": "-3.5s" }}
            >
              <BadgeCheck className="size-4 text-green-600" />
              ATS score 96%
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;