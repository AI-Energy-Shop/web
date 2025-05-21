'use client';
import SignupForm from '@/components/forms/SignupForm';
import Image from 'next/image';
const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-[1000px]">
        <div className="flex justify-center mb-8 h-full w-full">
          <Image
            alt="logo"
            width={100}
            height={200}
            loading="lazy"
            src="/images/logo/AES-Logo_750px-M.png"
            className="w-auto h-auto object-contain object-center"
          />
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
