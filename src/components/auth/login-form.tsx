'use client';
import React, { useState, useActionState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/app/actions/user';
import { redirect } from 'next/navigation';

const LoginForm = () => {
  const form = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, pending] = useActionState(loginUser, {
    error: '',
		message: '',
  });

  if (state.message) {
    redirect('/products');
  }



  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...field}
                    value={field.value ?? ''}
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
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        {state.message && <p className="text-red-500">{state.message}</p>}
      </form>
    </Form>
  );
};

export default LoginForm;
