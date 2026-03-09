import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';

const ProfessionalSummaryForm = ({ data, onChange , setResumeData }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const charCount = data?.length || 0;
  const maxChars = 500;

  const {token} = useSelector((state) => state.auth);


  // Simplified handler: Simulates the animation without the API call
  const handleAiEnhance = async () => {
    try{
      setIsEnhancing(true);
      const prompt = `enhance my professional summary: "${data}"`;
      const response = await api.post('/api/ai/enhance-pro-sum/', {userContent : prompt} , {headers : {Authorization : token}});
      onChange(response.data.enhancedContent);
      toast.success("Summary enhanced!");
    }catch(err){
      toast.error(err.response?.data?.message || "Something went wrong");
    }finally{
      setTimeout(() => {
        setIsEnhancing(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Briefly summarize your professional background and key skills.
          </p>
        </div>

        {/* The Animated Button */}
        <button
          onClick={handleAiEnhance}
          disabled={isEnhancing || !data?.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg whitespace-nowrap"
        >
          {isEnhancing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              AI Enhance
            </>
          )}
        </button>
      </div>

      {/* Input Section */}
      <div className="mt-6">
        <div className="relative">
          <textarea
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={7}
            maxLength={maxChars}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-sm text-gray-900 placeholder:text-gray-400"
            placeholder="Write a compelling professional summary..."
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {charCount}/{maxChars}
          </div>
        </div>
        
        {/* Info Tip Box */}
        <div className="mt-3 flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="size-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>Tip:</strong> Keep it concise and focus on your most relevant achievements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;