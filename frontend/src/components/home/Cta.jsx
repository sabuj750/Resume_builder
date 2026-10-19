import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";

const css = `
@keyframes cta-blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(24px,-16px) scale(1.15); } }
@keyframes cta-shine { 0% { transform: translateX(-130%) skewX(-20deg); } 60%,100% { transform: translateX(260%) skewX(-20deg); } }
@keyframes cta-ring { 0% { box-shadow: 0 0 0 0 rgba(22,163,74,.5); } 70% { box-shadow: 0 0 0 14px rgba(22,163,74,0); } 100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); } }
.cta-blob { animation: cta-blob 10s ease-in-out infinite; }
.cta-shine { animation: cta-shine 3.2s ease-in-out infinite; }
.cta-ring { animation: cta-ring 2.2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .cta-blob, .cta-shine, .cta-ring { animation: none !important; } }
`;

const Cta = () => {
  return (
    <div
      id="cta"
      className="border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-20 mb-10 scroll-mt-14"
    >
      <style>{css}</style>

      <Reveal direction="zoom">
        <div className="relative overflow-hidden flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full bg-gradient-to-br from-white via-green-50/70 to-white">
          {/* animated glows */}
          <div className="cta-blob pointer-events-none absolute -top-16 -left-10 size-56 rounded-full bg-green-300/30 blur-3xl" />
          <div
            className="cta-blob pointer-events-none absolute -bottom-20 right-10 size-64 rounded-full bg-emerald-300/30 blur-3xl"
            style={{ animationDelay: "-5s" }}
          />

          <p className="relative text-2xl font-medium max-w-md text-slate-800 leading-snug">
            Star and join the growing{" "}
            <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              Resume Builder
            </span>{" "}
            community.
          </p>

          <Link
            to="/app"
            className="cta-ring group relative overflow-hidden flex items-center gap-2 rounded-lg py-3 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-300/60 hover:shadow-xl hover:shadow-green-400/60 hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            <span className="cta-shine absolute inset-y-0 left-0 w-1/3 bg-white/30" />
            <span className="relative">Get Started</span>
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
              className="relative size-4.5 transition-transform duration-300 group-hover:translate-x-1.5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default Cta;