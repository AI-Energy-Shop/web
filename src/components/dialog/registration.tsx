import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { registerUserSchema } from '@/lib/validation-schema/register-form';
import { z } from 'zod';

type RegistrationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: z.infer<typeof registerUserSchema> | undefined;
  execute: (values: z.infer<typeof registerUserSchema>) => void;
};

function RegistrationDialog({
  open,
  onOpenChange,
  userData,
  execute,
}: RegistrationDialogProps) {
  const handleConfirm = () => {
    execute(userData!);
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Your Information</DialogTitle>
          <DialogDescription>
            Please review your details below. If you need to make any changes,
            close this dialog and edit your information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium text-gray-500">First Name</p>
            <p className="col-span-2 text-sm text-gray-700">
              {/* {userData?.firstName} */}
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium text-gray-500">Middle Name</p>
            <p className="col-span-2 text-sm text-gray-700">
              {/* {userData?.middleName} */}
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium text-gray-500">Last Name</p>
            <p className="col-span-2 text-sm text-gray-700">
              {/* {userData?.lastName} */}
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium text-gray-500">User Name</p>
            <p className="col-span-2 text-sm text-gray-700">
              {userData?.username}
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="col-span-2 text-sm text-gray-700">
              {userData?.email}
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium text-gray-500">User Type</p>
            <p className="col-span-2 text-sm text-gray-700">
              {userData?.userType}
            </p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-sm font-medium text-gray-500">ABN</p>
            <p className="col-span-2 text-sm text-gray-700">
              {userData?.businessName}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Edit Information
          </Button>
          <Button onClick={handleConfirm}>Confirm and Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RegistrationDialog;
