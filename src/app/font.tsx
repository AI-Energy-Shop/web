import { Fira_Sans, Mukta_Vaani } from 'next/font/google';

export const firaSans = Fira_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--fira-Sans',
  adjustFontFallback: false,
});

export const muktaVaani = Mukta_Vaani({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--mukta-Vaani',
  adjustFontFallback: false,
});
