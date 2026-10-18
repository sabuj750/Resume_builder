import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

/* Animations are decorative only: disabled for print and reduced-motion users */
const css = `
@keyframes tpl-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes tpl-pop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
@keyframes tpl-float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(14px, -10px); } }
.tpl-up { animation: tpl-up .6s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.tpl-pop { animation: tpl-pop .4s cubic-bezier(.34,1.56,.64,1) both; animation-delay: var(--d, 0ms); }
.tpl-float { animation: tpl-float 9s ease-in-out infinite; }
@media print, (prefers-reduced-motion: reduce) {
  .tpl-up, .tpl-pop, .tpl-float { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

const delay = (i, step = 70) => ({ "--d": `${i * step}ms` });

const SectionTitle = ({ children, accentColor }) => (
  <h2 className="text-2xl font-light mb-5 pb-2 border-b border-gray-200 relative">
    {children}
    <span
      className="absolute left-0 -bottom-px h-0.5 w-16 rounded-full"
      style={{ backgroundColor: accentColor }}
    />
  </h2>
);

const cleanUrl = (url, prefix) => {
  const part = url.split(prefix)[1];
  return part ? part : url;
};

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const info = data.personal_info || {};

  const chip =
    "flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-full px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5";

  return (
    <div
      className="max-w-4xl mx-auto bg-white text-gray-800 shadow-sm print:shadow-none overflow-hidden"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      <style>{css}</style>

      {/* Header */}
      <header
        className="relative p-8 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
        }}
      >
        {/* decorative shapes */}
        <div className="tpl-float absolute -top-16 -right-10 size-56 rounded-full bg-white/10" />
        <div
          className="tpl-float absolute -bottom-20 right-32 size-40 rounded-full bg-white/10"
          style={{ animationDelay: "-4s" }}
        />

        <div className="relative">
          <h1 className="tpl-up text-5xl font-light mb-5 tracking-tight">
            {info.full_name || "Your Name"}
          </h1>

          <div className="flex flex-wrap gap-2 text-sm">
            {info.email && (
              <div className={`tpl-pop ${chip}`} style={delay(2)}>
                <Mail className="size-4" />
                <span>{info.email}</span>
              </div>
            )}
            {info.phone && (
              <div className={`tpl-pop ${chip}`} style={delay(3)}>
                <Phone className="size-4" />
                <span>{info.phone}</span>
              </div>
            )}
            {info.location && (
              <div className={`tpl-pop ${chip}`} style={delay(4)}>
                <MapPin className="size-4" />
                <span>{info.location}</span>
              </div>
            )}
            {info.linkedin && (
              <a
                target="_blank"
                rel="noreferrer"
                href={info.linkedin}
                className={`tpl-pop ${chip}`}
                style={delay(5)}
              >
                <Linkedin className="size-4" />
                <span className="break-all text-xs">
                  {cleanUrl(info.linkedin, "https://www.")}
                </span>
              </a>
            )}
            {info.website && (
              <a
                target="_blank"
                rel="noreferrer"
                href={info.website}
                className={`tpl-pop ${chip}`}
                style={delay(6)}
              >
                <Globe className="size-4" />
                <span className="break-all text-xs">
                  {cleanUrl(info.website, "https://")}
                </span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="tpl-up mb-8" style={delay(3)}>
            <SectionTitle accentColor={accentColor}>Professional Summary</SectionTitle>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <SectionTitle accentColor={accentColor}>Experience</SectionTitle>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="tpl-up group relative pl-6 border-l-2 border-gray-200 break-inside-avoid transition-colors duration-300"
                  style={delay(index + 4)}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
                >
                  <span
                    className="absolute -left-[7px] top-2 size-3 rounded-full border-2 border-white transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line text-sm">
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
          <section className="mb-8">
            <SectionTitle accentColor={accentColor}>Projects</SectionTitle>

            <div className="space-y-4">
              {data.projects.map((p, index) => (
                <div
                  key={index}
                  className="tpl-up break-inside-avoid rounded-lg border border-gray-200 border-l-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md print:hover:shadow-none print:hover:translate-y-0"
                  style={{ borderLeftColor: accentColor, ...delay(index + 5) }}
                >
                  <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
                  {p.description && (
                    <div className="text-gray-600 leading-relaxed text-sm mt-1.5">
                      {p.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <SectionTitle accentColor={accentColor}>Education</SectionTitle>

              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div
                    key={index}
                    className="tpl-up break-inside-avoid"
                    style={delay(index + 6)}
                  >
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.institution}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <SectionTitle accentColor={accentColor}>Skills</SectionTitle>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="tpl-pop px-3 py-1 text-sm text-white rounded-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md print:shadow-none"
                    style={{ backgroundColor: accentColor, ...delay(index + 7, 40) }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;