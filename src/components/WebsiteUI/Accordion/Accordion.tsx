"use client";

import React, { useState } from "react";
import { AccordionData } from "@/libs/types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { firaSansFont } from "@/assets/fonts/fonts";

interface AccordionProps {
  data: AccordionData[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [open, setOpen] = useState<null | number>(null);

  return (
    <div className="md:grid md:grid-cols-2 md:col-span-5 lg:col-span-3 lg:gap-6 lg:gap-x-9 lg:ml-4s ">
      {data.map((item: any) => (
        <div
          className="w-ful justify-center border-b-2 md:border-none items-center mb-4 last:mb-0"
          key={item.id}
        >
          {/* BUTTON */}
          <button
            style={firaSansFont.style}
            className="w-full text-left text-white text-md font-bold md:text-nowrap md:cursor-auto focus:outline-none p-4 md:py-1 md:border-none flex justify-between items-center"
            onClick={() => setOpen(item.id === open ? null : item.id)}
          >
            {item.title}
            <span className="md:hidden">
              {open === item.id ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>

          {/* CONTENT */}
          <div
            className={`w-full h-0 overflow-hidden ease-in-out duration-300 bg-white ${
              open === item.id && "h-auto"
            } md:h-auto md:bg-transparent`}
          >
            {item.content.map((content: string, index: number) => (
              <p
                key={index}
                className="p-4 bg-white md:bg-transparent md:text-white py-2 flex border-b2 text-nowrap"
              >
                {content}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
