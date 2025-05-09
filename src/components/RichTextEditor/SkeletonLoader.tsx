import React from 'react';

const SkeletonRichTextEditor = () => (
  <div className="border rounded-md w-full" style={{ minHeight: 260 }}>
    {/* Toolbar skeleton */}
    <div className="flex space-x-2 p-2 border-b">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-8 w-8 bg-gray-200 rounded" />
      ))}
    </div>
    {/* Content skeleton */}
    <div className="p-3">
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="h-32 bg-gray-200 rounded" />
    </div>
  </div>
);

export default SkeletonRichTextEditor;
