import React from "react";
import logo from "../../assets/logo.svg";
import Reveal from "./Reveal.jsx";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* { font-family: 'Poppins', sans-serif; }

@keyframes foot-wave { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
.foot-line {
  background: linear-gradient(90deg, transparent, #4ade80, #16a34a, #4ade80, transparent);
  background-size: 200% 100%;
  animation: foot-wave 6s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .foot-line { animation: none !important; } }
`;

const columns = [
  { title: "Product", links: ["Home", "Support", "Pricing", "Affiliate"] },
  { title: "Resources", links: ["Company", "Blogs", "Community", "Careers", "About"] },
  { title: "Legal", links: ["Privacy", "Terms"] },
];

const socials = [
  {
    label: "Dribbble",
    size: "size-5",
    paths: (
      <>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
      </>
    ),
  },
  {
    label: "LinkedIn",
    size: "size-5",
    paths: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect width="4" height="12" x="2" y="9"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </>
    ),
  },
  {
    label: "Twitter",
    size: "size-5",
    paths: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
    ),
  },
  {
    label: "YouTube",
    size: "size-6",
    paths: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
        <path d="m10 15 5-3-5-3z"></path>
      </>
    ),
  },
];

const Footer = () => {
  return (
    <div className="relative">
      <style>{css}</style>

      <footer className="relative overflow-hidden mt-40 border-t border-slate-200 bg-gradient-to-r from-white via-green-200/60 to-white">
        {/* animated top accent line */}
        <div className="foot-line absolute top-0 left-0 right-0 h-0.5" />

        {/* soft glow */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 size-80 rounded-full bg-green-300/30 blur-3xl" />

        <div className="relative flex flex-wrap justify-center lg:justify-between gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
          <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
            <Reveal>
              <a href="/" className="block">
                <div className="h-10 w-26 rounded-sm pt-1 px-1.5 hover:scale-110 hover:-rotate-2 transition-transform duration-300">
                  <img src={logo} alt="logo" />
                </div>
              </a>
            </Reveal>

            {columns.map((col, ci) => (
              <Reveal key={col.title} delay={(ci + 1) * 120}>
                <p className="text-slate-700 font-semibold">{col.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="/"
                        className="group relative inline-block transition-all duration-300 hover:text-green-600 hover:translate-x-1"
                      >
                        {link}
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-green-500 transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={400}
            direction="left"
            className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
          >
            <p className="max-w-60 leading-relaxed">
              Making every customer feel valued—no matter the size of your
              audience.
            </p>

            <div className="flex items-center gap-3 mt-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-transparent text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-white hover:text-green-600 hover:shadow-lg hover:shadow-green-200"
                >
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
                    className={s.size}
                    aria-hidden="true"
                  >
                    {s.paths}
                  </svg>
                </a>
              ))}
            </div>

            <p className="mt-3 text-center">
              © {new Date().getFullYear()}{" "}
              <a
                href="/"
                className="font-medium text-slate-700 transition-colors hover:text-green-600"
              >
                Resume.
              </a>
            </p>
          </Reveal>
        </div>
      </footer>
    </div>
  );
};

export default Footer;