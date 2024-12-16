import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const arrayIsEqual = (a?: any[], b?: any[]) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const objectIsEqual = (a: object, b: object) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
