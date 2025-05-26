export const dynamic = 'auto';
import { getPage } from '@/app/actions/pages';
import NotFoundPage from '@/app/not-found';
import Components from '@/components';
import React from 'react';

interface DynamicPageProps {
  params: Promise<{ slug: string }>;
}

const DynamicPage = async (props: DynamicPageProps) => {
  const params = await props.params;

  const { slug } = params;

  const data = await getPage(slug);

  if (data && !data.getPage) {
    return <NotFoundPage />;
  }

  return (
    <main className="w-full min-h-screen">
      <Components.DynamicSections data={data} />
    </main>
  );
};

export default DynamicPage;
