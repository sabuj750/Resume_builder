import React from "react";
import Reveal from "./Reveal.jsx";

const Title = ({ title, description }) => {
  return (
    <Reveal className="text-center text-slate-700 px-4">
      <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-slate-900 via-green-700 to-slate-900 bg-clip-text text-transparent">
        {title}
      </h2>
      {/* underline grows when the title scrolls into view */}
      <div className="mx-auto mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-1000 delay-300 group-data-[visible=true]/rv:w-20" />
      <p className="text-sm md:text-base max-w-2xl mx-auto mt-5 text-slate-500 leading-relaxed">
        {description}
      </p>
    </Reveal>
  );
};

export default Title;