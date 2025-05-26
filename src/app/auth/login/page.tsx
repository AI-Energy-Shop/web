import LoginForm from '@/components/forms/LoginForm';
import Image from 'next/image';
import Link from 'next/link';
const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8 h-full w-full">
          <Image
            alt="logo"
            width={100}
            height={200}
            priority
            src="/images/logo/AES-Logo_750px-M.png"
            className="w-auto h-auto object-contain object-center"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login to Your Account
        </h1>
        <LoginForm />
        <div className="flex justify-center mt-5">
          <Link href="/auth/signup" className="font-xs text-center">
            <span className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400 border-b pb-1">
              Don&apos;t have an account? Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
