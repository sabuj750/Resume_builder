import React from 'react'
import { Trash2, Plus, GraduationCap } from "lucide-react";
const ProjectForm = ({data = [], onChange}) => {
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
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-600 mt-1.5">
            Add your relevant Project Details.
          </p>
        </div>

        {/* Add Experience Button with Enhanced Styling */}
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add Project
        </button>
      </div>

      {projectData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No Project added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div>
          {projectData.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3 "
            >
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="Project Name"
                />

                <input
                  value={project.type || ""}
                  onChange={(e) =>
                    updateProject(index, "type", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="Project Type (e.g., Web App, Mobile App)"
                />
              </div>
              <input
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                type="text"
                className="px-3 py-2 text-sm rounded-lg"
                placeholder="Project Description"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectForm
