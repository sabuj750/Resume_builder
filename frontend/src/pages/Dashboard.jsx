import React, { useEffect } from "react";
import {
  ArrowRight,
  BadgePlus,
  FilePenLineIcon,
  FileUp,
  Loader2,
  PencilIcon,
  Plus,
  Search,
  Sparkles,
  TrashIcon,
  UploadCloud,
  XIcon,
  FileText,
  AlertTriangle,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import { toast } from "react-hot-toast";
import pdfToText from "react-pdftotext";

const css = `
@keyframes dash-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes dash-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes dash-pop { from { opacity: 0; transform: translateY(16px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes dash-blob { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.1); } 66% { transform: translate(-20px,20px) scale(0.95); } }
@keyframes dash-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes dash-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.dash-up { animation: dash-up .6s cubic-bezier(.22,1,.36,1) backwards; animation-delay: var(--d, 0ms); }
.dash-fade { animation: dash-fade .25s ease-out both; }
.dash-pop { animation: dash-pop .35s cubic-bezier(.22,1,.36,1) both; }
.dash-blob { animation: dash-blob 16s ease-in-out infinite; }
.dash-float { animation: dash-float 4s ease-in-out infinite; }
.dash-skeleton {
  background-image: linear-gradient(90deg, #eef2f6 25%, #f8fafc 50%, #eef2f6 75%);
  background-size: 200% 100%;
  animation: dash-shimmer 1.8s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .dash-up, .dash-fade, .dash-pop, .dash-blob, .dash-float, .dash-skeleton { animation: none !important; }
}
`;

const inputCls =
  "w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-green-400 focus:ring-4 focus:ring-green-100";

/* ---------------- Reusable modal shell ---------------- */
const Modal = ({ title, subtitle, icon: Icon, onClose, onSubmit, children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="dash-fade fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <form
        onSubmit={onSubmit}
        onMouseDown={(e) => e.stopPropagation()}
        className="dash-pop relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl shadow-black/20"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />

        <div className="mb-5 flex items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-green-200 text-green-700">
            <Icon className="size-5" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {subtitle && (
              <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 hover:rotate-90 active:scale-90"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {children}
      </form>
    </div>
  );
};

const PrimaryBtn = ({ children, disabled, danger }) => (
  <button
    disabled={disabled}
    className={`group flex h-11 w-full items-center justify-center gap-2 rounded-xl font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 ${
      danger
        ? "bg-gradient-to-r from-red-500 to-red-600 shadow-red-200 hover:shadow-xl hover:shadow-red-300"
        : "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-200 hover:shadow-xl hover:shadow-green-300"
    }`}
  >
    {children}
  </button>
);

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = React.useState([]);
  const [showCreateResume, setShowCreateResume] = React.useState(false);
  const [showUploadResume, setShowUploadResume] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [resume, setResume] = React.useState(null);
  const [editResumeId, setEditResumeId] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false); // upload
  const [isCreating, setIsCreating] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsFetching(false);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      setIsCreating(true);
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } },
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const pickFile = (file) => {
    if (!file) return;
    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      toast.error("Please select a PDF file");
      return;
    }
    setResume(file);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please select a PDF resume first");
      return;
    }
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();
      await api.put(
        `api/resumes/update/`,
        { resumeId: editResumeId, resumeData: { title: title } },
        { headers: { Authorization: token } },
      );
      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title: title } : resume,
        ),
      );
      setEditResumeId("");
      setTitle("");
      toast.success("Resume title updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      });
      setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
      toast.success("Resume deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setDeleteTarget(null);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const closeCreate = () => {
    setShowCreateResume(false);
    setTitle("");
  };
  const closeUpload = () => {
    setShowUploadResume(false);
    setTitle("");
    setResume(null);
  };
  const closeEdit = () => {
    setEditResumeId("");
    setTitle("");
  };

  const filtered = allResumes.filter((r) =>
    r.title?.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const firstName = user?.name?.trim().split(" ")[0];

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="relative isolate">
      <style>{css}</style>

      {/* background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="dash-blob absolute -top-20 -left-20 size-96 rounded-full bg-green-200/40 blur-3xl" />
        <div
          className="dash-blob absolute top-1/3 -right-24 size-96 rounded-full bg-emerald-200/40 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        {/* ---------- Greeting ---------- */}
        <div className="dash-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            <Sparkles className="size-3.5" />
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {firstName ? `Hi ${firstName}, ` : ""}
            <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
              ready to build?
            </span>
          </h1>
          <p className="mt-2 text-slate-500">
            Create a new resume or import an existing one and let AI polish it.
          </p>
        </div>

        {/* ---------- Action cards ---------- */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <button
            onClick={() => setShowCreateResume(true)}
            className="dash-up group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-green-700 p-6 text-left text-white shadow-xl shadow-green-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-green-300 active:scale-[0.99]"
            style={{ "--d": "100ms" }}
          >
            <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute -bottom-10 right-10 size-28 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
            <div className="relative flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40 backdrop-blur transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <BadgePlus className="size-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Create Resume</h3>
                <p className="mt-0.5 text-sm text-green-50/90">
                  Start from scratch with AI help
                </p>
              </div>
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="dash-up group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-violet-700 p-6 text-left text-white shadow-xl shadow-violet-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-300 active:scale-[0.99]"
            style={{ "--d": "200ms" }}
          >
            <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
            <div className="absolute -bottom-10 right-10 size-28 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />
            <div className="relative flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40 backdrop-blur transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <FileUp className="size-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Upload Existing</h3>
                <p className="mt-0.5 text-sm text-violet-50/90">
                  Import a PDF and edit it here
                </p>
              </div>
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </div>
          </button>
        </div>

        {/* ---------- Section header ---------- */}
        <div
          className="dash-up mt-12 flex flex-wrap items-center justify-between gap-4"
          style={{ "--d": "300ms" }}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-800">My Resumes</h2>
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700 tabular-nums">
              {allResumes.length}
            </span>
          </div>

          {allResumes.length > 0 && (
            <div className="group relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resumes..."
                className="w-full rounded-full border border-gray-200 bg-white/80 py-2 pl-10 pr-4 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-green-400 focus:ring-4 focus:ring-green-100"
              />
            </div>
          )}
        </div>

        {/* ---------- Resume grid ---------- */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* skeletons */}
          {isFetching &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="dash-skeleton h-56 rounded-2xl border border-gray-100"
              />
            ))}

          {!isFetching &&
            filtered.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={resume._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && navigate(`/app/builder/${resume._id}`)
                  }
                  className="dash-up group relative flex h-56 cursor-pointer flex-col overflow-hidden rounded-2xl border bg-white outline-none transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus-visible:ring-4"
                  style={{
                    borderColor: baseColor + "40",
                    "--d": `${Math.min(index, 10) * 60}ms`,
                    "--tw-ring-color": baseColor + "40",
                    boxShadow: "0 1px 2px rgba(0,0,0,.04)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 20px 40px -12px ${baseColor}55`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,.04)")
                  }
                >
                  {/* top preview area */}
                  <div
                    className="relative flex h-28 items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${baseColor}18, ${baseColor}50)`,
                    }}
                  >
                    {/* faux document lines */}
                    <div className="absolute inset-x-6 bottom-3 space-y-1.5 opacity-60">
                      <div className="h-1.5 w-3/4 rounded-full" style={{ backgroundColor: baseColor + "50" }} />
                      <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: baseColor + "35" }} />
                    </div>
                    <div
                      className="relative flex size-14 items-center justify-center rounded-2xl bg-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                      style={{ color: baseColor }}
                    >
                      <FilePenLineIcon className="size-7" />
                    </div>

                    {/* actions */}
                    <div className="absolute right-2 top-2 flex items-center gap-1 transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditResumeId(resume._id);
                          setTitle(resume.title);
                        }}
                        aria-label="Edit title"
                        className="rounded-lg bg-white/90 p-1.5 text-slate-600 shadow-sm transition-all duration-200 hover:scale-110 hover:text-green-600 active:scale-90"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget({ id: resume._id, title: resume.title });
                        }}
                        aria-label="Delete resume"
                        className="rounded-lg bg-white/90 p-1.5 text-slate-600 shadow-sm transition-all duration-200 hover:scale-110 hover:text-red-600 active:scale-90"
                      >
                        <TrashIcon className="size-4" />
                      </button>
                    </div>

                    {resume.public && (
                      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-green-700 shadow-sm">
                        <Globe className="size-3" />
                        Public
                      </span>
                    )}
                  </div>

                  {/* body */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <p className="line-clamp-2 text-sm font-semibold text-slate-800">
                      {resume.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-slate-400">
                        Updated {formatDate(resume.updatedAt)}
                      </p>
                      <ArrowRight
                        className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        style={{ color: baseColor }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          {/* new resume tile */}
          {!isFetching && !search && (
            <button
              onClick={() => setShowCreateResume(true)}
              className="dash-up group flex h-56 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 text-slate-400 transition-all duration-300 hover:-translate-y-2 hover:border-green-400 hover:bg-green-50/60 hover:text-green-600"
              style={{ "--d": `${Math.min(filtered.length, 10) * 60}ms` }}
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-gray-100 transition-all duration-300 group-hover:rotate-90 group-hover:bg-green-100">
                <Plus className="size-6" />
              </div>
              <span className="text-sm font-medium">New resume</span>
            </button>
          )}
        </div>

        {/* empty / no results */}
        {!isFetching && allResumes.length === 0 && (
          <div className="dash-up mt-6 rounded-2xl border-2 border-dashed border-gray-200 bg-white/60 py-14 text-center">
            <div className="dash-float mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-green-50">
              <FileText className="size-10 text-green-300" />
            </div>
            <p className="text-lg font-medium text-slate-700">No resumes yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Create your first resume or upload an existing one to get started.
            </p>
          </div>
        )}

        {!isFetching && allResumes.length > 0 && filtered.length === 0 && (
          <p className="dash-fade mt-8 text-center text-slate-500">
            No resumes match “{search}”.
          </p>
        )}
      </div>

      {/* ---------------- Modals ---------------- */}
      {showCreateResume && (
        <Modal
          title="Create a Resume"
          subtitle="Give your resume a name to get started."
          icon={BadgePlus}
          onClose={closeCreate}
          onSubmit={createResume}
        >
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter resume title"
            className={`${inputCls} mb-5`}
            required
          />
          <PrimaryBtn disabled={isCreating}>
            {isCreating ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Creating...
              </>
            ) : (
              <>
                Create Resume
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </PrimaryBtn>
        </Modal>
      )}

      {showUploadResume && (
        <Modal
          title="Upload Resume"
          subtitle="We'll read your PDF and fill in the builder."
          icon={FileUp}
          onClose={closeUpload}
          onSubmit={uploadResume}
        >
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter resume title"
            className={`${inputCls} mb-4`}
            required
          />

          <label
            htmlFor="resume-input"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              pickFile(e.dataTransfer.files[0]);
            }}
            className={`group mb-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-9 text-center transition-all duration-300 ${
              isDragging
                ? "scale-[1.02] border-green-500 bg-green-50 text-green-700"
                : resume
                  ? "border-green-400 bg-green-50/60 text-green-700"
                  : "border-slate-300 text-slate-400 hover:border-green-400 hover:bg-green-50/40 hover:text-green-600"
            }`}
          >
            {resume ? (
              <div className="dash-pop flex flex-col items-center gap-1.5">
                <FileText className="size-10" />
                <p className="max-w-60 truncate text-sm font-medium">
                  {resume.name}
                </p>
                <p className="text-xs text-green-600/80">Click to change file</p>
              </div>
            ) : (
              <>
                <UploadCloud className="size-12 stroke-1 transition-transform duration-300 group-hover:-translate-y-1" />
                <p className="text-sm font-medium">
                  {isDragging ? "Drop your PDF here" : "Click or drag a PDF here"}
                </p>
                <p className="text-xs text-slate-400">PDF files only</p>
              </>
            )}
          </label>
          <input
            type="file"
            id="resume-input"
            accept=".pdf"
            onChange={(e) => pickFile(e.target.files[0])}
            hidden
          />

          <PrimaryBtn disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Reading your resume...
              </>
            ) : (
              <>
                Upload Resume
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </PrimaryBtn>
        </Modal>
      )}

      {editResumeId && (
        <Modal
          title="Edit Resume Title"
          subtitle="Rename this resume."
          icon={PencilIcon}
          onClose={closeEdit}
          onSubmit={editTitle}
        >
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter resume title"
            className={`${inputCls} mb-5`}
            required
          />
          <PrimaryBtn>Update</PrimaryBtn>
        </Modal>
      )}

      {deleteTarget && (
        <Modal
          title="Delete resume?"
          subtitle="This action can't be undone."
          icon={AlertTriangle}
          onClose={() => setDeleteTarget(null)}
          onSubmit={(e) => {
            e.preventDefault();
            deleteResume(deleteTarget.id);
          }}
        >
          <p className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold">“{deleteTarget.title}”</span>?
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="h-11 flex-1 rounded-xl border border-gray-200 font-medium text-slate-600 transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
            >
              Cancel
            </button>
            <div className="flex-1">
              <PrimaryBtn danger>Delete</PrimaryBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;