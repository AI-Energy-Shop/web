import { Inter, Fira_Sans, Mukta_Vaani, Days_One } from 'next/font/google'; // Corrected import

// Corrected import and usage according to Next.js documentation
export const firaSansFont = Fira_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const muktaVaani = Mukta_Vaani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const daysOne = Days_One({
  subsets: ['latin'],
  weight: ['400'],
});
