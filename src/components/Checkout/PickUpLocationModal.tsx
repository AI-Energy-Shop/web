'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { WAREHOUSE_LOCATIONS } from '@/constant/shipping';
import { useCheckoutDispatch, useCheckoutSelector } from '@/hooks/useCheckout';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { setPickupDetails } from '@/store/features/checkout';

interface PickUpLocationModal {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PickUpLocationModal({
  isModalOpen,
  setIsModalOpen,
}: PickUpLocationModal) {
  const changePickUpDetailsDispatch = useCheckoutDispatch();
  const currentPickUpLocation = useCheckoutSelector(
    (state) => state.checkout.pickupDetails
  );

  const handleOnValueChage = (id: string) => {
    const newPickUpLocation = WAREHOUSE_LOCATIONS.find(
      (warehouse) => warehouse.id.toString() === id
    );
    changePickUpDetailsDispatch(setPickupDetails(newPickUpLocation!));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Select Pick Up Location</DialogTitle>
          <DialogDescription></DialogDescription>
          <div>
            <RadioGroup
              value={String(currentPickUpLocation?.id)}
              onValueChange={handleOnValueChage}
              className="space-y-4"
            >
              {WAREHOUSE_LOCATIONS.map((item) => {
                return (
                  <div key={item.id} className="flex items-center space-x-4">
                    <RadioGroupItem value={`${item.id}`} id={`${item.id}`} />
                    <Label htmlFor={`${item.id}`}>{item.title}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PickUpLocationModal;
