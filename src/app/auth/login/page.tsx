import { loginUser } from '@/app/actions/users';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={loginUser} className="space-y-6">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <Button className="w-full" type="submit" variant="default">
            Login
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          No account yet?{' '}
          <Link
            href="/auth/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
