import './globals.css';
import 'react-multi-carousel/lib/styles.css';
import React from 'react';
import Components from '@/components';
import { ApolloWrapper } from '@/apollo/provider';
import { firaSansFont } from '@/assets/fonts/fonts';
import { Toaster } from '@/components/ui/sonner';
import StripeWrapper from '@/components/stripe-wrapper';
import { Toaster as ToasterUI } from '@/components/ui/toaster';
import NavigationWrapper from '@/components/navigation-wrapper';

// import StripeWrapper from '@/components/stripe-wrapper';
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaSansFont.className}>
      <body className="w-full h-full">
        <ApolloWrapper>
          <Components.ReduxProvider>
            {/* TODO: Roi add env variable for stripe */}
            <StripeWrapper>
              <NavigationWrapper>{children}</NavigationWrapper>
            </StripeWrapper>
          </Components.ReduxProvider>
          <Toaster />
          <ToasterUI />
        </ApolloWrapper>
      </body>
    </html>
  );
}
