import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '@/app/actions/user';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { useDispatch } from 'react-redux';
import { setMe, setMeAdmin } from '@/store/features/me';
import { setCarts, setWarehouseLocation } from '@/store/features/cart';
import { ProductQuery } from '@/lib/gql/graphql';
import {
  LoginFormData,
  loginResolver,
  RegisterFormData,
  registerResolver,
} from '@/lib/validation-schema/auth-forms';
import { useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: loginResolver,
    defaultValues: {
      email: '',
      password: '',
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
        if (data?.user?.carts) {
          dispatch(
            setCarts([
              ...data?.user?.carts?.map?.((cart) => ({
                documentId: cart?.documentId || '',
                product: cart?.product as ProductQuery['product'],
                quantity: cart?.quantity || 0,
              })),
            ])
          );
        }

        dispatch(
          setWarehouseLocation({
            address: {
              city: data?.user?.warehouse_location?.address?.city || '',
              street1: data?.user?.warehouse_location?.address?.street || '',
              state: data?.user?.warehouse_location?.address?.state_territory || '',
              zipCode: data?.user?.warehouse_location?.address?.postcode || '',
              country: data?.user?.warehouse_location?.address?.country || '',
            },
          })
        );

        const shipAddresses = data?.user.account_detail.shipping_addresses.map((address) => {
          return {
            documentId: address.documentId,
            street1: address.street1,
            street2: address.street2,
            city: address.city,
            state: address.state,
            zipCode: address.zip_code,
            country: address.country,
            isActive: address.isActive,
            phone: address.phone,
          };
        });

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
                middle_name: data?.user?.account_detail?.name?.middle_name || '',
                last_name: data?.user?.account_detail?.name?.last_name || '',
              },
              shipping_addresses: shipAddresses,
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

  const handleRegisterSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { error } = await registerUser(formData);

      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Please check your email for email approval',
        variant: 'default',
      });

      router.push('/auth/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return {
    loginForm,
    registerForm,
    showPassword,
    setShowPassword,
    handleLoginSubmit,
    handleRegisterSubmit,
  };
};

export default useAuth;
