import { getPage } from '@/app/actions/pages';
import React from 'react'


const DynamicPage = async ({params: { slug }}: {params: {slug: string}}) => {
  
  const data = await getPage(slug);
  
  return (
    <div className='w-full min-h-screen'>
      <div className="inner-container w-full lg:max-w-[1200px] h-full mx-auto">
        <h1 className="page-title text-lg w-full text-center font-bold uppercase my-5">
          {data?.getPage?.title}
        </h1>

        {/* <Components.Sections.ContactDetails
          data={data?.contactPage?.data?.attributes?.contact_details_section}
        />

        <Components.Sections.WarehouseSection
          data={data?.contactPage?.data?.attributes?.warehouse_location}
        />

        <Components.Sections.InquerySection />

        <Components.Sections.NewsletterSection /> */}
      </div>
    </div>
  )
}

export default DynamicPage