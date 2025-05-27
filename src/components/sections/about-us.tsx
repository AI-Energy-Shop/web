import React from 'react';
import { ComponentSectionsAbout } from '@/lib/types';
import { firaSansFont, muktaVaani } from '@/assets/fonts/fonts';

interface AboutusSectionProps {
  data: ComponentSectionsAbout;
}

const AboutusSection: React.FC<AboutusSectionProps> = ({ data }) => {
  return (
    <section className="about-section w-full h-auto">
      <div className="lg:max-w-[1200px] lg:m-auto">
        <h1
          style={firaSansFont.style}
          className="text-blue-dark-blue flex items-center py-6 lg:h-[100px] uppercase text-center font-extrabold lg:text-[28px] lg:leading-[1.25] max-w-[85%] mx-auto md:max-w-[50%] md:mx-auto "
        >
          {data.heading}
        </h1>
        <div
          style={{
            backgroundImage: data?.background_image?.url
              ? `url('${data.background_image.url}')`
              : '',
          }}
          className="
            w-full bg-center bg-cover
            lg:h-[320px] about-us-background
          "
        >
          <div
            className="
              max-w-[85vw] h-full flex flex-col item-center justify-center pt-5 bg-yellow-light-yellow-50 clip-path-right-75  px-5 py-4
              md:max-w-[50%]
            "
          >
            <h2
              style={firaSansFont.style}
              className="
                w-[200px] mb-3 font-bold text-purple-purp-aes text-wrap text-[18px]
                md:w-[250px] md:text-xl
                lg:w-[300px] lg:text-[28px] leading-[1.1]
              "
            >
              {data.sub_heading}
            </h2>
            <p
              style={muktaVaani.style}
              className="text-[14px] md:text-[16px] max-w-[70%] leading-[1.25] "
            >
              {data.description}
            </p>
            <button
              style={firaSansFont.style}
              className="max-w-[120px] h-[32px] uppercase bg-blue-navy-blue text-white flex items-center justify-center mt-3 leading-5"
            >
              {data.button_title}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutusSection;
