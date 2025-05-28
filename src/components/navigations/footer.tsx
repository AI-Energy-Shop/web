'use client';
import React from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import Accordion from '../custom-ui/Accordion/Accordion';
import { FOOTER_ACCORDION_DATA } from '@/constant';
import { firaSansFont, muktaVaani } from '@/assets/fonts/fonts';
import { usePathname } from 'next/navigation';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/admin')) return null;

  return (
    <footer className="w-full h-auto bg-gradient-to-b from-orange-400 to-orange-700 ">
      <div className="inner-container max-w-[1200px] mx-auto pb-10 md:pt-10">
        <div className="upper-container w-full md:flex">
          {/* ACCORDION */}
          <div className="w-full md:w-[33.3%] lg:w-[33.3%]">
            <Accordion data={FOOTER_ACCORDION_DATA} />
          </div>
          {/* ADDRESS */}
          <div className="w-full md:w-[36.6%] lg:w-[36.6%] hidden md:block text-center text-white">
            <h3
              className={`${firaSansFont.className} text-center text-md font-bold mb-5`}
            >
              Locations
            </h3>
            <address
              className={`${muktaVaani.className} flex flex-col p-5 md:p-0 gap-4 lg:gap-5 text-[16px] leading-3`}
            >
              <div>
                <span className="font-bold">Melbourne:</span> 34/49 McArthurs
                Rd, Altona North VIC 3025
              </div>
              <div>
                <span className="font-bold">Sydney:</span> 24/32-38 Belmore
                Road, Punchbowl NSW 2196
              </div>
              <div>
                <span className="font-bold">Brisbane:</span> 3/22 Spine St,
                Sumner QLD 4074
              </div>
            </address>
          </div>

          <div className="w-full md:w-[30%] lg:w-[30%] h-auto flex flex-col gap-5 my-5 md:m-0">
            <p
              className={`${firaSansFont.className} text-center font-bold text-white`}
            >
              Follow AI Energy Shop
            </p>
            {/*END OF TEXT  */}
            <span className="flex justify-center items-center gap-9 text-white">
              <FaLinkedin size={30} />
              <FaFacebook size={30} />
              <HiOutlineMailOpen size={30} />
            </span>
          </div>
        </div>

        {/* PRIVACY | POLICY */}
        <div className="w-full text-white flex items-center justify-center flex-col md:flex-row md:gap-2 text-sm">
          <p>© 2024 AI Energy Shop</p>
          <div className="h-3 w-[2px] bg-white hidden md:block" />
          <div className="flex items-center justify-center gap-2">
            <p>Terms & Conditions</p>
            <div className="h-3 w-[2px] bg-white" />
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
