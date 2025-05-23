export function formatDateTime(date: Date) {
  const pad = (num: number) => num.toString().padStart(2, '0');

  const month = pad(date.getMonth() + 1); // months are zero-indexed
  const day = pad(date.getDate());
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = pad(date.getMinutes());

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const hourStr = pad(hours);

  return `${month}/${day}/${year} ${hourStr}:${minutes} ${ampm}`;
}
