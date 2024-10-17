import Components from '@/components';
import Sections from '../components/Sections/index';
import { getPage } from '@/app/actions/pages';

export default async function HomePage() {
  const data = await getPage("");

  return (
    <main className="w-full min-h-screen bg-yellow-light-yellow-50 ">
      {data.getPage.sections.map((section: any, index: number) => {
          switch (section.__typename) {
            case "ComponentSectionsImageSlider":
              return (
                <Components.Sections.SliderSection
                  bannerImages={section.slides}
                />
              )
            case "ComponentSectionsAboutSection":
              return (
                <Components.Sections.AboutusSection
                  data={section}
                />
              )
            case "ComponentSectionsContactUsSection":
              return (
                <Components.Sections.ContactusSection
                  data={section}
                />
              )
            case "ComponentFormNewsletter":
              return (
                <Components.Sections.NewsletterSection data={section} />
              )
            default:
              break;
          }
        })}
    </main>
  );
}
