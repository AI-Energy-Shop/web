import SignupForm from '@/components/forms/signup-form';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
const SignupPage = () => {
  const cookie = cookies();
  const token = cookie.get('a-token')?.value;
  const user = cookie.get('a-user')?.value;

  if (token && user) {
    return redirect('/');
  }

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
