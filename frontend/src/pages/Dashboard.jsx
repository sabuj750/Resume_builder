import React, { useEffect } from "react";
import {
  BadgePlus,
  FileUp,
  PencilIcon,
  TrashIcon,
  UploadCloud,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assets";
import { FilePenLineIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import { toast } from "react-hot-toast";
import pdfToText from "react-pdftotext";
import Loader from "../components/Loader.jsx";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = React.useState([]);
  const [showCreateResume, setShowCreateResume] = React.useState(false);
  const [showUploadResume, setShowUploadResume] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [resume, setResume] = React.useState(null);
  const [editResumeId, setEditResumeId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
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
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } },
      );
      setTitle("");
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    try{
      e.preventDefault();
      const {data} = await api.put(`api/resumes/update/` , {resumeId: editResumeId , resumeData : {title : title}} ,  {headers : {Authorization : token}})
      setAllResumes(allResumes.map((resume) => resume._id === editResumeId ? {...resume , title : title} : resume));
      setEditResumeId("");
      setTitle("");
      toast.success("Resume title updated successfully");
    }catch(err){
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm(
      "Are you sure that you want to delete The resume?",
    );
    if (confirm) {
      try{
        const { data } = await api.delete(
        `/api/resumes/delete/${resumeId}`,
        { headers: { Authorization: token } })
          setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
          toast.success("Resume deleted successfully");

      }catch(err){
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-start py-10 px-4 sm:px-8 md:px-16 gap-4 sm:gap-0">
        <style>{`
                @keyframes rotate {
                    100% {
                        transform: rotate(1turn);
                    }
                }
            
                .rainbow::before {
                    content: '';
                    position: absolute;
                    z-index: -2;
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                    background-position: 100% 50%;
                    background-repeat: no-repeat;
                    background-size: 50% 30%;
                    filter: blur(6px);
                    background-image: linear-gradient(#FF0A7F,#780EFF);
                    animation: rotate 4s linear infinite;
                }
            `}</style>
        <div className="rainbow relative z-0 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 w-full sm:w-auto">
          <button
            onClick={() => setShowCreateResume(true)}
            className="px-6 sm:px-10 text-base sm:text-lg py-2 text-white rounded-full font-medium bg-green-500 flex items-center justify-center gap-2 sm:gap-3 w-full"
          >
            <BadgePlus className="h-10 sm:h-14" />
            Create Resume
          </button>
        </div>

        <div className="rainbow relative z-0 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 w-full sm:w-auto sm:ml-6">
          <button
            onClick={() => setShowUploadResume(true)}
            className="px-6 sm:px-10 text-base sm:text-lg py-2 text-white rounded-full font-medium bg-violet-500 flex items-center justify-center gap-2 sm:gap-3 w-full"
          >
            <FileUp className="h-10 sm:h-14" />
            Upload Existing
          </button>
        </div>
      </div>

      <hr className="border-slate-300 my-6 " />

      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 sm:ml-16">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];
          return (
            <button
              key={index}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: baseColor + "40",
              }}
            >
              <FilePenLineIcon
                className="size-7 group-hover:scale-105 transition-all"
                style={{ color: baseColor }}
              />

              <p
                className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>

              <p
                className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                style={{ color: baseColor + "90" }}
              >
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1 right-1 group-hover:flex items-center hidden"
              >
                <TrashIcon
                  onClick={() => deleteResume(resume._id)}
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                />
                <PencilIcon
                  onClick={() => {
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors "
                />
              </div>
            </button>
          );
        })}
      </div>

      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Create Resume
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowCreateResume(false);
                setTitle("");
              }}
            />
          </div>
        </form>
      )}

      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <div>
              <label
                htmlFor="resume-input"
                className="block text-sm text-slate-700 cursor-pointer"
              >
                Select Resume File
                <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 transition-colors">
                  {resume ? (
                    <p className="text-green-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-14 stroke-1" />
                      <p>Upload Resume</p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                hidden
              />
            </div>
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              {isLoading ? <Loader /> : "Upload Resume"}
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
              }}
            />
          </div>
        </form>
      )}

      {editResumeId && (
        <form
          onSubmit={editTitle}
          onClick={() => setEditResumeId("")}
          className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
          >
            <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600"
              required
            />
            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Update
            </button>
            <XIcon
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
              onClick={() => {
                setEditResumeId("");
                setTitle("");
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
