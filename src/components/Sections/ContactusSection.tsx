import { firaSansFont, muktaVaani } from "@/assets/fonts/fonts";
import React from "react";
import Spacer from "../Spacer";

const ContactusSection = () => {
  return (
    <section className="about-section w-full h-auto">
      <div className="lg:max-w-[1200px] lg:h-[320px] lg:m-auto">
        <div className="w-full h-full bg-customerChatSolPlanet bg-center bg-cover flex justify-end">
          <div
            style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
            className="
              w-[65%] bg-blue-dark-blue p-5 flex flex-col justify-center gap-1 items-end
              lg:w-[50%]          
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
                max-w-[90%] text-xs text-wrap text-white text-right ml-auto
                md:text-base
                lg:max-w-[30%] lg:text-end
              "
            >
              Ai Energy Shop is always here to answer your questions, Serving
              costumers nation wide, we&apos;re always here to provide the
              support you need.
            </p>
            <button
              style={firaSansFont.style}
              className="max-w-[120px] min-w-[120px] h-[32px] uppercase bg-yellow-aes-yellow flex items-center justify-center mt-3 leading-5"
            >
              contact us
            </button>
          </div>
        </div>
        {/* <Spacer classStyle="h-[5px] lg:h-[10px] gradient-effect" /> */}
      </div>
    </section>
  );
};

export default ContactusSection;
