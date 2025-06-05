'use client';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { setMe, setMeAdmin } from '@/store/features/me';
import { setCarts } from '@/store/features/cart';
import { useState } from 'react';
import { ProductQuery } from '@/lib/gql/graphql';
import {
  removePersistence,
  updatePersistence,
  useAppDispatch,
} from '@/store/store';
import {
  LoginFormData,
  loginResolver,
  RegisterFormData,
  registerResolver,
} from '@/lib/validation-schema/auth-forms';
import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';

const HAS_BACKEND_ACCESS = ['ADMIN', 'SALES'];

const useAuth = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: loginResolver,
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: registerResolver,
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      businessNumber: '',
      businessType: '',
      phone: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Australia',
    },
  });

  const handleLoginSubmit = async (loginData: LoginFormData) => {
    const { error, data } = await loginUser(loginData);

    const roleName = data?.user.role?.name;
    if (error) {
      const { message } = error;
      if (message.includes('Forbidden')) {
        loginForm.setError('root', {
          message: 'Please wait for account approval',
        });
      } else {
        loginForm.setError('root', { message: message });
      }

      return;
    }

    if (!roleName) {
      toast({
        title: 'Please for the sales to approve your account',
        variant: 'destructive',
      });
      return;
    }

    switch (roleName) {
      case 'ADMIN':
        dispatch(
          setMeAdmin({
            id: data?.user?.documentId || '',
            email: data?.user?.email || '',
            username: data?.user?.username || '',
            blocked: data?.user?.blocked || false,
            confirmed: data?.user?.confirmed || undefined,
            phone: data?.user?.phone || '',
            role: roleName || '',
          })
        );
        break;

      case 'SALES':
        dispatch(
          setMeAdmin({
            id: data?.user?.documentId || '',
            email: data?.user?.email || '',
            username: data?.user?.username || '',
            blocked: data?.user?.blocked || false,
            confirmed: data?.user?.confirmed || undefined,
            phone: data?.user?.phone || '',
            role: roleName || '',
          })
        );
        break;

      case 'CUSTOMER':
        const defaultWarehouse = WAREHOUSE_LOCATIONS?.at(0);
        const shipAddresses = data?.user.account_detail?.shipping_addresses;
        const selectedWarehouse = data.user.warehouseLocation?.address
          ? { ...data.user.warehouseLocation }
          : { ...defaultWarehouse };

        dispatch(
          setMe({
            id: data?.user?.documentId || '',
            email: data?.user?.email || '',
            username: data?.user?.username || '',
            blocked: data?.user?.blocked || false,
            confirmed: data?.user?.confirmed || undefined,
            business_name: data?.user?.business_name || '',
            business_number: data?.user?.business_number || '',
            business_type: data?.user?.business_type || '',
            phone: data?.user?.phone || '',
            account_detail: {
              level: data?.user?.user_level || '',
              name: data?.user?.account_detail?.name,
              shipping_addresses: [...shipAddresses],
              warehouseLocation: { ...selectedWarehouse },
            },
          })
        );

        if (data?.user?.carts) {
          dispatch(
            setCarts([
              ...data?.user?.carts?.map?.((cart: any) => ({
                documentId: cart?.documentId || '',
                quantity: cart?.quantity || 0,
                product: cart?.product as ProductQuery['product'],
              })),
            ])
          );
        }

        break;
      default:
        break;
    }

    await updatePersistence(loginData.remember || false);

    // Handle navigation based on role
    const route = HAS_BACKEND_ACCESS.includes(roleName)
      ? '/admin'
      : '/collections/all';

    // Use replace instead of push for more reliable navigation
    router.replace(route);

    // Fallback navigation if replace doesn't work
    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        window.location.href = route;
      }, 100);
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { error } = await registerUser(formData);

      if (error) {
        return;
      }

      router.push('/auth/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogout = () => {
    removePersistence();
  };

  return {
    loginForm,
    registerForm,
    showPassword,
    setShowPassword,
    handleLoginSubmit,
    handleRegisterSubmit,
    handleLogout,
  };
};

export default useAuth;
