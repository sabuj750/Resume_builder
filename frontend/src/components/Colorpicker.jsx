import React from "react";
import { Check, Palette } from "lucide-react";

const css = `
@keyframes cp-pop { from { opacity: 0; transform: translateY(-8px) scale(0.94); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes cp-swatch { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
@keyframes cp-check { from { opacity: 0; transform: scale(0) rotate(-90deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
.cp-pop { transform-origin: top left; animation: cp-pop .28s cubic-bezier(.22,1,.36,1) both; }
.cp-swatch { animation: cp-swatch .4s cubic-bezier(.34,1.56,.64,1) both; animation-delay: var(--d, 0ms); }
.cp-check { animation: cp-check .35s cubic-bezier(.34,1.56,.64,1) both; }
@media (prefers-reduced-motion: reduce) { .cp-pop, .cp-swatch, .cp-check { animation: none !important; } }
`;

const colors = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Red", value: "#EF4444" },
  { name: "Green", value: "#10B981" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Gray", value: "#6B7280" },
  { name: "Orange", value: "#F97316" },
  { name: "Black", value: "#1F2937" },
];

const Colorpicker = ({ selectedColor, onChange }) => {
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
        className={`group flex items-center gap-2 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:border-purple-300 hover:shadow-md hover:shadow-purple-100 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 px-3 py-2 rounded-lg ${
          isOpen ? "ring-2 ring-purple-200" : ""
        }`}
      >
        <Palette
          size={16}
          className="transition-transform duration-300 group-hover:rotate-12"
        />
        <span className="max-sm:hidden">Accent</span>
        <span
          className="size-3.5 rounded-full border border-white shadow-sm transition-transform duration-300 group-hover:scale-125"
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {isOpen && (
        <div className="cp-pop grid grid-cols-4 w-64 gap-3 absolute top-full left-0 p-4 mt-2 z-20 bg-white/95 backdrop-blur rounded-xl border border-gray-200 shadow-xl shadow-slate-200/70">
          {colors.map((color, i) => {
            const isSelected = selectedColor === color.value;
            return (
              <button
                key={color.value}
                type="button"
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
                className="cp-swatch group relative flex flex-col items-center focus:outline-none"
                style={{ "--d": `${i * 30}ms` }}
                title={color.name}
              >
                <div
                  className={`relative flex size-12 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-active:scale-95 ${
                    isSelected
                      ? "border-white ring-2 ring-offset-2 scale-105"
                      : "border-transparent group-hover:border-black/20"
                  }`}
                  style={{
                    backgroundColor: color.value,
                    "--tw-ring-color": color.value,
                  }}
                >
                  {isSelected && <Check className="cp-check size-5 text-white" />}
                </div>
                <p
                  className={`text-xs text-center mt-1.5 transition-colors ${
                    isSelected ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {color.name}
                </p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Colorpicker;