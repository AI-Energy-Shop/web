import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CreditCardChangeDialogProps {
  creditCardDialog: boolean;
  setCreditCardDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCardChangeDialog = ({
  creditCardDialog,
  setCreditCardDialog,
}: CreditCardChangeDialogProps) => {
  return (
    <Dialog open={creditCardDialog} onOpenChange={setCreditCardDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Saved Card</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditCardChangeDialog;
