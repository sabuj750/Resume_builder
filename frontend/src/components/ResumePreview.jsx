import React from "react";
import ModernTemplate from "./ModernTemplate.jsx";
import ClassicTemplate from "./ClassicTemplate.jsx";
import MinimalImageTemplate from "./MinimalImageTemplate.jsx";
import MinimalTemplate from "./MinimalTemplate.jsx";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    // NOTE: no `relative` / transforms on these wrappers, so the print rules
    // below (which position #resume-preview absolutely) keep working.
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-100 via-gray-100 to-green-50 p-3 sm:p-5 print:p-0 print:bg-transparent">
      <div
        id="resume-preview"
        className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl shadow-slate-300/50 print:shadow-none print:border-none print:rounded-none ${classes}`}
      >
        {/* re-plays a soft entrance whenever the template changes */}
        <div key={template} className="rp-in">
          {renderTemplate()}
        </div>
      </div>

      <style>
        {`
          @keyframes rp-in {
            from { opacity: 0; transform: translateY(10px) scale(0.99); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          /* "backwards" fill: no transform is left behind after the animation */
          .rp-in { animation: rp-in .5s cubic-bezier(.22,1,.36,1) backwards; }
          @media (prefers-reduced-motion: reduce) {
            .rp-in { animation: none !important; }
          }

          @page {
            size: letter;
            margin: 0;
          }
          @media print {
            .rp-in { animation: none !important; transform: none !important; }
            html,
            body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }
            body * {
              visibility: hidden;
            }
            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }
            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
              border-radius: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;