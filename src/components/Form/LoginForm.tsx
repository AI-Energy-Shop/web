'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';

const LoginForm = () => {
  const { loginForm, showPassword, setShowPassword, handleLoginSubmit } = useAuth();

  return (
    <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
      <Input placeholder="Enter your email" {...loginForm.register('email')} />

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          {...loginForm.register('password')}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Link href="#" className="text-sm text-indigo-500 hover:text-indigo-600 dark:text-indigo-400">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
