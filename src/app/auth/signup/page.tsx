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
import { RegisterUserSchema } from '@/api-types/user';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

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
  });

  async function onSubmit(values: z.infer<typeof RegisterUserSchema>) {
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
                      <Input placeholder="john_doe" {...field} />
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
                  I agree to the
                  <Link
                    href="#"
                    className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
                  >
                    Terms of Service
                  </Link>
                  and
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
            href="#"
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

// 'use client';
// import { registerUser } from '@/app/actions/users';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import React from 'react';
// import { useFormState } from 'react-dom';

// const SignupPage = () => {
//   const [state, formAction] = useFormState(registerUser, {
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   return (
//     <main className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           Register your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form action={formAction} className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 autoComplete="email"
//                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Username
//               </label>
//             </div>
//             <div className="mt-2">
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 autoComplete="current-password"
//                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Password
//             </label>
//             <div className="mt-2">
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 autoComplete="password"
//                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="repassword"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Confirm Password
//             </label>
//             <div className="mt-2">
//               <input
//                 id="repassword"
//                 name="repassword"
//                 type="password"
//                 required
//                 autoComplete="repassword"
//                 className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>

//           <Button className="w-full" type="submit" variant="default">
//             Login
//           </Button>
//         </form>
//         <p className="mt-10 text-center text-sm text-gray-500">
//           Already have an account?{' '}
//           <Link
//             href="/auth/login"
//             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// };

// export default SignupPage;
