/* Animations are decorative only: disabled for print and reduced-motion users */
const css = `
@keyframes tpl-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes tpl-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.tpl-up { animation: tpl-up .7s cubic-bezier(.22,1,.36,1) both; animation-delay: var(--d, 0ms); }
.tpl-grow { transform-origin: left; animation: tpl-grow .9s cubic-bezier(.22,1,.36,1) .3s both; }
@media print, (prefers-reduced-motion: reduce) {
  .tpl-up, .tpl-grow { animation: none !important; opacity: 1 !important; transform: none !important; }
}
`;

const delay = (i, step = 80) => ({ "--d": `${i * step}ms` });

const SectionTitle = ({ children, accentColor }) => (
  <div className="mb-6">
    <h2
      className="text-xs uppercase tracking-[0.3em] font-medium mb-2"
      style={{ color: accentColor }}
    >
      {children}
    </h2>
    <div className="tpl-grow h-px w-12" style={{ backgroundColor: accentColor }} />
  </div>
);

const MinimalTemplate = ({ data, accentColor }) => {
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
    info.email,
    info.phone,
    info.location,
    info.linkedin,
    info.website,
  ].filter(Boolean);

  return (
    <div
      className="max-w-4xl mx-auto p-10 bg-white text-gray-900 font-light shadow-sm print:shadow-none"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      <style>{css}</style>

      {/* Header */}
      <header className="tpl-up mb-12">
        <h1 className="text-5xl font-thin mb-5 tracking-wide">
          {info.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
          {contacts.map((value, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="break-all transition-colors duration-300 hover:text-gray-900">
                {value}
              </span>
              {i !== contacts.length - 1 && (
                <span
                  className="size-1 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              )}
            </span>
          ))}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="tpl-up mb-12" style={delay(2)}>
          <p
            className="text-gray-700 leading-relaxed text-[15px] pl-5 border-l"
            style={{ borderColor: accentColor }}
          >
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-12">
          <SectionTitle accentColor={accentColor}>Experience</SectionTitle>

          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="tpl-up group break-inside-avoid transition-transform duration-300 hover:translate-x-1 print:hover:translate-x-0"
                style={delay(index + 3)}
              >
                <div className="flex justify-between items-baseline mb-1 gap-4">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-xs uppercase tracking-wider text-gray-400 whitespace-nowrap">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="mb-3 text-sm" style={{ color: accentColor }}>
                  {exp.company}
                </p>
                {exp.description && (
                  <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
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
        <section className="mb-12">
          <SectionTitle accentColor={accentColor}>Projects</SectionTitle>

          <div className="space-y-5">
            {data.projects.map((proj, index) => (
              <div
                key={index}
                className="tpl-up break-inside-avoid transition-transform duration-300 hover:translate-x-1 print:hover:translate-x-0"
                style={delay(index + 4)}
              >
                <h3 className="text-lg font-medium mb-1">{proj.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-12">
          <SectionTitle accentColor={accentColor}>Education</SectionTitle>

          <div className="space-y-5">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="tpl-up flex justify-between items-baseline gap-4 break-inside-avoid"
                style={delay(index + 5)}
              >
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  {edu.gpa && (
                    <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>
                  )}
                </div>
                <span className="text-xs uppercase tracking-wider text-gray-400 whitespace-nowrap">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <SectionTitle accentColor={accentColor}>Skills</SectionTitle>

          <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm text-gray-700">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="tpl-up inline-flex items-center gap-2 transition-colors duration-300 hover:text-gray-900"
                style={delay(index + 6, 40)}
              >
                {skill}
                {index !== data.skills.length - 1 && (
                  <span style={{ color: accentColor }}>/</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;