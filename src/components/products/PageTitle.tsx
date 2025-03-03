import React from 'react';

const PageTitle = ({ title }: { title: string }) => {
  return <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>;
};

export default PageTitle;
