import React from "react";
import LocationTab from "./LocationTab";
import InquiryForm from "../../UI/Forms/InquiryForm";
import NewsLetterForm from "../../UI/Forms/NewsLetterForm";

const ContactFormSection = () => {
  return (
    <section className="w-full h-auto p-5 bg-yellow-light-yellow">
      <div className="inner-container w-full lg:max-w-[1200px] h-full mx-auto">
        <h1 className="page-title text-lg w-full text-center font-bold uppercase my-5">
          Contact
        </h1>

        {/* BANNER */}
        <div className="w-full h-auto rounded-[10px] overflow-hidden font-bold flex flex-col md:flex-row ">
          <div className="top-dark w-full p-5 flex flex-col items-center justify-center bg-blue-navy-blue">
            <span className="text-yellow-aes-yellow">Call Now</span>
            <span className="text-white">1234 456 789</span>
          </div>
          <div className="top-light w-full p-5 flex flex-col items-center justify-center bg-yellow-aes-yellow">
            <span className="text-blue-navy-blue uppercase">Email Us</span>
            <span className="text-black">info@aienergy.com.au</span>
          </div>
        </div>

        {/* DETAILS */}
        <div className="w-full md:w-[50%] lg:w-[25%] md:mx-auto h-auto p-5 rounded-[10px] overflow-hidden my-5 flex flex-col justify-center items-center">
          <h1 className="uppercase text-lg font-bold"> Warehouse Locations</h1>
          <p className="text-sm text-center">
            We have warehouses located in major cities across Australia and we
            ensure to have stocks available across the country.
          </p>
        </div>

        <LocationTab />

        <InquiryForm />

        <NewsLetterForm />
      </div>
    </section>
  );
};

export default ContactFormSection;
