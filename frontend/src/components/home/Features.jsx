import React from "react";
import { Zap, Wand2, ShieldCheck, FileDown, Sparkles, Check } from "lucide-react";
import Title from "./Title.jsx";
import Reveal from "./Reveal.jsx";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* { font-family: 'Poppins', sans-serif; }

@keyframes feat-blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.15); } }
@keyframes feat-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes feat-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@keyframes feat-caret { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
.feat-blob { animation: feat-blob 14s ease-in-out infinite; }
.feat-float { animation: feat-float 5s ease-in-out infinite; }
.feat-caret { animation: feat-caret 1s steps(1) infinite; }
.feat-line {
  background-image: linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%);
  background-size: 200% 100%;
  animation: feat-shimmer 3s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .feat-blob, .feat-float, .feat-caret, .feat-line { animation: none !important; } }
`;

const highlights = [
  {
    icon: Wand2,
    title: "AI-powered writing",
    text: "Turn rough notes into polished, impactful bullet points.",
  },
  {
    icon: ShieldCheck,
    title: "ATS-friendly templates",
    text: "Clean layouts that recruiters and scanners read perfectly.",
  },
  {
    icon: FileDown,
    title: "One-click download",
    text: "Share a public link or export a crisp PDF in seconds.",
  },
];

const swatches = ["#10B981", "#3B82F6", "#8B5CF6", "#F97316", "#EC4899"];

/* ---------- Visual 1: interactive builder mockup ---------- */
const BuilderMockup = () => {
  const [accent, setAccent] = React.useState(swatches[0]);

  return (
    <div className="group relative rounded-2xl p-1.5 bg-gradient-to-br from-green-200 via-white to-emerald-200 shadow-xl shadow-green-100 transition-shadow duration-500 hover:shadow-2xl hover:shadow-green-200">
      <div className="overflow-hidden rounded-xl bg-white">
        {/* window bar */}
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-300" />
            <span className="size-2.5 rounded-full bg-yellow-300" />
            <span className="size-2.5 rounded-full bg-green-400" />
          </div>
          <div className="mx-auto hidden rounded-full bg-white px-4 py-1 text-[10px] text-slate-400 ring-1 ring-slate-200 sm:block">
            resume.app/builder
          </div>
        </div>

        <div className="grid sm:grid-cols-5">
          {/* editor */}
          <div className="space-y-4 border-b border-slate-100 p-4 sm:col-span-2 sm:border-b-0 sm:border-r">
            <div>
              <p className="text-[11px] font-semibold text-slate-700">
                Professional Summary
              </p>
              <div className="mt-2 space-y-1.5 rounded-lg border border-slate-200 p-2.5 transition-colors duration-300 group-hover:border-green-300">
                <div className="feat-line h-2 w-full rounded-full" />
                <div className="feat-line h-2 w-11/12 rounded-full" />
                <div className="flex items-center gap-0.5">
                  <div className="feat-line h-2 w-1/2 rounded-full" />
                  <span className="feat-caret h-3 w-px bg-green-500" />
                </div>
              </div>
              <button
                type="button"
                className="mt-2.5 inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 px-2.5 py-1.5 text-[10px] font-medium text-white shadow transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Sparkles className="size-3" />
                AI Enhance
              </button>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-slate-700">
                Accent colour
              </p>
              <div className="mt-2 flex gap-2">
                {swatches.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setAccent(c)}
                    aria-label={`Use accent ${c}`}
                    className={`flex size-6 items-center justify-center rounded-full transition-all duration-300 hover:scale-125 active:scale-90 ${
                      accent === c ? "ring-2 ring-offset-2 scale-110" : ""
                    }`}
                    style={{ backgroundColor: c, "--tw-ring-color": c }}
                  >
                    {accent === c && <Check className="size-3 text-white" />}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-slate-400">
                Try one, the preview updates instantly.
              </p>
            </div>
          </div>

          {/* live preview */}
          <div className="bg-gradient-to-br from-slate-100 to-green-50/60 p-4 sm:col-span-3">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg shadow-slate-300/50">
              <div
                className="p-4 text-white transition-colors duration-500"
                style={{ backgroundColor: accent }}
              >
                <div className="h-3 w-32 rounded-full bg-white/90" />
                <div className="mt-2 flex gap-2">
                  <div className="h-2 w-16 rounded-full bg-white/60" />
                  <div className="h-2 w-20 rounded-full bg-white/60" />
                  <div className="h-2 w-12 rounded-full bg-white/60" />
                </div>
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <div
                    className="mb-2 h-2.5 w-24 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: accent }}
                  />
                  <div className="space-y-1.5">
                    <div className="feat-line h-2 w-full rounded-full" />
                    <div className="feat-line h-2 w-5/6 rounded-full" />
                  </div>
                </div>
                <div>
                  <div
                    className="mb-2 h-2.5 w-20 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: accent }}
                  />
                  <div
                    className="space-y-1.5 border-l-2 pl-3 transition-colors duration-500"
                    style={{ borderColor: accent }}
                  >
                    <div className="h-2.5 w-2/5 rounded-full bg-slate-300" />
                    <div className="feat-line h-2 w-full rounded-full" />
                    <div className="feat-line h-2 w-3/4 rounded-full" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "Node", "UI"].map((s) => (
                    <span
                      key={s}
                      className="rounded-full px-2.5 py-0.5 text-[9px] font-medium text-white transition-colors duration-500"
                      style={{ backgroundColor: accent }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feat-float absolute -bottom-4 -right-3 hidden sm:flex items-center gap-2 rounded-xl border border-green-200 bg-white px-3 py-2 text-xs text-slate-700 shadow-lg">
        <span className="size-2 rounded-full bg-green-500 animate-pulse" />
        Live preview
      </div>
    </div>
  );
};

/* ---------- Visual 2: fanned template cards ---------- */
const MiniResume = ({ color, variant }) => (
  <div className="h-full w-full overflow-hidden rounded-lg bg-white">
    {variant === "banner" && (
      <>
        <div className="h-9 p-2" style={{ backgroundColor: color }}>
          <div className="h-2 w-14 rounded-full bg-white/90" />
          <div className="mt-1.5 h-1.5 w-20 rounded-full bg-white/60" />
        </div>
        <div className="space-y-2 p-2.5">
          <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: color }} />
          <div className="h-1.5 w-full rounded-full bg-slate-200" />
          <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
          <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: color }} />
          <div className="h-1.5 w-full rounded-full bg-slate-200" />
        </div>
      </>
    )}
    {variant === "centered" && (
      <div className="space-y-2 p-3">
        <div className="mx-auto h-2 w-16 rounded-full" style={{ backgroundColor: color }} />
        <div className="mx-auto h-1.5 w-24 rounded-full bg-slate-200" />
        <div className="h-px w-full" style={{ backgroundColor: color }} />
        <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: color }} />
        <div className="h-1.5 w-full rounded-full bg-slate-200" />
        <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
        <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: color }} />
        <div className="h-1.5 w-3/4 rounded-full bg-slate-200" />
      </div>
    )}
    {variant === "sidebar" && (
      <div className="grid h-full grid-cols-3">
        <div className="space-y-2 p-2" style={{ backgroundColor: color + "22" }}>
          <div className="mx-auto size-7 rounded-full" style={{ backgroundColor: color }} />
          <div className="h-1.5 w-full rounded-full bg-slate-300" />
          <div className="h-1.5 w-3/4 rounded-full bg-slate-300" />
        </div>
        <div className="col-span-2 space-y-2 p-2.5">
          <div className="h-2 w-16 rounded-full bg-slate-400" />
          <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: color }} />
          <div className="h-1.5 w-full rounded-full bg-slate-200" />
          <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
          <div className="h-1.5 w-full rounded-full bg-slate-200" />
        </div>
      </div>
    )}
  </div>
);

const TemplateFan = () => (
  <div className="group/fan relative mx-auto h-56 w-full max-w-[16rem] cursor-pointer">
    {/* back-left */}
    <div className="absolute left-2 top-6 h-44 w-32 -rotate-12 rounded-xl border border-slate-200 bg-white p-1 shadow-lg shadow-slate-300/60 transition-all duration-500 group-hover/fan:-translate-x-5 group-hover/fan:-rotate-[18deg]">
      <MiniResume color="#8B5CF6" variant="centered" />
    </div>
    {/* back-right */}
    <div className="absolute right-2 top-6 h-44 w-32 rotate-12 rounded-xl border border-slate-200 bg-white p-1 shadow-lg shadow-slate-300/60 transition-all duration-500 group-hover/fan:translate-x-5 group-hover/fan:rotate-[18deg]">
      <MiniResume color="#F97316" variant="sidebar" />
    </div>
    {/* front */}
    <div className="feat-float absolute left-1/2 top-0 z-10 h-48 w-36 -translate-x-1/2 rounded-xl border border-green-200 bg-white p-1 shadow-2xl shadow-green-200/70 transition-transform duration-500 group-hover/fan:scale-105">
      <MiniResume color="#10B981" variant="banner" />
    </div>
  </div>
);

const Features = () => {
  return (
    <div id="features" className="relative mb-10 scroll-mt-14">
      <style>{css}</style>

      <Reveal className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1 text-center mx-auto max-w-max mb-6">
        <Zap className="size-4" />
        <span>Simple and easy to use</span>
      </Reveal>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="feat-blob pointer-events-none absolute -z-50 size-[400px] -top-10 -left-20 aspect-square rounded-full bg-green-400/25 blur-3xl" />
        <div
          className="feat-blob pointer-events-none absolute -z-50 size-[320px] bottom-0 -right-16 aspect-square rounded-full bg-emerald-300/25 blur-3xl"
          style={{ animationDelay: "-7s" }}
        />

        <Reveal delay={100}>
          <p className="text-slate-800 text-lg md:text-xl text-left max-w-3xl leading-relaxed">
            This helps you build faster by transforming your vision into a
            simple and easy-to-use interface.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-10 items-start">
          {/* Large visual: interactive builder mockup */}
          <Reveal direction="left" className="md:col-span-2">
            <BuilderMockup />
          </Reveal>

          {/* Right column */}
          <Reveal direction="right" delay={150} className="md:col-span-1">
            <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-8 shadow-lg shadow-green-100/70">
              <TemplateFan />
            </div>
            <h3 className="text-[24px]/7.5 text-slate-800 font-medium mt-6">
              Better design with highest returns and profits{" "}
            </h3>
            <p className="text-slate-600 mt-2">
              Empowers you to build beautifully and scalable Resume.
            </p>
            <a
              href="/app"
              className="group relative inline-flex items-center gap-2 mt-4 text-green-700 hover:text-green-800 transition after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Learn more about the product
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
                className="lucide lucide-arrow-up-right size-5 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </Reveal>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 120} direction="up" className="h-full">
              <div className="group h-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl hover:shadow-green-100">
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-green-700 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:from-green-500 group-hover:to-emerald-600 group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h4 className="mt-4 font-medium text-slate-800">{title}</h4>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;