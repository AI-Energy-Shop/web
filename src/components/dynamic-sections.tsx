import React from 'react';
import Sections from './sections';
import { type GetPageQuery } from '@/lib/types';
interface DynamicSectionsProps {
  data: GetPageQuery;
}
const DynamicSections: React.FC<DynamicSectionsProps> = ({ data }) => {
  const { title, sections, slug } = data?.getPage || {};

  const componentMap: Record<string, (section: any) => React.ReactNode> = {
    ComponentSectionsImageSlider: (section) => (
      <Sections.SliderSection data={section.data} />
    ),
    ComponentSectionsAbout: (section) => (
      <Sections.AboutusSection data={section.data} />
    ),
    ComponentSectionsContactUs: (section) => (
      <Sections.ContactusSection data={section.data} />
    ),
    ComponentFormNewsletter: (section) => (
      <Sections.NewsletterSection data={section.data} />
    ),
    ComponentSectionsContactDetails: (section) => (
      <Sections.ContactDetails data={section.data} />
    ),
    ComponentSectionsWarehouseLocations: (section) => (
      <Sections.WarehouseSection data={section.data} />
    ),
    ComponentFormInquiry: (section) => (
      <Sections.InquerySection data={section.data} />
    ),
  };

  return (
    <div className="w-full min-h-screen">
      <div className="inner-container w-full lg:max-w-[1200px] h-full mx-auto">
        {slug !== '/' && (
          <h1 className="page-title text-lg w-full text-center font-bold uppercase my-5">
            {title}
          </h1>
        )}

        {sections?.map((section: any, index) => {
          const DynamicSection = componentMap[section.__typename];
          if (DynamicSection) {
            return <DynamicSection key={index} data={section} />;
          }
        })}
      </div>
    </div>
  );
};

export default DynamicSections;

