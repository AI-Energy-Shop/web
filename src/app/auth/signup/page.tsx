'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Package2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { registerUser } from '@/app/actions/users';
import { useAction } from 'next-safe-action/hooks';
import { registerUserSchema } from '@/lib/schema/register-form';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  // TODO encapsulate this into a hook
  const { execute, status } = useAction(registerUser, {
    onSuccess(result) {
      const emailError = result.data?.error.email;
      const usernameError = result.data?.error.username;

      if (emailError) {
        form.setError('email', {
          type: 'custom',
          message: emailError,
        });
      }

      if (usernameError) {
        form.setError('username', {
          type: 'custom',
          message: usernameError,
        });
      }

      if (!emailError && !usernameError) {
        form.reset();
      }
    },
    onError(error) {
      console.log(error);
      toast.error('Something went wrong. Please try again later.');
    },
  });

  async function onSubmit(values: z.infer<typeof registerUserSchema>) {
    try {
      if (values.confirmPassword !== values.password) {
        form.setError('confirmPassword', {
          type: 'custom',
          message: 'Password do not match',
        });
      }
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
          Create Your Account
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@gmail.com" {...field} />
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
                          {...field}
                          type={showPassword ? 'text' : 'password'}
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        >
                          {showConfirmPassword ? (
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
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <Link
                    href="#"
                    className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
                  >
                    Terms of Service{' '}
                  </Link>
                  and{' '}
                  <Link
                    href="#"
                    className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button
                disabled={status === 'executing'}
                type="submit"
                className="w-full"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link
            href="/auth/login"
            className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
