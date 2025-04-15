export const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isButtonClickable = (pickUpDate: Date, setDate: Date) => {
  if (isSameDay(pickUpDate, setDate)) {
    const todayTime = new Date().getHours();

    return todayTime <= setDate.getHours();
  }

  return setDate.getTime() < pickUpDate.getTime();
};
