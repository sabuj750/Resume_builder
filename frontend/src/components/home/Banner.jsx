import React from "react";

const css = `
@keyframes banner-sweep { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
@keyframes banner-ping { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(2.2); opacity: 0; } }
.banner-sweep { animation: banner-sweep 3.5s ease-in-out infinite; }
.banner-ping { animation: banner-ping 1.8s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .banner-sweep, .banner-ping { animation: none !important; } }
`;

const Banner = () => {
  return (
    <div className="relative w-full overflow-hidden py-2.5 font-medium text-sm text-green-900 text-center bg-gradient-to-r from-[#ABFF7E] via-[#d9ffc4] to-[#FDFEFF]">
      <style>{css}</style>

      {/* light sweep */}
      <div className="banner-sweep pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12" />

      <p className="relative flex items-center justify-center gap-2">
        <span className="relative inline-flex">
          <span className="banner-ping absolute inset-0 rounded-lg bg-green-500" />
          <span className="relative px-3 py-1 rounded-lg text-white bg-green-600 shadow-sm shadow-green-700/30">
            New
          </span>
        </span>
        <span className="tracking-wide">AI Resume Builder</span>
      </p>
    </div>
  );
};

export default Banner;