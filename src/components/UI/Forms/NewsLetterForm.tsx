import React from "react";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "./InputGroup";
import { subscribeToNews } from "@/app/actions/mail";

interface NewsLetterFormProps {}

const NewsLetterForm: React.FC<NewsLetterFormProps> = (props) => {
  return (
    <div className="w-full h-auto rounded-xl overflow-hidden">
      <div className="w-full h-[80px] flex items-center bg-gradient-to-b from-[#f9ac0a] to-[#f06039]">
        <div className="left w-[50%] md:lg:w-[40%] pl-5">
          <h1 className="font-bold">Newsletter Sign Up</h1>
          <p className="font-semibold text-xs">
            Keep up to date with our latest news and offers
          </p>
        </div>
        <div
          style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 5% 100%)" }}
          className="
            // right w-[54%] h-full clip-path-left-25
            // md:lg:w-[60%] md:clip-path-polygon10
          "
        >
          <div className="w-full h-full relative overflow-hidden">
            <Image
              width={1000}
              height={1000}
              alt="keyboard-typing"
              src="/images/keyboard-typing-closeup.jpg"
              className="w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] object-cover"
            />
          </div>
        </div>
      </div>
      <form
        action={subscribeToNews}
        className="flex flex-col gap-5 bg-black px-5 py-4"
      >
        <div className="inputs-container grid gap-5 grid-cols-4 md:p-10">
          <div className="col-span-2">
            <InputGroup name="name" label="Name" inputType="TEXT" />
          </div>
          <div className="col-span-2">
            <InputGroup name="company" label="Company" inputType="TEXT" />
          </div>
          <div className="col-span-4 md:col-start-2 md:col-span-2">
            <InputGroup name="email" label="E-mail" inputType="TEXT" />
          </div>
        </div>

        <p className="text-white text-xs text-center italic">
          By registering for our newsletter, you agree to recieve email from us
          and to our{" "}
          <Link href="" className=" underline">
            privacy policy
          </Link>
          .
        </p>
        <button className="min-w-[50%] m-auto font-bold py-1 px-5 bg-yellow-aes-yellow rounded-sm overflow-hidden">
          Register Now
        </button>
      </form>
    </div>
  );
};

export default NewsLetterForm;
