import Components from '@/components';
import { getPage } from '@/app/actions/pages';

export default async function HomePage() {
  const data = await getPage('/');

  const pageData = data.data;
  return (
    <main className="w-full min-h-screen">
      <Components.DynamicSections data={pageData} />
    </main>
  );
}
