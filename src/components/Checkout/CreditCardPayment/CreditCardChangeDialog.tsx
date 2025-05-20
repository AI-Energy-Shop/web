import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SelectDefaultTab from './SelectDefaultTab';
import CardCollectionForm from './CardCollectionForm';
import { GetCheckoutUserDataQuery } from '@/lib/gql/graphql';

interface CreditCardChangeDialogProps {
  creditCardDialog: boolean;
  setCreditCardDialog: React.Dispatch<React.SetStateAction<boolean>>;
  checkoutUserData: GetCheckoutUserDataQuery;
}

const CreditCardChangeDialog = ({
  creditCardDialog,
  setCreditCardDialog,
  checkoutUserData,
}: CreditCardChangeDialogProps) => {
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
              <SelectDefaultTab checkoutUserData={checkoutUserData} />
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
