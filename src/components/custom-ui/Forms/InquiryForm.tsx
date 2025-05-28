'use client';
import { ComponentFormInquiry } from '@/lib/types';
import React from 'react';
import { Form, FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface InquiryFormProps {
  data: ComponentFormInquiry;
}
const InquiryForm: React.FC<InquiryFormProps> = ({ data }) => {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="w-full h-auto bg-blue-navy-blue my-10 rounded-xl p-5 flex flex-col gap-3">
        <h1 className="text-center text-white font-bold uppercase">
          {data.heading}
        </h1>

        <div className="inputs-container grid grid-cols-2 gap-5">
          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Full Name"
                  className="lg:flex-row items-center gap-3"
                />
              )}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Company/Business Name"
                  className="lg:flex-row items-center gap-3"
                />
              )}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Email"
                  className="lg:flex-row items-center gap-3"
                />
              )}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Phone/Mobile Number"
                  className="lg:flex-row items-center gap-3"
                />
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Message"
                  className="lg:flex-row items-center gap-3"
                />
              )}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="postal"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Postal"
                  className="lg:flex-row items-center gap-3"
                />
              )}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <FormField
              control={form.control}
              name="who"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Are you a solar installer/retailer?"
                  className="lg:flex-row items-center gap-3"
                />
              )}
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
    </Form>
  );
};

export default InquiryForm;
