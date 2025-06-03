import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RemoveItemModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  message: string;
}

const RemoveItemModal: React.FC<RemoveItemModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  message,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{message}</div>
        <DialogFooter>
          <div className="flex flex-col gap-y-2 sm:block sm:space-x-4">
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onConfirm}>
              Remove
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveItemModal;
