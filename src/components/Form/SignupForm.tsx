import React from 'react';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
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
import useAuth from '@/hooks/useAuth';
import { RegisterFormData } from '@/lib/validation-schema/auth-forms';
interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const { showPassword, registerForm, handleRegisterSubmit, setShowPassword } =
    useAuth();

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
    name: keyof RegisterFormData;
    label: string;
    required?: boolean;
  }) => {
    return (
      <FormField
        control={registerForm.control}
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
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {renderTextField({ name: 'username', label: 'Username' })}
                {renderTextField({ name: 'email', label: 'Email' })}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={registerForm.control}
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
                  control={registerForm.control}
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
                  control={registerForm.control}
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
