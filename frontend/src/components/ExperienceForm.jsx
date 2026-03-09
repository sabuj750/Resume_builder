import React from "react";
import { Plus, Briefcase, Trash2 } from "lucide-react";
import { Sparkles , Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useState } from "react";


const ExperienceForm = ({ data = [], onChange ,setResumeData }) => {
  const experienceData = Array.isArray(data) ? data : [];

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

  const { token } = useSelector((state) => state.auth);

  const [isEnhancing, setIsEnhancing] = useState(false);

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
      setIsEnhancing(true);
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
      setTimeout(() => {
        setIsEnhancing(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            Work Experience
          </h3>
          <p className="text-sm text-gray-600 mt-1.5">
            Add your relevant work experience and accomplishments.
          </p>
        </div>

        {/* Add Experience Button with Enhanced Styling */}
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add Experience
        </button>
      </div>

      {experienceData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div>
          {experienceData.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3 "
            >
              <div className="flex justify-between items-start">
                <h4>Experience {index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="Company Name"
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                  type="text"
                  placeholder="Job Title"
                />

                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                />
                <input
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  type="month"
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                />
              </div>

              <label>
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => {
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked ? true : false,
                    );
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Currently working here</span>
              </label>
              <div className="space-y-2">
                <div>
                  <label>Job Description</label>
                  <button
                    onClick={() => handleAiEnhance(index)}
                    disabled={isEnhancing || !experience?.description?.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                  >
                    {isEnhancing ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" />
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
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                  placeholder="Describe your key responsibilities and achivements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
