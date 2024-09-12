import React from "react";
import Image from "next/image";
import Forms from "../UI/Forms";
import Slider from "../UI/Sliders/Slider";

const clipPathContainer = {
  clipPath: "polygon(0 0, 70% 0, 35% 100%, 0 100%)",
  backgroundColor: "black",
};

const HeaderSection = () => {
  return (
    <header className="grid grid-rows-auto-5">
      {/*ROW 1  */}
      <div className="row-start-1 row-end-2">
        {/*IMAGE 1 CONTAINER - MOBILE */}
        <figure className="w-[100vw] h-auto ">
          <Slider />
          <div className="bg-red-700 fill-red-800 h-2"></div>
        </figure>
        {/*END IMAGE CONTAINER  */}
      </div>
      {/* TEXT CONTAINER */}
      <div
        className="font-firaSans 
                  text-xl 
                  text-blue-navy-blue
                  font-bold
                  pt-6
                  pb-6
                  leading-tight 
                  min-h-1.5 p-6 
                  row-start-2 
                  row-end-3
                  justify-self-center"
      >
        <p>Best Prices. Top Brands. Fast Shipping.</p>
        <p>Lets.Grow Our Business Together</p>
      </div>
      <div className="gradient-border-yellow fill-red-800 h-2"></div>
      {/* ROW 3 */}
      <div className="row-start-3 row-end-4 relative">
        <div
          className="grid 
                   grid-rows-auto-2 
                   grid-cols-auto-2
                   justify-items-start
                   content-start"
        >
          {/* IMAGE 2 CONTAINER*/}
          <figure
            className="row-start-1 
                        row-end-3 
                        col-start-1 
                        col-end-3                                                     
                        block                                                                                  
                        background-image"
          >
            <Image
              src="/images/background/Solar-Home-Aerial-Shot.jpg"
              alt="customer chat"
              width={1920}
              height={1080}
              quality={100}
              sizes="(min-width: 1920px) 1920, calc(95.24vw + 14px)"
              style={{ objectFit: "cover" }}
              className="w-[100vw] h-[100%] object-cover"
            />
          </figure>
          {/* END OF IMAGE CONTAINER */}
          <h2
            className="font-firaSans
                     text-purple-purp-aes 
                       text-base pt-4 
                       text-wrap
                       col-start-1
                       cold-end-2
                       row-start-1
                       row-end-2
                       font-black
                       pl-4
                       z-10"
          >
            Experts in Renewable Energy And Storage
          </h2>
          <p
            className="font-muktaVaani 
                      leading-tight 
                      text-left 
                      text-wrap
                      col-start-1
                      col-end-2
                      row-start-1
                      row-end-2
                      mt-[70px]                          
                      pl-4
                      z-10"
          >
            AI Energy Shop is a trusted national wholesaler of PV inverters,
            energy storage solar racking, and other renewable energy and
            electrical products in Australia
          </p>
          <button
            className="bg-blue-900
                     hover:bg-blue-700 
                     text-white 
                       font-bold 
                       font-firaSans
                       w-[120px]
                       h-8
                       mt-3 
                       mb-4                              
                       rounded
                       row-start-2
                       row-end-3
                       col-start-1
                       col-end-2
                       transform 
                       -translate-y-1
                       z-10
                       ml-4"
          >
            About Us
          </button>
        </div>
        <div className="bg-red-700 fill-red-800 h-2"></div>
      </div>
      {/* ROW 4*/}
      <div className="row-span-2 row-start-4 row-end-5 bg-black m-b">
        <div
          className="grid                        
                   grid-cols-manual-2"
        >
          {/* IMAGE 3 CONTAINER  */}
          <figure className="row-start-1 row-end-3 col-start-1 col-end-5 relative">
            <Image
              src="/images/background/AES-Customer-Chat-w-Solplanet.jpg"
              alt="customer chat"
              width={1920}
              height={1080}
              quality={100}
              sizes="(min-width: 1580px) 750px, 48.1vw"
              style={clipPathContainer}
              className="w-[70vw] h-[25vh] object-cover block"
            />
          </figure>
          {/* END OF IMAGE CONTAINER */}
          {/* CONTENT CONTAINER */}
          <div
            className="row-start-1 
                        col-start-2
                        col-end-3 
                        grid
                        justify-items-end                                                                       
                        mt-1"
          >
            <h2
              className="font-firaSans
                     text-yellow-aes-yellow
                       flex 
                       justify-end

                       pt-4                        
                       text-wrap
                       font-bold                       
                                       
                       order-1                           
                       "
            >
              Service Across Australia
            </h2>

            <p
              className="font-muktaVaani 
                      leading-tight 
                      text-left 
                      text-nowrap
                      mt-4  
                      order-2
                      text-white"
            >
              AI Energy Shop is always here
              <br />
              to answer your questions. Serving
              <br />
              customers nationwide. We&apos;re always
            </p>
            <button
              className="bg-yellow-aes-yellow
                     hover:bg-blue-700 
                     text-blue-dark-blue 
                       font-bold 
                       font-firaSans
                       w-[120px]
                       h-8                       
                       justify-end
                       mt-3                                                
                       rounded                       
                                                                                                  
                       order-3"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* END OF INSIDE GRID */}
      </div>
      {/* ROW 5 */}

      {/* NEWSLETTER CONTAINER */}
      <Forms.NewsLetterForm />
    </header>
  );
};

export default HeaderSection;
