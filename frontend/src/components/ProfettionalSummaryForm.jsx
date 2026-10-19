import React, { useState } from "react";
import { Sparkles, Loader2, Lightbulb } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";

const css = `
@keyframes ps-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ps-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.ps-up { animation: ps-up .5s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.ps-ai { background-size: 200% 100%; }
.ps-ai:not(:disabled):hover { animation: ps-shimmer 1.6s linear infinite; }
@media (prefers-reduced-motion: reduce) { .ps-up, .ps-ai:hover { animation: none !important; opacity: 1 !important; transform: none !important; } }
`;

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const charCount = data?.length || 0;
  const maxChars = 500;
  const percent = Math.min((charCount / maxChars) * 100, 100);

  const { token } = useSelector((state) => state.auth);

  const handleAiEnhance = async () => {
    try {
      setIsEnhancing(true);
      const prompt = `enhance my professional summary: "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum/",
        { userContent: prompt },
        { headers: { Authorization: token } },
      );
      onChange(response.data.enhancedContent);
      toast.success("Summary enhanced!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsEnhancing(false);
    }
  };

  const barColor =
    percent > 90
      ? "from-orange-400 to-red-500"
      : percent > 60
        ? "from-yellow-400 to-green-500"
        : "from-green-400 to-emerald-600";

  return (
    <div className="space-y-5">
      <style>{css}</style>

      {/* Header */}
      <div className="ps-up flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Briefly summarize your professional background and key skills.
          </p>
        </div>

        <button
          onClick={handleAiEnhance}
          disabled={isEnhancing || !data?.trim()}
          className="ps-ai group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg shadow-md shadow-purple-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed transition-all duration-300 whitespace-nowrap"
        >
          {isEnhancing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              AI Enhance
            </>
          )}
        </button>
      </div>

      {/* Input */}
      <div className="ps-up" style={{ "--d": "100ms" }}>
        <div className="relative">
          <textarea
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={7}
            maxLength={maxChars}
            className={`w-full p-4 pb-9 border rounded-xl bg-white/80 outline-none transition-all duration-300 resize-none text-sm leading-relaxed text-gray-900 placeholder:text-gray-400 hover:border-gray-300 focus:border-green-400 focus:ring-4 focus:ring-green-100 ${
              isEnhancing
                ? "animate-pulse border-purple-300 ring-4 ring-purple-100"
                : "border-gray-200"
            }`}
            placeholder="Write a compelling professional summary..."
          />

          {/* character counter with progress bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-500 ease-out`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-gray-400">
              {charCount}/{maxChars}
            </span>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-4 flex items-start gap-3 p-3.5 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl transition-shadow duration-300 hover:shadow-md hover:shadow-green-100">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
            <Lightbulb className="size-4" />
          </div>
          <p className="text-xs text-green-900 leading-relaxed">
            <strong>Tip:</strong> Keep it concise and focus on your most
            relevant achievements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;