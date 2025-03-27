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
import { setMe, setMeAdmin, setToken } from '@/store/features/me';
import { setCarts, setWarehouseLocation } from '@/store/features/cart';

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

  const handleSubmit = async (loginData: LoginFormData) => {
    const { error, data } = await loginUser(loginData);

    if (error) {
      toast({
        title: error.replace('identifier', 'email'),
        variant: 'destructive',
      });
      return;
    }

    const roleName = data?.user.role?.name;

    if (!roleName) {
      toast({
        title: 'Please for the sales to approve your account',
        variant: 'destructive',
      });
      return;
    }

    switch (roleName) {
      case 'SALES':
        dispatch(
          setMeAdmin({
            id: data?.user?.documentId || '',
            email: data?.user?.email || '',
            username: data?.user?.username,
            confirmed: data?.user?.confirmed || null,
          })
        );
        break;
      case 'ADMIN':
        dispatch(
          setMeAdmin({
            id: data?.user?.documentId || '',
            email: data?.user?.email || '',
            username: data?.user?.username,
            confirmed: data?.user?.confirmed || null,
          })
        );
        break;
      case 'CUSTOMER':
        dispatch(
          setWarehouseLocation({
            address: {
              city: data?.user?.warehouse_location?.address?.city || '',
              street1: data?.user?.warehouse_location?.address?.street || '',
              state:
                data?.user?.warehouse_location?.address?.state_territory || '',
              zipCode: data?.user?.warehouse_location?.address?.postcode || '',
              country: data?.user?.warehouse_location?.address?.country || '',
            },
          })
        );

        if (data && data?.user && data?.user?.carts) {
          const cartsData = data.user.carts.map((cart) => ({
            documentId: cart?.documentId || '',
            item: {
              productID: cart?.item?.productID || '',
              name: cart?.item?.title || '',
              model: cart?.item?.model || '',
              image: cart?.item?.image || '',
              price: cart?.item?.price || 0,
              quantity: cart?.item?.quantity || 0,
              odoo_product_id: cart?.item?.odoo_product_id || '',
            },
          }));
          dispatch(setCarts([...cartsData]));
        }

        dispatch(
          setMe({
            id: data?.user?.documentId || '',
            email: data?.user?.email || '',
            username: data?.user?.username || '',
            blocked: data?.user?.blocked || false,
            confirmed: data?.user?.confirmed || null,
            business_name: data?.user?.business_name || '',
            business_number: data?.user?.business_number || '',
            business_type: data?.user?.business_type || '',
            phone: data?.user?.phone || '',
            account_detail: {
              level: data?.user?.user_level || '',
              name: {
                first_name: data?.user?.account_detail?.name?.first_name || '',
                middle_name:
                  data?.user?.account_detail?.name?.middle_name || '',
                last_name: data?.user?.account_detail?.name?.last_name || '',
              },
              shipping_addresses:
                data?.user.account_detail.shipping_addresses.map((address) => {
                  return {
                    id: address.id,
                    street1: address.street1,
                    street2: address.street2,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zip_code,
                    country: address.country,
                    isActive: address.isActive,
                    phone: address.phone,
                  };
                }),
            },
          })
        );
        break;
      default:
        toast({
          title: 'Please for the sales to approve your account',
          variant: 'destructive',
        });
        break;
    }

    dispatch(setToken(data?.token || ''));
    // Handle navigation based on role
    const route = roleName === 'SALES' ? '/admin' : '/products';

    // Use replace instead of push for more reliable navigation
    router.replace(route);

    // Fallback navigation if replace doesn't work
    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        window.location.href = route;
      }, 100);
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
