import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Loader2Icon,
  SaveIcon,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/Colorpicker";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillForm from "../components/SkillForm";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import ProfettionalSummaryForm from "../components/ProfettionalSummaryForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

/* ------------------------------------------------------------------ */
/* Animations (pure CSS, no extra dependencies)                        */
/* ------------------------------------------------------------------ */
const animationStyles = `
@keyframes rb-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rb-slide-left {
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes rb-slide-right {
  from { opacity: 0; transform: translateX(32px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes rb-section-in {
  from { opacity: 0; transform: translateY(12px) scale(0.99); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes rb-pop {
  0%   { transform: scale(0.6); opacity: 0; }
  70%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
}
@keyframes rb-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes rb-pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
  70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
  100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
}
@keyframes rb-blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(30px, -20px) scale(1.1); }
  66%      { transform: translate(-20px, 20px) scale(0.95); }
}

.rb-fade-up     { animation: rb-fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
.rb-slide-left  { animation: rb-slide-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
.rb-slide-right { animation: rb-slide-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
.rb-section-in  { animation: rb-section-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
.rb-pop         { animation: rb-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.rb-blob        { animation: rb-blob 14s ease-in-out infinite; }
.rb-pulse-ring  { animation: rb-pulse-ring 1.8s ease-out infinite; }

.rb-shimmer-btn {
  background-size: 200% 100%;
}
.rb-shimmer-btn:hover {
  animation: rb-shimmer 1.6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .rb-fade-up, .rb-slide-left, .rb-slide-right, .rb-section-in,
  .rb-pop, .rb-blob, .rb-pulse-ring, .rb-shimmer-btn:hover {
    animation: none !important;
  }
}
`;

const sections = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "summary", name: "Summary", icon: FileText },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "projects", name: "Projects", icon: FolderIcon },
  { id: "skills", name: "Skills", icon: Sparkles },
];

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = React.useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);
  const [removeBackground, setRemoveBackground] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("api/resumes/get/" + resumeId, {
        headers: { Authorization: token },
      });
      if (data?.resume) {
        const resume = data.resume;
        setResumeData(resume);
        document.title = resume.title;
      }
    } catch (error) {
      console.log("Error loading resume data:", error);
    }
  };

  React.useEffect(() => {
    if (resumeId) loadExistingResume();
  }, [resumeId]);

  const activeSection = sections[activeSectionIndex];
  const progress = (activeSectionIndex * 100) / (sections.length - 1);

  const goPrev = () => setActiveSectionIndex((i) => Math.max(i - 1, 0));
  const goNext = () =>
    setActiveSectionIndex((i) => Math.min(i + 1, sections.length - 1));

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );
      const { data } = await api.put("api/resumes/update/", formData, {
        headers: { Authorization: token },
      });
      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser");
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      setIsSaving(true);
      let updateResumeData = structuredClone(resumeData);
      // remove image from updatedResumeData
      if (typeof resumeData.personal_info.image === "object") {
        delete updateResumeData.personal_info.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updateResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("api/resumes/update/", formData, {
        headers: { Authorization: token },
      });
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const toolbarBtn =
    "group flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-green-50/40">
      <style>{animationStyles}</style>

      {/* Decorative animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden print:hidden">
        <div className="rb-blob absolute -top-24 -left-24 size-96 rounded-full bg-green-200/30 blur-3xl" />
        <div
          className="rb-blob absolute top-1/3 -right-24 size-96 rounded-full bg-blue-200/30 blur-3xl"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="rb-blob absolute -bottom-24 left-1/3 size-80 rounded-full bg-purple-200/20 blur-3xl"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <div className="relative z-10">
        {/* Back link */}
        <div className="max-w-7xl mx-auto px-4 py-6 rb-fade-up print:hidden">
          <Link
            to="/app"
            className="group inline-flex gap-2 items-center text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeftIcon className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-10">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* ---------------- Left panel - form ---------------- */}
            <div className="relative lg:col-span-5 print:hidden rb-slide-left">
              <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg shadow-slate-200/60 border border-gray-200/80 overflow-hidden transition-shadow duration-500 hover:shadow-xl hover:shadow-slate-200/80">
                {/* progress bar */}
                <div className="h-1.5 w-full bg-gray-100">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 rounded-r-full transition-all duration-700 ease-out relative overflow-hidden"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rb-shimmer-btn" />
                  </div>
                </div>

                <div className="p-6 pt-4">
                  {/* top controls */}
                  <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                    <div className="flex gap-2">
                      <TemplateSelector
                        selectedTemplate={resumeData.template}
                        onChange={(templateId) =>
                          setResumeData((prev) => ({
                            ...prev,
                            template: templateId,
                          }))
                        }
                      />
                      <ColorPicker
                        selectedColor={resumeData.accent_color}
                        onChange={(color) =>
                          setResumeData((prev) => ({
                            ...prev,
                            accent_color: color,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      {activeSectionIndex !== 0 && (
                        <button
                          onClick={goPrev}
                          className="group flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95"
                        >
                          <ChevronLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                          Previous
                        </button>
                      )}
                      <button
                        onClick={goNext}
                        disabled={activeSectionIndex === sections.length - 1}
                        className="group flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                      >
                        Next
                        <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>

                  {/* step indicator */}
                  <div className="flex items-center justify-between mb-6">
                    {sections.map((section, index) => {
                      const Icon = section.icon;
                      const isActive = index === activeSectionIndex;
                      const isDone = index < activeSectionIndex;
                      return (
                        <React.Fragment key={section.id}>
                          <button
                            onClick={() => setActiveSectionIndex(index)}
                            title={section.name}
                            className={`relative flex items-center justify-center size-10 rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${
                              isActive
                                ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-200 rb-pulse-ring"
                                : isDone
                                  ? "bg-green-100 border-green-300 text-green-600"
                                  : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                            }`}
                          >
                            <Icon className="size-4" />
                          </button>
                          {index !== sections.length - 1 && (
                            <div className="flex-1 h-0.5 mx-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-400 transition-all duration-500 ease-out"
                                style={{ width: isDone ? "100%" : "0%" }}
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* section title */}
                  <div
                    key={activeSection.id + "-title"}
                    className="rb-section-in mb-4"
                  >
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Step {activeSectionIndex + 1} of {sections.length}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {activeSection.name}
                    </h2>
                  </div>

                  {/* form content - keyed so it re-animates on section change */}
                  <div
                    key={activeSection.id}
                    className="space-y-6 rb-section-in"
                  >
                    {activeSection.id === "personal" && (
                      <PersonalInfoForm
                        data={resumeData.personal_info}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personal_info: data,
                          }))
                        }
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    )}
                    {activeSection.id === "summary" && (
                      <ProfettionalSummaryForm
                        data={resumeData.professional_summary}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            professional_summary: data,
                          }))
                        }
                        setResumeData={setResumeData}
                      />
                    )}
                    {activeSection.id === "experience" && (
                      <ExperienceForm
                        data={resumeData.experience}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            experience: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "education" && (
                      <EducationForm
                        data={resumeData.education}
                        onChange={(data) =>
                          setResumeData((prev) => ({
                            ...prev,
                            education: data,
                          }))
                        }
                      />
                    )}
                    {activeSection.id === "projects" && (
                      <ProjectForm
                        data={resumeData.projects}
                        onChange={(data) =>
                          setResumeData((prev) => ({ ...prev, projects: data }))
                        }
                      />
                    )}
                    {activeSection.id === "skills" && (
                      <SkillForm
                        data={resumeData.skills}
                        onChange={(data) =>
                          setResumeData((prev) => ({ ...prev, skills: data }))
                        }
                      />
                    )}
                  </div>

                  {/* save button */}
                  <button
                    onClick={saveResume}
                    disabled={isSaving}
                    className="rb-shimmer-btn mt-8 flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-green-700 bg-gradient-to-r from-green-100 via-green-200 to-green-100 ring-1 ring-green-300 hover:ring-2 hover:ring-green-400 hover:-translate-y-0.5 hover:shadow-md hover:shadow-green-200 active:translate-y-0 active:scale-95 disabled:opacity-70 disabled:pointer-events-none transition-all duration-300"
                  >
                    {isSaving ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      <SaveIcon className="size-4" />
                    )}
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>

            {/* ---------------- Right panel - preview ---------------- */}
            <div className="lg:col-span-7 max-lg:mt-6 rb-slide-right">
              {/* toolbar */}
              <div className="flex items-center justify-end gap-2 mb-4 print:hidden">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    title="Share"
                    className={`${toolbarBtn} rb-pop bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 border-blue-200 hover:border-blue-300 hover:shadow-blue-100`}
                  >
                    <Share2Icon className="size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className={`${toolbarBtn} bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600 border-purple-200 hover:border-purple-300 hover:shadow-purple-100`}
                >
                  <span key={String(resumeData.public)} className="rb-pop">
                    {resumeData.public ? (
                      <EyeIcon className="size-4" />
                    ) : (
                      <EyeOffIcon className="size-4" />
                    )}
                  </span>
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button
                  onClick={handleDownload}
                  className={`${toolbarBtn} bg-gradient-to-br from-green-50 to-green-100 text-green-600 border-green-200 hover:border-green-300 hover:shadow-green-100`}
                >
                  <DownloadIcon className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download
                </button>
              </div>

              {/* resume preview */}
              <div className="transition-transform duration-500 print:transform-none">
                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
