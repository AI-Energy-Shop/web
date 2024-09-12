"use client";
import { firaSansFont, muktaVaani } from "@/assets/fonts/fonts";
import React from "react";
import Image from "next/image";

const ContactusSection = () => {
  return (
    <section className="about-section w-full h-auto">
      <div
        className="
        h-[200px] w-full
        md:h-[300px] 
        lg:max-w-[1200px] lg:h-[320px] lg:m-auto"
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
            <Image
              alt=""
              fill
              sizes="100vh"
              quality={100}
              className="object-cover"
              src="/images/background/AES-Customer-Chat-w-Solplanet.jpg"
            />
          </div>
          <div
            className="absolute top-0 right-0 -z-1
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
              Service Across Australia
            </h2>
            <p
              style={muktaVaani.style}
              className="
                max-w-[50%] text-xs text-wrap text-white text-right ml-auto
                md:max-w-[50%] md:text-base
                lg:max-w-[30%] lg:text-end
              "
            >
              Ai Energy Shop is always here to answer your questions, Serving
              costumers nation wide, we&apos;re always here to provide the
              support you need.
            </p>
            <button
              style={firaSansFont.style}
              className="
                bg-yellow-aes-yellow max-w-[120px] min-w-[120px] uppercase leading-5 text-lg p-1
                md:max-w-[150px] md:min-w-[140px]
              "
            >
              contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactusSection;
