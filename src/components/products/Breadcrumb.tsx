import Link from 'next/link';
import React from 'react';

const Breadcrumb = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Solar Panels</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
