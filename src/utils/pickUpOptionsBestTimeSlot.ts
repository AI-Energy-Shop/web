type PickupSlot = {
  id: number;
  value: string;
  date: Date;
};

export function getPickUpOptionsBestTimeSlots(
  currentTimeInString: string,
  slots: PickupSlot[]
): string {
  const currentTime = new Date(currentTimeInString);

  const nextSlot = slots.find((slot) => currentTime <= slot.date);
  return nextSlot?.value || slots[slots.length - 1].value;
}
