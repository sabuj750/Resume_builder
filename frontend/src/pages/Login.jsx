import React from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Sparkles,
  BadgeCheck,
  Check,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../../app/features/authSlice";
import toast from "react-hot-toast";
import api from "../configs/api";

const css = `
@keyframes lg-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lg-left { from { opacity: 0; transform: translateX(-32px); } to { opacity: 1; transform: translateX(0); } }
@keyframes lg-swap { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes lg-down { from { opacity: 0; transform: translateY(-10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes lg-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes lg-blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(40px,-30px) scale(1.12); } 66% { transform: translate(-30px,30px) scale(0.95); } }
@keyframes lg-shine { 0% { transform: translateX(-130%) skewX(-20deg); } 60%,100% { transform: translateX(280%) skewX(-20deg); } }
@keyframes lg-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.lg-up { animation: lg-up .8s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.lg-left { animation: lg-left .8s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.lg-swap { animation: lg-swap .45s cubic-bezier(.22,1,.36,1) both; }
.lg-down { animation: lg-down .4s cubic-bezier(.22,1,.36,1) both; }
.lg-float { animation: lg-float 6s ease-in-out infinite; animation-delay: var(--fd, 0s); }
.lg-blob { animation: lg-blob 16s ease-in-out infinite; }
.lg-shine { animation: lg-shine 3.2s ease-in-out infinite; }
.lg-shimmer {
  background-image: linear-gradient(90deg, rgba(255,255,255,.18) 25%, rgba(255,255,255,.4) 50%, rgba(255,255,255,.18) 75%);
  background-size: 200% 100%;
  animation: lg-shimmer 3s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .lg-up, .lg-left, .lg-swap, .lg-down, .lg-float, .lg-blob, .lg-shine, .lg-shimmer {
    animation: none !important; opacity: 1 !important; transform: none !important;
  }
}
`;

const perks = [
  "AI-powered summaries and job descriptions",
  "ATS-friendly templates, one-click PDF",
  "Share a public link to your resume",
];

const wrapCls =
  "group flex items-center w-full bg-white/80 border border-gray-200 h-12 rounded-full overflow-hidden pl-5 pr-4 gap-3 transition-all duration-300 hover:border-gray-300 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100 focus-within:bg-white";
const iconCls =
  "size-4 shrink-0 text-green-800/50 transition-colors duration-300 group-focus-within:text-green-600";
const inputCls =
  "w-full h-full bg-transparent border-none outline-none ring-0 text-sm text-gray-800 placeholder:text-gray-400";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState(urlState || "login");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const isLogin = state === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await api.post(`api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(
        `Successfully ${state === "login" ? "logged in" : "registered"}`,
      );
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 lg:grid lg:grid-cols-2">
      <style>{css}</style>

      {/* ---------------- Left: brand panel (desktop) ---------------- */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-900 p-12 text-white">
        {/* background effects */}
        <div className="lg-blob pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-green-300/30 blur-3xl" />
        <div
          className="lg-blob pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-emerald-300/25 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        <a href="/" className="lg-left relative w-fit rounded-lg bg-white/95 px-3 py-1.5 shadow-lg transition-transform duration-300 hover:scale-105">
          <img src="/logo.svg" alt="logo" className="h-9" />
        </a>

        <div className="relative">
          <h2
            className="lg-left text-4xl xl:text-5xl font-semibold leading-tight"
            style={{ "--d": "100ms" }}
          >
            Build a resume that
            <br />
            gets you{" "}
            <span className="bg-gradient-to-r from-lime-200 to-white bg-clip-text text-transparent">
              hired.
            </span>
          </h2>

          <ul className="mt-8 space-y-3">
            {perks.map((perk, i) => (
              <li
                key={perk}
                className="lg-left flex items-center gap-3 text-green-50"
                style={{ "--d": `${250 + i * 120}ms` }}
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40">
                  <Check className="size-3.5" />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          {/* floating resume mockup */}
          <div
            className="lg-up relative mt-12 max-w-sm"
            style={{ "--d": "600ms" }}
          >
            <div className="lg-float rounded-2xl border border-white/30 bg-white/15 p-5 shadow-2xl shadow-black/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-gradient-to-br from-lime-200 to-white" />
                <div className="flex-1 space-y-2">
                  <div className="lg-shimmer h-3 w-2/3 rounded-full" />
                  <div className="lg-shimmer h-2.5 w-1/3 rounded-full" />
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <div className="h-2.5 w-20 rounded-full bg-white/60" />
                <div className="lg-shimmer h-2 w-full rounded-full" />
                <div className="lg-shimmer h-2 w-11/12 rounded-full" />
                <div className="lg-shimmer h-2 w-3/4 rounded-full" />
              </div>
            </div>

            <div
              className="lg-float absolute -right-6 -top-5 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-slate-700 shadow-xl"
              style={{ "--fd": "-2s" }}
            >
              <Sparkles className="size-4 text-green-600" />
              AI improved your summary
            </div>
            <div
              className="lg-float absolute -left-6 -bottom-5 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs text-slate-700 shadow-xl"
              style={{ "--fd": "-4s" }}
            >
              <BadgeCheck className="size-4 text-green-600" />
              ATS score 96%
            </div>
          </div>
        </div>

        <p className="lg-left relative text-sm text-green-100/80" style={{ "--d": "800ms" }}>
          Trusted by 10,000+ job seekers
        </p>
      </aside>

      {/* ---------------- Right: form ---------------- */}
      <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
        {/* soft background glows */}
        <div className="lg-blob pointer-events-none absolute -z-10 top-10 right-10 size-72 rounded-full bg-green-200/50 blur-3xl" />
        <div
          className="lg-blob pointer-events-none absolute -z-10 bottom-10 left-10 size-72 rounded-full bg-emerald-200/50 blur-3xl"
          style={{ animationDelay: "-8s" }}
        />

        <form
          onSubmit={handleSubmit}
          className="lg-up relative w-full sm:w-[400px] overflow-hidden rounded-3xl border border-white/80 bg-white/80 px-8 pb-9 pt-8 text-center shadow-2xl shadow-green-200/50 backdrop-blur-xl"
        >
          {/* top accent bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />

          <a href="/" className="inline-block transition-transform duration-300 hover:scale-105 lg:hidden">
            <img src="/logo.svg" alt="logo" className="mx-auto h-10" />
          </a>

          {/* heading swaps with a soft animation when the mode changes */}
          <div key={state} className="lg-swap">
            <h1 className="mt-4 text-3xl font-semibold text-gray-900">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {isLogin
                ? "Please sign in to continue"
                : "Sign up to start building your resume"}
            </p>
          </div>

          <div className="mt-7 space-y-4">
            {!isLogin && (
              <div className="lg-down">
                <div className={wrapCls}>
                  <User className={iconCls} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={inputCls}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className={wrapCls}>
              <Mail className={iconCls} />
              <input
                type="email"
                name="email"
                placeholder="Email id"
                className={inputCls}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={wrapCls}>
              <Lock className={iconCls} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={inputCls}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-gray-400 transition-all duration-200 hover:text-green-600 active:scale-90"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="mt-3 text-right">
              <button
                className="text-sm text-green-600 transition-colors hover:text-green-700 hover:underline"
                type="button"
              >
                Forget password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`group relative ${isLogin ? "mt-3" : "mt-6"} flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-green-500 to-emerald-600 font-medium text-white shadow-lg shadow-green-300/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-400/60 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:translate-y-0`}
          >
            <span className="lg-shine absolute inset-y-0 left-0 w-1/3 bg-white/30" />
            {isLoading ? (
              <>
                <Loader2 className="relative size-4 animate-spin" />
                <span className="relative">Please wait...</span>
              </>
            ) : (
              <>
                <span className="relative">{isLogin ? "Login" : "Sign up"}</span>
                <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </>
            )}
          </button>

          <p className="mt-5 text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() =>
                setState((prev) => (prev === "login" ? "register" : "login"))
              }
              className="font-medium text-green-600 transition-colors hover:text-green-700 hover:underline"
            >
              click here
            </button>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;