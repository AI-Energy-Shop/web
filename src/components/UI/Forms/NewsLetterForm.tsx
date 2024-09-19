import React from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "./InputGroup";
import { subscribeToNews } from "@/app/actions/mail";
import { firaSansFont } from "@/assets/fonts/fonts";

interface NewsLetterFormProps {
  data?: {
    heading?: string;
    button_title?: string;
    paragraph?: string;
    sub_text?: string;
    privacy_link?: string;
    background_image?: {
      data?: {
        attributes: {
          url: string;
          name: string;
          alternativeText: string;
        };
      };
    };
  };
}

const NewsLetterForm: React.FC<NewsLetterFormProps> = ({ data }) => {
  return (
    <div className="w-full h-auto rounded-xl overflow-hidden">
      <div className="w-full h-[80px] flex items-center bg-gradient-to-b from-[#f9ac0a] to-[#f06039]">
        <div className="left w-[50%] md:lg:w-[40%] pl-5">
          <h1
            style={firaSansFont.style}
            className="
            font-bold text-base 
            md:text-[18px] 
          "
          >
            {data?.heading}
          </h1>
          <p
            className="
            font-semibold text-xs
            md:text-base md:font-normal
          "
          >
            {data?.paragraph}
          </p>
        </div>
        <div
          className="
            right w-[54%] h-full clip-path-left-30
            md:w-[60%] md:clip-path-left-20
            lg:clip-path-left-10
          "
        >
          <div className="w-full h-full relative overflow-hidden">
            {data?.background_image?.data && (
              <Image
                fill
                priority
                sizes="100vh"
                alt={
                  data.background_image.data.attributes.url ||
                  `newsletter-bg-image${data.background_image.data.attributes.alternativeText}`
                }
                src={data.background_image.data.attributes.url}
                className="w-auto h-auto object-cover"
              />
            )}
          </div>
        </div>
      </div>
      <form
        action={subscribeToNews}
        className="flex flex-col gap-5 bg-black px-5 py-4"
      >
        <div className="inputs-container grid gap-5 grid-cols-4 md:p-10">
          <div className="col-span-2">
            <InputGroup
              name="name"
              label="Name"
              inputType="TEXT"
              className="lg:flex-row items-center gap-3"
            />
          </div>
          <div className="col-span-2">
            <InputGroup
              name="company"
              label="Company"
              inputType="TEXT"
              className="lg:flex-row items-center gap-3"
            />
          </div>
          <div className="col-span-4 md:col-start-2 md:col-span-2">
            <InputGroup
              name="email"
              label="E-mail"
              inputType="TEXT"
              className="lg:flex-row items-center gap-3 text-nowrap"
            />
          </div>
        </div>

        <p className="text-white text-xs text-center italic">
          {data?.sub_text}{" "}
          <span>
            <Link href={data?.privacy_link || "/"} className=" underline">
              {"privacy policy"}
            </Link>
          </span>
          .
        </p>
        <button className="min-w-[30%] m-auto font-bold py-1 px-5 bg-yellow-aes-yellow rounded-sm overflow-hidden">
          {data?.button_title || "Button Title"}
        </button>
      </form>
    </div>
  );
};

export default NewsLetterForm;
