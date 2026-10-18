import { BookUserIcon, QuoteIcon } from "lucide-react";
import React from "react";
import Title from "./Title.jsx";
import Reveal from "./Reveal.jsx";

const STAR_PATH =
  "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z";

const testimonials = [
  {
    name: "Richard Nelson",
    date: "12 Jan 2025",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    text: "I think this is the best resume builder I have ever used. It is very easy to use and easy to customize.",
  },
  {
    name: "Sophia Martinez",
    date: "15 Mar 2025",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    text: "The design quality is top-notch. Perfect balance between simplicity and style. Highly recommend for any creative developer!",
  },
  {
    name: "Ethan Roberts",
    date: "20 Feb 2025",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    text: "Absolutely love the reusability of these components. My workflow feels 10x faster now with cleaner and more consistent layouts.",
  },
];

const Star = ({ filled, index }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    // pops in one by one once the card scrolls into view
    className={`size-4 scale-0 rotate-[-45deg] transition-all duration-500 ease-out group-data-[visible=true]/rv:scale-100 group-data-[visible=true]/rv:rotate-0 ${
      filled
        ? "fill-green-600 text-green-600"
        : "fill-gray-200 text-gray-200"
    }`}
    style={{ transitionDelay: `${400 + index * 90}ms` }}
  >
    <path d={STAR_PATH} />
  </svg>
);

const Testimonials = () => {
  return (
    <div
      id="testimonials"
      className="relative flex flex-col items-center my-30 scroll-mt-14"
    >
      <div className="pointer-events-none absolute -z-10 top-1/3 size-96 rounded-full bg-green-200/30 blur-3xl" />

      <Reveal className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1 text-center mx-auto max-w-max mb-6">
        <BookUserIcon className="size-4" />
        <span>Testimonials</span>
      </Reveal>

      <Title
        title="Don't just take our words"
        description="Hear what our users say about us. We are committed to providing you with the best experience possible."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-16 px-4">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 150} className="h-full">
            <div className="group relative h-full w-full max-w-88 mx-auto space-y-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 text-gray-500 transition-all duration-500 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl hover:shadow-green-100">
              {/* hover glow */}
              <div className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full bg-green-300/0 blur-2xl transition-all duration-500 group-hover:bg-green-300/40" />

              <QuoteIcon className="absolute top-4 right-4 size-8 text-green-100 transition-all duration-500 group-hover:text-green-300 group-hover:rotate-12 group-hover:scale-110" />

              <div className="relative flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} index={s} filled={s < t.rating} />
                  ))}
                </div>
                <p className="text-xs pr-10">{t.date}</p>
              </div>

              <p className="relative leading-relaxed text-gray-600">
                “{t.text}”
              </p>

              <div className="relative flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-green-200 ring-offset-2 transition-all duration-300 group-hover:ring-green-500"
                  src={t.image}
                  alt={t.name}
                />
                <p className="font-medium text-gray-800">{t.name}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;