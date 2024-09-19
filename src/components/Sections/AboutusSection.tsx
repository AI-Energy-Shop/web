"use client";
import { firaSansFont, muktaVaani } from "@/assets/fonts/fonts";
import React from "react";
import Spacer from "../Spacer";
import { useQuery } from "@apollo/client";
import ABOUT_SECTION from "@/graphql/about-section";

const AboutusSection = () => {
  const { data, loading } = useQuery(ABOUT_SECTION.Queries.getAboutSection);

  return (
    <section className="about-section w-full h-auto">
      <div className="lg:max-w-[1200px] lg:m-auto pt-5">
        <h1
          style={firaSansFont.style}
          className="text-blue-dark-blue flex items-center lg:h-[100px] uppercase text-center font-extrabold lg:text-[28px] lg:leading-[1.25] max-w-[85%] mx-auto md:max-w-[50%] md:mx-auto "
        >
          {!loading && data.aboutSection.data.attributes.heading}
        </h1>
        <div
          style={{
            backgroundPositionX: "30%",
            backgroundPositionY: "60%",
            backgroundImage:
              !loading &&
              data?.aboutSection?.data?.attributes?.baground_image?.data
                ?.attributes?.url &&
              `url('${data.aboutSection.data.attributes.baground_image.data.attributes.url}')`,
          }}
          className="
            w-full bg-center bg-cover
            lg:h-[320px]
          "
        >
          <div
            className="
              max-w-[85vw] h-full flex flex-col item-center justify-center pt-5 bg-yellow-light-yellow-50 clip-path-right-70 px-5 py-4
              md:max-w-[50%]
            "
          >
            <h2
              style={firaSansFont.style}
              className="
                w-[200px] font-bold text-purple-purp-aes text-wrap
                md:w-[250px] md:text-xl
                lg:w-[300px] lg:text-[28px] leading-[1.25]
              "
            >
              {!loading && data.aboutSection.data.attributes.sub_heading}
            </h2>
            <p
              style={muktaVaani.style}
              className="
                text-xs max-w-[70%] 
                md:text-base
                lg:text-base lg:leading-[1.25]
              "
            >
              {!loading && data.aboutSection.data.attributes.paragraph}
            </p>
            {!loading && (
              <button
                style={firaSansFont.style}
                className="max-w-[120px] h-[32px] uppercase bg-blue-navy-blue text-white flex items-center justify-center mt-3 leading-5"
              >
                {data.aboutSection.data.attributes.button_title}
              </button>
            )}
          </div>
        </div>
        <Spacer
          classStyle="
            h-[5px] gradient-effect
            lg:h-[10px]
          "
        />
      </div>
    </section>
  );
};

export default AboutusSection;
