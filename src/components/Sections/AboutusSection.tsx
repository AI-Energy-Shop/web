import { firaSansFont, muktaVaani } from "@/assets/fonts/fonts";
import React from "react";
import Spacer from "../Spacer";
import Image from "next/image";

const AboutusSection = () => {
  return (
    <div className="about-section w-full h-auto">
      <div className="lg:max-w-[1200px] lg:m-auto pt-5">
        <h1
          style={firaSansFont.style}
          className="text-blue-dark-blue flex items-center lg:h-[100px] uppercase text-center font-extrabold lg:text-[28px] lg:leading-[1.25] max-w-[85%] mx-auto md:max-w-[50%] md:mx-auto "
        >
          BEST PRICE. TOP BRANDS. FAST SHIPPING. LET&apos;S GROW YOUR BUSINESS
          TOGETHER.
        </h1>
        <div
          style={{ backgroundPositionX: "30%", backgroundPositionY: "60%" }}
          className="
            w-full bg-homeArealShot bg-center bg-cover
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
                flex flex-col font-bold text-purple-purp-aes 
                md:text-xl
                lg:text-[28px] leading-[1.25]
              "
            >
              <span>Export In Renewable</span> <span>Energy And Storage</span>
            </h2>
            <p
              style={muktaVaani.style}
              className="
                text-xs max-w-[70%] 
                md:text-base
                lg:text-base lg:leading-[1.25]
              "
            >
              AI Energy Shop is a trusted national wholesaler of PV inverters,
              energy storage solar racking, and other renewable energy and
              electrical
              <span className="font-bold">products in Australia</span>
            </p>
            <button
              style={firaSansFont.style}
              className="max-w-[120px] h-[32px] uppercase bg-blue-navy-blue text-white flex items-center justify-center mt-3 leading-5"
            >
              about us
            </button>
          </div>
        </div>
        <Spacer
          classStyle="
            h-[5px] gradient-effect
            lg:h-[10px]
          "
        />
      </div>
    </div>
  );
};

export default AboutusSection;
