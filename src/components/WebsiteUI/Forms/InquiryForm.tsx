import { InquiryFormType } from '@/lib/types';
import InputGroup from './InputGroup';
import React from 'react';

interface InquiryFormProps {
  data: InquiryFormType
}
const InquiryForm: React.FC<InquiryFormProps> = ({data}) => {
  return (
    <form className="w-full h-auto bg-blue-navy-blue my-10 rounded-xl p-5 flex flex-col gap-3">
      <h1 className="text-center text-white font-bold uppercase">{data.heading}</h1>

      <div className="inputs-container grid grid-cols-2 gap-5">
        <div className="col-span-2 md:col-span-1">
          <InputGroup
            label="Full name"
            name="fullName"
            inputType="TEXT"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <InputGroup
            label="Company/Business Name"
            name="companyName"
            inputType="TEXT"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <InputGroup label="Email" name="email" inputType="TEXT" required />
        </div>
        <div className="col-span-2 md:col-span-1">
          <InputGroup
            label="Phone/Mobile Number"
            name="phone"
            inputType="EMAIL"
          />
        </div>

        <div className="col-span-2">
          <InputGroup
            label="Message"
            name="message"
            inputType="TEXTAREA"
            required
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <InputGroup label="Postal" name="postal" inputType="TEXT" />
        </div>
        <div className="col-span-2 md:col-span-1">
          <InputGroup
            label="Are you a solar installer/retailer?"
            name="who"
            inputType="TEXT"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-yellow-aes-yellow min-w-[50%] py-2 px-5 m-auto font-bold rounded-sm overflow-hidden"
      >
        {data.button_title}
      </button>
    </form>
  );
};

export default InquiryForm;
