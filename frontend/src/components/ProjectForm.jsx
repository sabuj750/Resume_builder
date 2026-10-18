import React from "react";
import { Trash2, Plus, FolderIcon } from "lucide-react";

const css = `
@keyframes prj-up { from { opacity: 0; transform: translateY(14px) scale(0.99); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes prj-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.prj-up { animation: prj-up .5s cubic-bezier(.22,1,.36,1) both; }
.prj-float { animation: prj-float 3.5s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .prj-up, .prj-float { animation: none !important; opacity: 1 !important; transform: none !important; } }
`;

const inputCls =
  "w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white/80 placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-green-400 focus:ring-4 focus:ring-green-100";

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const ProjectForm = ({ data = [], onChange }) => {
  const projectData = Array.isArray(data) ? data : [];

  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...projectData, newProject]);
  };

  const removeProject = (index) => {
    const updated = projectData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projectData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <style>{css}</style>

      <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-green-700">
            <FolderIcon className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Projects</h3>
            <p className="text-sm text-gray-500 mt-1">
              Add your relevant project details.
            </p>
          </div>
        </div>

        <button
          onClick={addProject}
          className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md shadow-green-200 hover:shadow-lg hover:shadow-green-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 whitespace-nowrap"
        >
          <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
          Add Project
        </button>
      </div>

      {projectData.length === 0 ? (
        <div className="prj-up text-center py-10 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 text-gray-500">
          <div className="prj-float inline-flex size-16 items-center justify-center rounded-full bg-green-50 mb-3">
            <FolderIcon className="size-8 text-green-300" />
          </div>
          <p className="font-medium text-gray-600">No project added yet.</p>
          <p className="text-sm mt-1">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projectData.map((project, index) => (
            <div
              key={index}
              className="prj-up group relative p-5 border border-gray-200 rounded-xl space-y-4 bg-white/70 transition-all duration-300 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/60"
            >
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b from-green-400 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                    {index + 1}
                  </span>
                  <h4 className="font-semibold text-gray-800">
                    {project.name || `Project #${index + 1}`}
                  </h4>
                </div>
                <button
                  onClick={() => removeProject(index)}
                  aria-label="Remove project"
                  className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:rotate-6 active:scale-90"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Project name">
                  <input
                    value={project.name || ""}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                    className={inputCls}
                    type="text"
                    placeholder="Project Name"
                  />
                </Field>

                <Field label="Project type">
                  <input
                    value={project.type || ""}
                    onChange={(e) =>
                      updateProject(index, "type", e.target.value)
                    }
                    className={inputCls}
                    type="text"
                    placeholder="e.g., Web App, Mobile App"
                  />
                </Field>
              </div>

              <Field label="Description (one point per line)">
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  rows={3}
                  className={`${inputCls} resize-none leading-relaxed`}
                  placeholder="Project Description"
                />
              </Field>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;