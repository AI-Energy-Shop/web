'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Package2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { loginUserSchema } from '@/lib/validation-schema/login-form';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { loginUser } from '@/app/actions/users';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // TODO(ROI) encapsulate this into a hook
  // *(ROI) this is already working, just continue this what happen when its successful
  const { execute, status } = useAction(loginUser, {
    onError(error) {
      console.log(error);
      toast.error('Your email or password is incorrect.');
    },
  });

  async function onSubmit(values: z.infer<typeof loginUserSchema>) {
    try {
      execute(values);
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Package2 className="h-12 w-12 text-indigo-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login to Your Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Link
                href="#"
                className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={status === 'executing'}
            >
              Sign In
            </Button>
          </form>
        </Form>
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
