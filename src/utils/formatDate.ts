export function formatDate(date: Date): string {
  const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const dayOfWeek: string = daysOfWeek[date.getDay()]; // Get abbreviated day name
  const day: string = String(date.getDate()).padStart(2, '0'); // Zero-padded day
  const month: string = months[date.getMonth()]; // Get abbreviated month name
  const year: number = date.getFullYear(); // Get full year

  return `${dayOfWeek}, ${day} ${month} ${year}`;
}
