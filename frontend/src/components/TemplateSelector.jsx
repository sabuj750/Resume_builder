import React from "react";
import { Layout, Check } from "lucide-react";

const css = `
@keyframes ts-pop { from { opacity: 0; transform: translateY(-8px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes ts-item { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
@keyframes ts-check { from { opacity: 0; transform: scale(0) rotate(-90deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
.ts-pop { transform-origin: top left; animation: ts-pop .28s cubic-bezier(.22,1,.36,1) both; }
.ts-item { animation: ts-item .4s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.ts-check { animation: ts-check .35s cubic-bezier(.34,1.56,.64,1) both; }
@media (prefers-reduced-motion: reduce) { .ts-pop, .ts-item, .ts-check { animation: none !important; opacity: 1 !important; transform: none !important; } }
`;

const templates = [
  {
    id: "classic",
    name: "Classic",
    preview:
      "A classic resume template with a clean and professional layout. It features a simple and minimal design that is easy to read and visually appealing.",
  },
  {
    id: "modern",
    name: "Modern",
    preview:
      "A modern resume template with a sleek and contemporary design. It incorporates bold typography, vibrant colors, and unique layout elements to create a visually striking resume.",
  },
  {
    id: "minimal",
    name: "Minimal",
    preview:
      "A minimal resume template that focuses on simplicity and elegance. It utilizes ample white space, clean lines, and a restrained color palette to create a sophisticated and understated look.",
  },
  {
    id: "minimal-image",
    name: "Minimal Image",
    preview:
      "A minimal resume template that incorporates a prominent image or photo. It combines a clean and simple layout with a visually appealing image to create a personalized and impactful resume.",
  },
];

/* Tiny wireframe thumbnails so each template is recognisable at a glance */
const Line = ({ w, c = "bg-gray-300" }) => (
  <div className={`h-[3px] rounded-full ${c}`} style={{ width: w }} />
);

const Thumb = ({ id }) => {
  if (id === "modern")
    return (
      <div className="h-full w-full flex flex-col">
        <div className="h-4 bg-green-400 px-1.5 pt-1.5 space-y-[3px]">
          <Line w="60%" c="bg-white" />
          <Line w="35%" c="bg-white/70" />
        </div>
        <div className="flex-1 p-1.5 space-y-1.5">
          <Line w="80%" />
          <Line w="100%" />
          <Line w="70%" />
          <div className="flex gap-1 pt-0.5">
            <div className="h-2 w-3 rounded-full bg-green-300" />
            <div className="h-2 w-4 rounded-full bg-green-300" />
          </div>
        </div>
      </div>
    );
  if (id === "minimal")
    return (
      <div className="h-full w-full p-2 space-y-2">
        <Line w="55%" c="bg-gray-400" />
        <Line w="35%" />
        <div className="pt-1 space-y-1.5">
          <Line w="20%" c="bg-green-400" />
          <Line w="100%" />
          <Line w="85%" />
        </div>
      </div>
    );
  if (id === "minimal-image")
    return (
      <div className="h-full w-full grid grid-cols-3">
        <div className="bg-green-50 flex items-center justify-center">
          <div className="size-4 rounded-full bg-green-300" />
        </div>
        <div className="col-span-2 p-1.5 space-y-1">
          <Line w="70%" c="bg-gray-400" />
          <Line w="45%" />
        </div>
        <div className="border-r border-gray-200 p-1.5 space-y-1">
          <Line w="70%" />
          <Line w="50%" />
        </div>
        <div className="col-span-2 p-1.5 space-y-1">
          <Line w="30%" c="bg-green-400" />
          <Line w="100%" />
          <Line w="80%" />
        </div>
      </div>
    );
  // classic
  return (
    <div className="h-full w-full p-2 space-y-1.5">
      <div className="mx-auto h-[4px] w-1/2 rounded-full bg-green-400" />
      <div className="mx-auto h-[3px] w-3/4 rounded-full bg-gray-300" />
      <div className="border-t border-green-300 pt-1.5 space-y-1.5">
        <Line w="30%" c="bg-green-400" />
        <Line w="100%" />
        <Line w="85%" />
      </div>
    </div>
  );
};

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef(null);

  // close on outside click / Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <style>{css}</style>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`group flex items-center gap-2 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-300 hover:shadow-md hover:shadow-blue-100 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 px-3 py-2 rounded-lg ${
          isOpen ? "ring-2 ring-blue-200" : ""
        }`}
      >
        <Layout
          size={14}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
        <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <div className="ts-pop absolute top-full left-0 w-80 max-w-[85vw] p-3 mt-2 space-y-2 z-50 bg-white/95 backdrop-blur rounded-xl border border-gray-200 shadow-xl shadow-slate-200/70">
          {templates.map((template, i) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`ts-item group relative flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  isSelected
                    ? "border-green-400 bg-green-50 shadow-green-100"
                    : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                }`}
                style={{ "--d": `${i * 60}ms` }}
              >
                <div className="h-16 w-12 shrink-0 overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <Thumb id={template.id} />
                </div>

                <div className="min-w-0 flex-1 pr-6">
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500 line-clamp-2">
                    {template.preview}
                  </p>
                </div>

                {isSelected && (
                  <div className="ts-check absolute top-2.5 right-2.5 flex size-5 items-center justify-center rounded-full bg-green-500">
                    <Check className="size-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;