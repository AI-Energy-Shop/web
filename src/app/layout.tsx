import './globals.css';
import React from 'react';
import { ApolloWrapper } from '@/apollo/provider';
import { firaSansFont } from '@/assets/fonts/fonts';
import { Toaster } from '@/components/ui/sonner';
// Assuming Metadata type needs to be defined or imported.
// If Metadata is a custom type, it should be imported from its definition file.
// Here, I'm defining it locally for demonstration.
interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: 'AI Energy Shop',
  description: 'Australian Solar WholeSalers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaSansFont.className}>
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
        <Toaster />
      </body>
    </html>
  );
}
