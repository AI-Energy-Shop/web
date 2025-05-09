type PickupSlot = {
  id: number;
  value: string;
  date: Date;
};

export function getPickUpOptionsBestTimeSlots(
  currentTime: Date,
  slots: PickupSlot[]
): string {
  const nextSlot = slots.find((slot) => currentTime <= slot.date);
  return nextSlot?.value || slots[slots.length - 1].value;
}
