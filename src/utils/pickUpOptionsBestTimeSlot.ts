type PickupSlot = {
  id: number;
  value: string;
  date: Date;
};

export function getPickUpOptionsBestTimeSlots(
  currentTime: Date,
  slots: PickupSlot[]
) {
  const nextSlot = slots.find((slot) => currentTime < slot.date);
  return nextSlot?.value || '';
}
