import React from 'react';
import Sections from './Sections';
import { type GetPageQuery } from '@/lib/types';
interface DynamicComponentRendererProps {
  data: GetPageQuery;
}
const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({
  data,
}) => {
  const { title, sections, slug } = data?.getPage || {};

  const componentMap: Record<string, (section: any) => React.ReactNode> = {
    ComponentSectionsImageSlider: (section) => (
      <Sections.SliderSection bannerImages={section.slides} />
    ),
    ComponentSectionsAbout: (section) => (
      <Sections.AboutusSection data={section} />
    ),
    ComponentSectionsContactUs: (section) => (
      <Sections.ContactusSection data={section} />
    ),
    ComponentFormNewsletter: (section) => (
      <Sections.NewsletterSection data={section} />
    ),
    ComponentSectionsContactDetails: (section) => (
      <Sections.ContactDetails data={section} />
    ),
    ComponentSectionsWarehouseLocations: (section) => (
      <Sections.WarehouseSection data={section} />
    ),
    ComponentFormInquiry: (section) => (
      <Sections.InquerySection data={section} />
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

        {sections?.map(
          (section: any) => componentMap[section.__typename]?.(section) || null
        )}
      </div>
    </div>
  );
};

export default DynamicComponentRenderer;
