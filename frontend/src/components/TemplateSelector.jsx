import React from "react";
import { Layout, Check } from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A classic resume template with a clean and professional layout. It features a simple and minimal design that is easy to read and visually appealing.",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "A modern resume template with a sleek and contemporary design. It incorporates bold typography, vibrant colors, and unique layout elements to create a visually striking resume.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "A minimal resume template that focuses on simplicity and elegance. It utilizes ample white space, clean lines, and a restrained color palette to create a sophisticated and understated look.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "A minimal resume template that incorporates a prominent image or photo. It combines a clean and simple layout with a visually appealing image to create a personalized and impactful resume.",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover-ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        /* Changed z-10 to z-50 below */
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-50 bg-white rounded-md border border-gray-200 shadow-sm">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100 "
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 ">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;