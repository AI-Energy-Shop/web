import { ComponentSectionsContactDetails } from '@/lib/types';
import React from 'react';

interface ContactDetailsProps {
  data: ComponentSectionsContactDetails;
}
const ContactDetails: React.FC<ContactDetailsProps> = ({ data }) => {
  return (
    <section className="w-full h-auto">
      {/* BANNER */}
      <div className="w-full h-auto rounded-[10px] overflow-hidden font-bold flex flex-col md:flex-row ">
        <div className="top-dark w-full p-5 flex flex-col items-center justify-center bg-blue-navy-blue">
          <span className="text-yellow-aes-yellow">{data?.left_heading}</span>
          <span className="text-white">{data?.left_sub_heading}</span>
        </div>
        <div className="top-light w-full p-5 flex flex-col items-center justify-center bg-yellow-aes-yellow">
          <span className="text-blue-navy-blue uppercase">
            {data?.right_heading}
          </span>
          <span className="text-black">{data?.right_sub_heading}</span>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
