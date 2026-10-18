import React from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  BriefcaseBusiness,
  Linkedin,
  Globe,
  Camera,
} from "lucide-react";

const css = `
@keyframes pi-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pi-pop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
@keyframes pi-pulse { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,.35); } 70% { box-shadow: 0 0 0 12px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
.pi-up { animation: pi-up .5s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.pi-pop { animation: pi-pop .45s cubic-bezier(.34,1.56,.64,1) both; }
.pi-pulse { animation: pi-pulse 2.2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) { .pi-up, .pi-pop, .pi-pulse { animation: none !important; opacity: 1 !important; transform: none !important; } }
`;

const fields = [
  { key: "full_name", label: "Full Name", icon: User, type: "text", required: true, placeholder: "John Doe" },
  { key: "email", label: "Email Address", icon: Mail, type: "email", required: true, placeholder: "john@example.com" },
  { key: "phone", label: "Phone Number", icon: Phone, type: "tel", placeholder: "+91 98765 43210" },
  { key: "location", label: "Location", icon: MapPin, type: "text", placeholder: "City, Country" },
  { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", placeholder: "e.g. Frontend Developer" },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url", placeholder: "https://linkedin.com/in/username" },
  { key: "website", label: "Personal Website", icon: Globe, type: "url", placeholder: "https://yourwebsite.com" },
];

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Create the preview URL once per file and clean it up afterwards
  const [preview, setPreview] = React.useState(null);
  React.useEffect(() => {
    if (!data.image) {
      setPreview(null);
      return;
    }
    if (typeof data.image === "string") {
      setPreview(data.image);
      return;
    }
    const url = URL.createObjectURL(data.image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [data.image]);

  return (
    <div className="space-y-6">
      <style>{css}</style>

      <div className="pi-up">
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Get started with your personal information
        </p>
      </div>

      {/* Photo upload */}
      <div
        className="pi-up flex flex-wrap items-center gap-5 rounded-xl border border-gray-200 bg-gradient-to-br from-green-50/70 to-white p-4"
        style={{ "--d": "80ms" }}
      >
        <label className="group relative cursor-pointer">
          {preview ? (
            <div className="pi-pop relative size-20 rounded-full p-[3px] bg-gradient-to-br from-green-400 to-emerald-600 transition-transform duration-300 group-hover:scale-105">
              <img
                key={preview}
                src={preview}
                alt="user-image"
                className="size-full rounded-full object-cover border-2 border-white"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Camera className="size-5 text-white" />
              </div>
            </div>
          ) : (
            <div className="pi-pulse flex size-20 items-center justify-center rounded-full border-2 border-dashed border-green-300 bg-white text-green-500 transition-all duration-300 group-hover:scale-105 group-hover:border-green-500 group-hover:bg-green-50">
              <User className="size-8" />
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) =>
              e.target.files[0] && handleChange("image", e.target.files[0])
            }
          />
        </label>

        <div className="flex-1 min-w-40">
          <p className="text-sm font-medium text-gray-800">
            {preview ? "Change photo" : "Upload user image"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            JPG or PNG, square works best
          </p>
        </div>

        {typeof data.image === "object" && data.image && (
          <div className="pi-pop flex items-center gap-3">
            <p className="text-sm text-gray-700">Remove Background</p>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="h-6 w-11 rounded-full bg-slate-300 transition-colors duration-300 peer-checked:bg-green-500 peer-focus-visible:ring-4 peer-focus-visible:ring-green-100 after:absolute after:left-[3px] after:top-[3px] after:size-[18px] after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 after:content-[''] peer-checked:after:translate-x-5" />
            </label>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((field, i) => {
          const Icon = field.icon;
          return (
            <div
              key={field.key}
              className="pi-up group"
              style={{ "--d": `${160 + i * 60}ms` }}
            >
              <label className="block text-xs font-medium text-gray-500 mb-1.5 transition-colors group-focus-within:text-green-600">
                {field.label}
                {field.required && <span className="text-red-400"> *</span>}
              </label>
              <div className="relative">
                <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-green-500" />
                <input
                  type={field.type}
                  value={data[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white/80 placeholder:text-gray-400 outline-none transition-all duration-200 hover:border-gray-300 focus:border-green-400 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;