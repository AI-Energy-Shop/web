import Components from "@/components";
import React from "react";
import { getContactPage } from "../actions/contact-page";
const ContactPage = async () => {
  const data = await getContactPage();

  return (
    <main className="min-h-[100vh] w-full h-auto p-5 bg-yellow-light-yellow">
      <div className="inner-container w-full lg:max-w-[1200px] h-full mx-auto">
        <h1 className="page-title text-lg w-full text-center font-bold uppercase my-5">
          Contact Us
        </h1>

        <Components.Sections.ContactDetails
          data={data?.contactPage?.data?.attributes?.contact_details_section}
        />

        <Components.Sections.WarehouseSection
          data={data?.contactPage?.data?.attributes?.warehouse_location}
        />

        <Components.Sections.InquerySection />

        <Components.Sections.NewsletterSection />
      </div>
    </main>
  );
};

export default ContactPage;
