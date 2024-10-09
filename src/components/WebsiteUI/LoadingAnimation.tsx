import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="w-full">
      <div className="relative max-w-[1200px] mx-auto h-64 bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex flex-col justify-end p-6">
          <div className="h-6 w-3/4 bg-gray-300 mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-300"></div>
          <div className="mt-4 h-8 w-32 bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
