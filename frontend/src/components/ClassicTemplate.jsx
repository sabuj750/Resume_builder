import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

/* Animations are decorative only: disabled for print and reduced-motion users */
const css = `
@keyframes tpl-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes tpl-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes tpl-pop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
.tpl-up { animation: tpl-up .6s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.tpl-grow { transform-origin: left; animation: tpl-grow .8s cubic-bezier(.22,1,.36,1) .2s both; }
.tpl-pop { animation: tpl-pop .4s cubic-bezier(.34,1.56,.64,1) both; animation-delay: var(--d, 0ms); }
@media print, (prefers-reduced-motion: reduce) {
  .tpl-up, .tpl-grow, .tpl-pop { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

const delay = (i, step = 70) => ({ "--d": `${i * step}ms` });

const SectionTitle = ({ children, accentColor }) => (
  <div className="flex items-center gap-3 mb-4">
    <h2
      className="text-lg font-bold tracking-widest whitespace-nowrap"
      style={{ color: accentColor }}
    >
      {children}
    </h2>
    <div
      className="h-px flex-1"
      style={{ background: `linear-gradient(to right, ${accentColor}80, transparent)` }}
    />
  </div>
);

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const info = data.personal_info || {};

  const contacts = [
    { icon: Mail, value: info.email },
    { icon: Phone, value: info.phone },
    { icon: MapPin, value: info.location },
    { icon: Linkedin, value: info.linkedin, breakAll: true },
    { icon: Globe, value: info.website, breakAll: true },
  ].filter((c) => c.value);

  return (
    <div
      className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed shadow-sm print:shadow-none"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      <style>{css}</style>

      {/* Header */}
      <header
        className="tpl-up relative text-center mb-8 pb-6 rounded-t-lg px-4 pt-4"
        style={{ background: `linear-gradient(to bottom, ${accentColor}14, transparent)` }}
      >
        <h1
          className="text-4xl font-bold mb-3 tracking-wide"
          style={{ color: accentColor }}
        >
          {info.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-600">
          {contacts.map(({ icon: Icon, value, breakAll }, i) => (
            <div
              key={i}
              className="tpl-pop flex items-center gap-1.5 transition-transform duration-300 hover:-translate-y-0.5"
              style={delay(i + 2, 60)}
            >
              <Icon className="size-4" style={{ color: accentColor }} />
              <span className={breakAll ? "break-all" : ""}>{value}</span>
            </div>
          ))}
        </div>

        <div
          className="tpl-grow absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="tpl-up mb-7" style={delay(3)}>
          <SectionTitle accentColor={accentColor}>PROFESSIONAL SUMMARY</SectionTitle>
          <p className="text-gray-700 leading-relaxed">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-7">
          <SectionTitle accentColor={accentColor}>PROFESSIONAL EXPERIENCE</SectionTitle>

          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="tpl-up group relative border-l-[3px] pl-5 break-inside-avoid transition-all duration-300 hover:pl-6"
                style={{ borderColor: accentColor, ...delay(index + 4) }}
              >
                <span
                  className="absolute -left-[7.5px] top-1.5 size-3 rounded-full border-2 border-white transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: accentColor }}
                />
                <div className="flex justify-between items-start mb-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {exp.position}
                    </h3>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                  </div>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-7">
          <SectionTitle accentColor={accentColor}>PROJECTS</SectionTitle>

          <div className="space-y-3">
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="tpl-up break-inside-avoid border-l-[3px] border-gray-200 pl-5 transition-all duration-300 hover:pl-6"
                style={delay(index + 5)}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
              >
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-7">
          <SectionTitle accentColor={accentColor}>EDUCATION</SectionTitle>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="tpl-up flex justify-between items-start gap-4 break-inside-avoid rounded-lg p-3 -mx-3 transition-colors duration-300 hover:bg-gray-50 print:hover:bg-transparent"
                style={delay(index + 6)}
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {formatDate(edu.graduation_date)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <SectionTitle accentColor={accentColor}>CORE SKILLS</SectionTitle>

          <div className="flex gap-2 flex-wrap">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="tpl-pop px-3 py-1 text-sm rounded-md border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm print:hover:shadow-none"
                style={{
                  color: accentColor,
                  borderColor: `${accentColor}40`,
                  backgroundColor: `${accentColor}0D`,
                  ...delay(index + 7, 40),
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;