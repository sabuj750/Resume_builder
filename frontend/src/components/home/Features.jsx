import React from "react";
import { Zap } from "lucide-react";
import Title from "./Title";
const Features = () => {
  return (
    <div id="features" className=" mb-10">
      <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10 border border-green-200 rounded-full px-4 py-1 text-center mx-auto max-w-max mb-6">
        <Zap className="size-4" />
        <span>Simple and easy to use</span>
      </div>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="absolute -z-50 size-[400px] -top-10 -left-20 aspect-square rounded-full bg-indigo-500/30 blur-3xl"></div>
        <p className="text-slate-800 text-lg text-left max-w-3xl">
          This helps you build faster by transforming your vision into , a
          simple and easy-to-use interface.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-10">
          <div className="md:col-span-2">
            <img
              alt="features showcase"
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/image-4.png"
            />
          </div>
          <div className="md:col-span-1">
            <img
              alt="features showcase"
              className="hover:-translate-y-0.5 transition duration-300"
              src="https://images.unsplash.com/photo-1698047681432-006d2449c631?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <h3 className="text-[24px]/7.5 text-slate-800 font-medium mt-6">
              Better design with highest returns and profits{" "}
            </h3>
            <p className="text-slate-600 mt-2">
              Empowers you to build beautifully and scalable Resume.
            </p>
            <a
              href="/app"
              className="group flex items-center gap-2 mt-4 text-indigo-600 hover:text-indigo-700 transition"
            >
              Learn more about the product
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right size-5 group-hover:translate-x-0.5 transition duration-300"
                aria-hidden="true"
              >
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
