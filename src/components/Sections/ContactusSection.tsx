import { firaSansFont, muktaVaani } from '@/assets/fonts/fonts';
import React from 'react';
import Image from 'next/image';
import type { ContactusSection } from '@/libs/types';

interface ContactusSectionProps {
  data: ContactusSection;
}
const ContactusSection: React.FC<ContactusSectionProps> = ({ data }) => {
  return (
    <section className="about-section w-full h-auto">
      <div
        className="
          h-[200px] w-full
          md:h-[300px] 
          lg:max-w-[1200px] lg:h-[320px] lg:m-auto
        "
      >
        <div
          className="
            bg-blue-dark-blue w-full h-full relative
          "
        >
          <div
            className="
              relative w-[50%] h-full clip-path-right-40
              lg:w-[65%] lg:clip-path-right-70
            "
          >
            {data?.image?.data && (
              <Image
                fill
                priority
                sizes="100vh"
                quality={100}
                className="object-cover"
                src={data.image.data.attributes.url}
                alt={
                  data.image.data.attributes.alternativeText ||
                  data.image.data.attributes.name
                }
              />
            )}
          </div>
          <div
            className="
              absolute top-0 right-0 -z-1
              w-full h-full p-5 flex flex-col justify-center gap-1 items-end          
            "
          >
            <h2
              style={firaSansFont.style}
              className=" 
                text-yellow-aes-yellow flex flex-col font-bold text-sm text-right
                md:text-xl
                lg:text-[28px]
              "
            >
              {data.heading}
            </h2>
            <p
              style={muktaVaani.style}
              className="
                max-w-[50%] text-xs text-wrap text-white text-right ml-auto
                md:max-w-[50%] md:text-base
                lg:max-w-[30%] lg:text-end
              "
            >
              {data.description}
            </p>
            <button
              style={firaSansFont.style}
              className="
                    bg-yellow-aes-yellow max-w-[120px] min-w-[120px] uppercase leading-5 text-lg p-1
                    md:max-w-[150px] md:min-w-[140px]
                  "
            >
              {data.button_title}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactusSection;
