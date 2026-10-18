import React from "react";

const css = `
@keyframes ld-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ld-blob { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.15); } }
@keyframes ld-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
@keyframes ld-spin-rev { to { transform: rotate(-360deg); } }
.ld-fade { animation: ld-fade .6s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.ld-blob { animation: ld-blob 10s ease-in-out infinite; }
.ld-bar { animation: ld-bar 1.4s ease-in-out infinite; }
.ld-spin-rev { animation: ld-spin-rev 1.8s linear infinite; }
@media (prefers-reduced-motion: reduce) { .ld-fade, .ld-blob, .ld-bar, .ld-spin-rev { animation: none !important; opacity: 1 !important; transform: none !important; } }
`;

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 z-50 overflow-hidden">
      <style>{css}</style>

      {/* background glows */}
      <div className="ld-blob pointer-events-none absolute -top-20 -left-20 size-80 rounded-full bg-green-200/40 blur-3xl" />
      <div
        className="ld-blob pointer-events-none absolute -bottom-24 -right-16 size-96 rounded-full bg-emerald-200/40 blur-3xl"
        style={{ animationDelay: "-5s" }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="ld-fade relative w-24 h-24">
          {/* outer pulse ring */}
          <div className="absolute inset-0 border-4 border-green-200 rounded-full animate-ping opacity-20" />

          {/* middle ring */}
          <div className="absolute inset-2 border-4 border-green-200 rounded-full opacity-60" />

          {/* outer spinning arc */}
          <div className="absolute inset-0 border-4 border-transparent border-t-green-600 border-r-green-500 rounded-full animate-spin" />

          {/* inner counter-spinning arc */}
          <div className="ld-spin-rev absolute inset-4 border-4 border-transparent border-b-emerald-500 border-l-emerald-400 rounded-full" />

          {/* center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse shadow-lg shadow-green-400" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p
            className="ld-fade text-gray-800 font-semibold text-lg"
            style={{ "--d": "150ms" }}
          >
            Loading preview...
          </p>
          <p
            className="ld-fade text-gray-500 text-sm mt-2"
            style={{ "--d": "300ms" }}
          >
            Fetching your data
          </p>

          {/* progress bar */}
          <div
            className="ld-fade relative mx-auto mt-4 h-1.5 w-44 overflow-hidden rounded-full bg-green-100"
            style={{ "--d": "450ms" }}
          >
            <div className="ld-bar absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />
          </div>

          {/* bouncing dots */}
          <div
            className="ld-fade flex items-center justify-center gap-1.5 mt-4"
            style={{ "--d": "600ms" }}
          >
            {[0, 150, 300].map((delay) => (
              <div
                key={delay}
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;