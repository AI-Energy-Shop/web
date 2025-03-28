import React, { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { registerUser } from '@/app/actions/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { registerUserSchema } from '@/lib/validation-schema/register-form';
import { useRouter } from 'next/navigation';
interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
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

  const handleSubmit = async (data: z.infer<typeof registerUserSchema>) => {
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

  const renderBottomContent = () => {
    return (
      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 font-medium"
        >
          Sign in
        </Link>
      </p>
    );
  };

  const renderTextField = ({
    name,
    label,
    required = true,
  }: {
    name: keyof z.infer<typeof registerUserSchema>;
    label: string;
    required?: boolean;
  }) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {label}
              {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <>
      {/* <Dialogs.Registration
        open={showModal}
        onOpenChange={() => setShowModal(false)}
        userData={userDetails}
        execute={execute}
      /> */}
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {renderTextField({ name: 'username', label: 'Username' })}
                {renderTextField({ name: 'email', label: 'Email' })}
              </div>
              <div className="grid grid-cols-2 gap-2">
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
              </div>
              <div className="grid grid-cols-3 gap-2">
                {renderTextField({
                  name: 'businessName',
                  label: 'Business Name',
                })}
                {renderTextField({
                  name: 'businessNumber',
                  label: 'Business Number',
                })}
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Are you Installer or Retailer? " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={'installer'}>Installer</SelectItem>
                          <SelectItem value={'retailer'}>Retailer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {renderTextField({ name: 'phone', label: 'Contact Number' })}
                {renderTextField({ name: 'street1', label: 'Street1' })}
                {renderTextField({ name: 'street2', label: 'Street2' })}
                {renderTextField({ name: 'city', label: 'City' })}
                {renderTextField({ name: 'state', label: 'State' })}
                {renderTextField({ name: 'zipCode', label: 'Zip Code' })}
                {renderTextField({
                  name: 'country',
                  label: 'Country',
                  required: false,
                })}
              </div>

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
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
        </Form>

        {renderBottomContent()}
      </div>
    </>
  );
};

export default SignupForm;
