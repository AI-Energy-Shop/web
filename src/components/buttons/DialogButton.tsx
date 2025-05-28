import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DialogButtonProps {
  title: string;
  description: string;
  children: React.ReactNode;
  triggerButtonText: string;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'ghost' | 'link';
  buttonSize: 'default' | 'sm' | 'lg';
}

const DialogButton: React.FC<DialogButtonProps> = ({
  title,
  description,
  children,
  triggerButtonText,
  buttonText,
  buttonVariant,
  buttonSize,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={buttonVariant} size={buttonSize}>
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" size={buttonSize} variant={buttonVariant}>
              {buttonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButton;
