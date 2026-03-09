import React from 'react'

const Loader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 z-50'>
      <div className='flex flex-col items-center gap-6'>
        {/* Enhanced Spinner with pulse effect */}
        <div className='relative w-20 h-20'>
          {/* Outer ring with pulse */}
          <div className='absolute inset-0 border-4 border-blue-200 rounded-full animate-ping opacity-20'></div>
          
          {/* Middle ring */}
          <div className='absolute inset-2 border-4 border-blue-300 rounded-full opacity-40'></div>
          
          {/* Inner spinning ring */}
          <div className='absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-500 rounded-full animate-spin'></div>
          
          {/* Center dot */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-3 h-3 bg-blue-600 rounded-full animate-pulse'></div>
          </div>
        </div>
        
        {/* Loading text with animation */}
        <div className='text-center'>
          <p className='text-gray-800 font-semibold text-lg'>Loading preview...</p>
          <p className='text-gray-600 text-sm mt-2'>Fetching your data</p>
          
          {/* Animated dots */}
          <div className='flex items-center justify-center gap-1 mt-3'>
            <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce' style={{animationDelay: '0ms'}}></div>
            <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce' style={{animationDelay: '150ms'}}></div>
            <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce' style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader