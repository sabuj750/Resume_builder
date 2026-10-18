import { useMemo } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

/* Animations are decorative only: disabled for print and reduced-motion users */
const css = `
@keyframes tpl-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes tpl-pop { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
@keyframes tpl-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.tpl-up { animation: tpl-up .6s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.tpl-pop { animation: tpl-pop .6s cubic-bezier(.34,1.56,.64,1) both; animation-delay: var(--d, 0ms); }
.tpl-grow { transform-origin: left; animation: tpl-grow .9s cubic-bezier(.22,1,.36,1) .3s both; }
@media print, (prefers-reduced-motion: reduce) {
  .tpl-up, .tpl-pop, .tpl-grow { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

const delay = (i, step = 70) => ({ "--d": `${i * step}ms` });

const SideTitle = ({ children }) => (
  <h2 className="text-xs font-semibold tracking-[0.25em] text-zinc-500 mb-3">
    {children}
  </h2>
);

const MainTitle = ({ children, accentColor }) => (
  <div className="mb-4">
    <h2
      className="text-xs font-semibold tracking-[0.25em] mb-1.5"
      style={{ color: accentColor }}
    >
      {children}
    </h2>
    <div className="tpl-grow h-0.5 w-10 rounded-full" style={{ backgroundColor: accentColor }} />
  </div>
);

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const info = data.personal_info || {};

  // Create the object URL once per file instead of on every render
  const imageSrc = useMemo(() => {
    if (!info.image) return null;
    if (typeof info.image === "string") return info.image;
    if (typeof info.image === "object") return URL.createObjectURL(info.image);
    return null;
  }, [info.image]);

  return (
    <div
      className="max-w-5xl mx-auto bg-white text-zinc-800 shadow-sm print:shadow-none overflow-hidden"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      <style>{css}</style>

      <div className="grid grid-cols-3">
        {/* Image */}
        <div
          className="col-span-1 py-10 flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}0F` }}
        >
          {imageSrc && (
            <div
              className="tpl-pop p-1 rounded-full transition-transform duration-500 hover:scale-105 print:hover:scale-100"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}55)`,
              }}
            >
              <img
                src={imageSrc}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-white"
                style={
                  typeof info.image === "string"
                    ? { background: accentColor + "70" }
                    : undefined
                }
              />
            </div>
          )}
        </div>

        {/* Name + Title */}
        <div
          className="col-span-2 flex flex-col justify-center py-10 px-8"
          style={{ backgroundColor: `${accentColor}0F` }}
        >
          <h1 className="tpl-up text-4xl font-bold text-zinc-700 tracking-widest">
            {info.full_name || "Your Name"}
          </h1>
          <p
            className="tpl-up uppercase text-zinc-500 font-medium text-sm tracking-[0.3em] mt-2"
            style={delay(2)}
          >
            {info.profession || "Profession"}
          </p>
          <div
            className="tpl-grow h-0.5 w-20 mt-4 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Left Sidebar */}
        <aside className="col-span-1 border-r border-zinc-200 p-6 pt-8">
          {/* Contact */}
          <section className="tpl-up mb-8" style={delay(3)}>
            <SideTitle>CONTACT</SideTitle>
            <div className="space-y-2.5 text-sm">
              {info.phone && (
                <div className="flex items-center gap-2.5 transition-transform duration-300 hover:translate-x-1 print:hover:translate-x-0">
                  <span
                    className="flex items-center justify-center size-6 rounded-full shrink-0"
                    style={{ backgroundColor: `${accentColor}1A` }}
                  >
                    <Phone size={12} style={{ color: accentColor }} />
                  </span>
                  <span>{info.phone}</span>
                </div>
              )}
              {info.email && (
                <div className="flex items-center gap-2.5 transition-transform duration-300 hover:translate-x-1 print:hover:translate-x-0">
                  <span
                    className="flex items-center justify-center size-6 rounded-full shrink-0"
                    style={{ backgroundColor: `${accentColor}1A` }}
                  >
                    <Mail size={12} style={{ color: accentColor }} />
                  </span>
                  <span className="break-all">{info.email}</span>
                </div>
              )}
              {info.location && (
                <div className="flex items-center gap-2.5 transition-transform duration-300 hover:translate-x-1 print:hover:translate-x-0">
                  <span
                    className="flex items-center justify-center size-6 rounded-full shrink-0"
                    style={{ backgroundColor: `${accentColor}1A` }}
                  >
                    <MapPin size={12} style={{ color: accentColor }} />
                  </span>
                  <span>{info.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <SideTitle>EDUCATION</SideTitle>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, index) => (
                  <div
                    key={index}
                    className="tpl-up break-inside-avoid"
                    style={delay(index + 4)}
                  >
                    <p className="font-semibold uppercase text-zinc-800">
                      {edu.degree}
                    </p>
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {formatDate(edu.graduation_date)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <SideTitle>SKILLS</SideTitle>
              <ul className="space-y-1.5 text-sm">
                {data.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="tpl-up flex items-center gap-2"
                    style={delay(index + 5, 40)}
                  >
                    <span
                      className="size-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* Right Content */}
        <main className="col-span-2 p-8 pt-8">
          {/* Summary */}
          {data.professional_summary && (
            <section className="tpl-up mb-8" style={delay(3)}>
              <MainTitle accentColor={accentColor}>SUMMARY</MainTitle>
              <p className="text-zinc-700 leading-relaxed text-sm">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-8">
              <MainTitle accentColor={accentColor}>EXPERIENCE</MainTitle>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="tpl-up break-inside-avoid"
                    style={delay(index + 4)}
                  >
                    <div className="flex justify-between items-center gap-3">
                      <h3 className="font-semibold text-zinc-900">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-zinc-400 whitespace-nowrap">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p
                      className="text-sm mb-2 font-medium"
                      style={{ color: accentColor }}
                    >
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1 marker:text-zinc-400">
                        {exp.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <MainTitle accentColor={accentColor}>PROJECTS</MainTitle>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="tpl-up break-inside-avoid"
                    style={delay(index + 5)}
                  >
                    <h3 className="font-semibold text-zinc-800">
                      {project.name}
                    </h3>
                    {project.type && (
                      <p
                        className="text-xs mb-1.5 font-medium"
                        style={{ color: accentColor }}
                      >
                        {project.type}
                      </p>
                    )}
                    {project.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1 marker:text-zinc-400">
                        {project.description.split("\n").map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;