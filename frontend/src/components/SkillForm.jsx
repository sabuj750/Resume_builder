import React from "react";
import { Plus, Sparkles, X, Lightbulb } from "lucide-react";

const css = `
@keyframes sk-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes sk-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
@keyframes sk-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.sk-up { animation: sk-up .5s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.sk-pop { animation: sk-pop .4s cubic-bezier(.34,1.56,.64,1) both; }
.sk-float { animation: sk-float 3.5s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .sk-up, .sk-pop, .sk-float { animation: none !important; opacity: 1 !important; transform: none !important; } }
`;

const RECOMMENDED = 12;

const SkillForm = ({ data = [], onChange }) => {
  const skillData = Array.isArray(data) ? data : [];
  const [newSkill, setNewSkill] = React.useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skillData.includes(newSkill.trim())) {
      onChange([...skillData, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(skillData.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const percent = Math.min((skillData.length / RECOMMENDED) * 100, 100);

  return (
    <div className="space-y-5">
      <style>{css}</style>

      <div className="sk-up flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-green-700">
          <Sparkles className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
          <p className="text-sm text-gray-500">
            Add your technical and soft skills
          </p>
        </div>
        <span className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-medium text-green-700 tabular-nums">
          {skillData.length} added
        </span>
      </div>

      {/* Input row */}
      <div className="sk-up flex gap-2" style={{ "--d": "80ms" }}>
        <input
          type="text"
          placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          className="flex-1 px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white/80 placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-green-400 focus:ring-4 focus:ring-green-100"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="group flex items-center gap-2 px-5 text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
        >
          <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
          Add
        </button>
      </div>

      {/* progress toward the recommended amount */}
      <div className="sk-up" style={{ "--d": "140ms" }}>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
          <span>Recommended: 8-12 skills</span>
          <span className="tabular-nums">
            {skillData.length}/{RECOMMENDED}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Skills */}
      {skillData.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skillData.map((skill, index) => (
            <span
              key={skill}
              className="sk-pop group flex items-center gap-1.5 rounded-full border border-green-200 bg-gradient-to-br from-green-50 to-green-100 py-1.5 pl-3.5 pr-2 text-sm text-green-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md hover:shadow-green-100"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                aria-label={`Remove ${skill}`}
                className="flex size-5 items-center justify-center rounded-full text-green-600 transition-all duration-200 hover:bg-red-100 hover:text-red-600 hover:rotate-90 active:scale-90"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="sk-up text-center py-8 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 text-gray-500" style={{ "--d": "200ms" }}>
          <div className="sk-float inline-flex size-14 items-center justify-center rounded-full bg-green-50 mb-2">
            <Sparkles className="size-7 text-green-300" />
          </div>
          <p className="font-medium text-gray-600">No skills added</p>
          <p className="text-sm mt-1">Add your technical and soft skills above.</p>
        </div>
      )}

      <div className="sk-up flex items-start gap-3 p-3.5 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl" style={{ "--d": "260ms" }}>
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
          <Lightbulb className="size-4" />
        </div>
        <p className="text-xs text-green-900 leading-relaxed">
          <strong>Tip:</strong> Add 8-12 relevant skills. Include both
          technical skills (programming languages, tools, frameworks) and soft
          skills (leadership, communication, problem-solving).
        </p>
      </div>
    </div>
  );
};

export default SkillForm;