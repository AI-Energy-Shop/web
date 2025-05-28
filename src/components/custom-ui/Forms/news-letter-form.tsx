'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { firaSansFont } from '@/assets/fonts/fonts';
import { FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface NewsLetterFormProps {
  data: {
    heading: string;
    button_title?: string;
    sub_heading?: string;
    sub_text?: string;
    privacy_link?: string;
    image?: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
}

const NewsLetterForm: React.FC<NewsLetterFormProps> = ({ data }) => {
  const form = useForm();

  return (
    <div className="w-full h-auto rounded-xl overflow-hidden">
      <div className="w-full h-[100px] flex items-center  bg-gradient-to-b from-[#9a1a52] to-blue-dark-blue">
        <div className="left h-full w-full p-3 md:lg:w-full bg-gradient-to-b from-[#f9ac0a] to-[#f06039] clip-path-right-10-left-0">
          <h1
            style={firaSansFont.style}
            className="
            font-bold text-[16px]
            md:text-[18px] 
          "
          >
            {data.heading}
          </h1>
          <p
            className="
            font-semibold text-xs
            md:text-base md:font-normal
          "
          >
            {data?.sub_heading}
          </p>
        </div>
        <div className=" w-[130%] h-full clip-path-right-10-left-10 -translate-x-[50px]">
          <div className="w-full h-full relative overflow-hidden">
            {data?.image && (
              <Image
                fill
                priority
                sizes="100vh"
                alt={
                  data.image.url ||
                  `newsletter-bg-image${data.image.alternativeText}`
                }
                src={data.image.url}
                className="w-auto h-auto object-cover"
              />
            )}
          </div>
        </div>
        <div className=" w-[90%] h-full clip-path-right-10-left-10 bg-transparent"></div>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-5 bg-black px-5 py-4">
          <div className="inputs-container grid gap-5 grid-cols-4 md:p-10">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Name"
                    className="lg:flex-row items-center gap-3"
                  />
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Company"
                    className="lg:flex-row items-center gap-3"
                  />
                )}
              />
            </div>
            <div className="col-span-4 md:col-start-2 md:col-span-2">
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
          </div>

          <p className="text-white text-xs text-center italic">
            {data?.sub_text}{' '}
            <span>
              <Link href={data?.privacy_link || '/'} className=" underline">
                {'privacy policy'}
              </Link>
            </span>
            .
          </p>
          <button className="min-w-[30%] m-auto font-bold py-1 px-5 bg-yellow-aes-yellow rounded-sm overflow-hidden">
            {data?.button_title || 'Button Title'}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default NewsLetterForm;
