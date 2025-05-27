import LoginForm from '@/components/forms/login-form';
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const cookie = (await cookies()) as unknown as UnsafeUnwrappedCookies;
  const token = cookie.get('a-token')?.value;
  const user = cookie.get('a-user')?.value;

  if (token && user) {
    return redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
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
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Login to Your Account
        </h1>
        <LoginForm />
        <div className="flex justify-center mt-5">
          <Link href="/auth/signup" className="font-xs text-center">
            <span className="mt-6 text-center text-xs text-gray-600 border-b pb-1">
              Don&apos;t have an account? Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
