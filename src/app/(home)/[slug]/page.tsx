export const dynamic = 'auto';
import { getPage } from '@/app/actions/pages';
import Components from '@/components';
import React from 'react';

interface DynamicPageProps {
  params: { slug: string };
}

const DynamicPage = async ({ params: { slug } }: DynamicPageProps) => {
  let data = null;

  try {
    data = await getPage(slug);
  } catch (error) {
    return <div>Error loading page data.</div>;
  }

  return (
    <main className="w-full min-h-screen">
      <Components.DynamicSections data={data} />
    </main>
  );
};

export default DynamicPage;
