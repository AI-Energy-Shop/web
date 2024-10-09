import type { ContactDetails } from '@/libs/types';
import React from 'react';

interface ContactDetailsProps {
  data: ContactDetails;
}
const ContactDetails: React.FC<ContactDetailsProps> = ({ data }) => {
  return (
    <section className="w-full h-auto">
      {/* BANNER */}
      <div className="w-full h-auto rounded-[10px] overflow-hidden font-bold flex flex-col md:flex-row ">
        <div className="top-dark w-full p-5 flex flex-col items-center justify-center bg-blue-navy-blue">
          <span className="text-yellow-aes-yellow">
            {data?.left_subheading}
          </span>
          <span className="text-white">{data?.left_description}</span>
        </div>
        <div className="top-light w-full p-5 flex flex-col items-center justify-center bg-yellow-aes-yellow">
          <span className="text-blue-navy-blue uppercase">
            {data?.right_subheading}
          </span>
          <span className="text-black">{data?.right_description}</span>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
