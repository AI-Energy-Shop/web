import Components from '@/components';
import { getPage } from '@/app/actions/pages';

export default async function HomePage() {
  const data = await getPage("/");
  return (
    <main className="w-full min-h-screen">
      <>
        <Components.DynamicComponentRenderer data={data} />
      </>
    </main>
  );
}
