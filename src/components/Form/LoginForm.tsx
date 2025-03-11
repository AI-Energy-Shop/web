'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginUser } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useDispatch } from 'react-redux';
import { setMe, setToken } from '@/store/features/me';
import { setWarehouseLocation } from '@/store/features/cart';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const form = useForm<LoginFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (data: LoginFormData) => {
    const { success, error, data: userData } = await loginUser(data);
    if (success) {
      dispatch(
        setMe({
          id: userData?.user?.id || '',
          email: userData?.user?.email || '',
          username: userData?.user?.username || '',
          blocked: userData?.user?.blocked || false,
          confirmed: userData?.user?.confirmed || null,
          shipping_addresses: userData?.user.shipping_addresses || [],
          name: {
            first_name: userData?.user?.account_detail?.name?.first_name || '',
            middle_name:
              userData?.user?.account_detail?.name?.middle_name || '',
            last_name: userData?.user?.account_detail?.name?.last_name || '',
          },
          // account_detail: {
          //   user_level: userData?.user?.account_detail?.user_level || '',
          //   business_name: userData?.user?.account_detail?.business_name || '',
          // },
        })
      );

      dispatch(
        setWarehouseLocation({
          address: {
            city: userData?.user?.warehouse_location?.address?.city || '',
            street: userData?.user?.warehouse_location?.address?.street || '',
            suburb: userData?.user?.warehouse_location?.address?.suburb || '',
            state_territory:
              userData?.user?.warehouse_location?.address?.state_territory ||
              '',
            postcode:
              userData?.user?.warehouse_location?.address?.postcode || '',
            country: userData?.user?.warehouse_location?.address?.country || '',
          },
        })
      );

      dispatch(setToken(userData?.token || ''));

      switch (userData?.user.role?.name) {
        case 'SALES':
          router.push('/admin');
          break;
        default:
          router.push('/products');
          break;
      }
    } else {
      toast({
        title: error,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <Input placeholder="Enter your email" {...form.register('email')} />

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          {...form.register('password')}
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
    </form>
  );
};

export default LoginForm;
