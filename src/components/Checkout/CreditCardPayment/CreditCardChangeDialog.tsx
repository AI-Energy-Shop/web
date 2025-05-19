import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SelectDefaultTab from './SelectDefaultTab';
import { useState } from 'react';
import CardCollectionForm from './CardCollectionForm';

interface CreditCardChangeDialogProps {
  creditCardDialog: boolean;
  setCreditCardDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreditCardChangeDialog = ({
  creditCardDialog,
  setCreditCardDialog,
}: CreditCardChangeDialogProps) => {
  const [cards, setCards] = useState([
    {
      id: 'card_1',
      brand: 'visa',
      last4Char: '4242',
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: 'card_2',
      brand: 'mastercard',
      last4Char: '5678',
      expMonth: 8,
      expYear: 2026,
      isDefault: false,
    },
    {
      id: 'card_3',
      brand: 'amex',
      last4Char: '9012',
      expMonth: 3,
      expYear: 2024,
      isDefault: false,
    },
  ]);

  return (
    <Dialog open={creditCardDialog} onOpenChange={setCreditCardDialog}>
      <DialogContent className="h-4/6 overflow-y-auto block space-y-6">
        <DialogHeader>
          <DialogTitle>Your Payment Method</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Tabs defaultValue="select">
            <TabsList className="w-full">
              <TabsTrigger value="select" className="w-full">
                Select Default
              </TabsTrigger>
              <TabsTrigger value="add" className="w-full">
                Add New Card
              </TabsTrigger>
            </TabsList>
            <TabsContent value="select">
              <div className="border border-black rounded-lg p-2">
                <div className="flex items-center gap-x-2">
                  <h1 className="font-semibold text-base">One-Time Payment</h1>
                  <span className="text-sm text-gray-500">
                    (Card details not stored)
                  </span>
                </div>
                <CardCollectionForm />
              </div>
              <SelectDefaultTab cards={cards} />
            </TabsContent>
            <TabsContent value="add">
              <CardCollectionForm />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditCardChangeDialog;
