'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { capitalizeAllFirstChar } from '@/utils/string';

const PageTitle = () => {
  const { collection } = useParams();
  const title = collection === 'all' ? 'All Products' : capitalizeAllFirstChar(collection?.toString() || '');
  return <h1 className="text-4xl font-bold">{title}</h1>;
};

export default PageTitle;
