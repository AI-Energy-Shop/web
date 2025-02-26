import LoginForm from '@/components/Form/login-form';
import { Package2 } from 'lucide-react';
import Link from 'next/link';
const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Package2 className="h-12 w-12 text-indigo-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login to Your Account
        </h1>
        {/* <LoginForm /> */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
