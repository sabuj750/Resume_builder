import React from "react";
import { Plus, Briefcase, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";
import { useState } from "react";

const css = `
@keyframes exp-up { from { opacity: 0; transform: translateY(14px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes exp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes exp-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
.exp-up { animation: exp-up .5s cubic-bezier(.22,1,.36,1) both; }
.exp-float { animation: exp-float 3.5s ease-in-out infinite; }
.exp-shimmer { background-size: 200% 100%; }
.exp-shimmer:not(:disabled):hover { animation: exp-shimmer 1.6s linear infinite; }
@media (prefers-reduced-motion: reduce) { .exp-up, .exp-float, .exp-shimmer:hover { animation: none !important; opacity: 1 !important; transform: none !important; } }
`;

const inputCls =
  "w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white/80 placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-green-400 focus:ring-4 focus:ring-green-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const ExperienceForm = ({ data = [], onChange }) => {
  const experienceData = Array.isArray(data) ? data : [];

  const { token } = useSelector((state) => state.auth);

  // index of the entry currently being enhanced (so only that button spins)
  const [enhancingIndex, setEnhancingIndex] = useState(null);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...experienceData, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = experienceData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experienceData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAiEnhance = async (index) => {
    try {
      setEnhancingIndex(index);
      const experience = experienceData[index];
      const prompt = `enhance this job description: "${experience.description}"`;
      const response = await api.post(
        "/api/ai/enhance-job-desc/",
        { userContent: prompt },
        { headers: { Authorization: token } },
      );
      updateExperience(index, "description", response.data.enhancedContent);
      toast.success("Job description enhanced!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setEnhancingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      <style>{css}</style>

      <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-green-700">
            <Briefcase className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add your relevant work experience and accomplishments.
            </p>
          </div>
        </div>

        <button
          onClick={addExperience}
          className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 whitespace-nowrap"
        >
          <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
          Add Experience
        </button>
      </div>

      {experienceData.length === 0 ? (
        <div className="exp-up text-center py-10 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 text-gray-500">
          <div className="exp-float inline-flex size-16 items-center justify-center rounded-full bg-green-50 mb-3">
            <Briefcase className="size-8 text-green-300" />
          </div>
          <p className="font-medium text-gray-600">No experience added yet.</p>
          <p className="text-sm mt-1">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experienceData.map((experience, index) => {
            const isEnhancing = enhancingIndex === index;
            return (
              <div
                key={index}
                className="exp-up group relative p-5 border border-gray-200 rounded-xl space-y-4 bg-white/70 transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/60"
              >
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b from-green-400 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      {index + 1}
                    </span>
                    <h4 className="font-semibold text-gray-800">
                      {experience.position || `Experience ${index + 1}`}
                    </h4>
                  </div>
                  <button
                    onClick={() => removeExperience(index)}
                    aria-label="Remove experience"
                    className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:rotate-6 active:scale-90"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Company">
                    <input
                      value={experience.company || ""}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                      className={inputCls}
                      type="text"
                      placeholder="Company Name"
                    />
                  </Field>

                  <Field label="Job title">
                    <input
                      value={experience.position || ""}
                      onChange={(e) =>
                        updateExperience(index, "position", e.target.value)
                      }
                      className={inputCls}
                      type="text"
                      placeholder="Job Title"
                    />
                  </Field>

                  <Field label="Start date">
                    <input
                      value={experience.start_date || ""}
                      onChange={(e) =>
                        updateExperience(index, "start_date", e.target.value)
                      }
                      type="month"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="End date">
                    <input
                      value={experience.end_date || ""}
                      onChange={(e) =>
                        updateExperience(index, "end_date", e.target.value)
                      }
                      type="month"
                      disabled={experience.is_current}
                      className={inputCls}
                    />
                  </Field>
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-gray-700 select-none">
                  <input
                    type="checkbox"
                    checked={experience.is_current || false}
                    onChange={(e) =>
                      updateExperience(index, "is_current", e.target.checked)
                    }
                    className="size-4 rounded border-gray-300 accent-green-600 cursor-pointer"
                  />
                  <span>Currently working here</span>
                </label>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-xs font-medium text-gray-500">
                      Job description
                    </label>
                    <button
                      onClick={() => handleAiEnhance(index)}
                      disabled={
                        enhancingIndex !== null ||
                        !experience?.description?.trim()
                      }
                      className="exp-shimmer group/ai flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white text-xs font-medium rounded-lg shadow-md shadow-purple-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed transition-all duration-300 whitespace-nowrap"
                    >
                      {isEnhancing ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4 transition-transform duration-300 group-hover/ai:rotate-12 group-hover/ai:scale-110" />
                          AI Enhance
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    value={experience.description || ""}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    rows={4}
                    className={`${inputCls} resize-none leading-relaxed ${
                      isEnhancing ? "animate-pulse border-purple-300" : ""
                    }`}
                    placeholder="Describe your key responsibilities and achievements..."
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;