import "./globals.css";
import React from "react";
import Components from "@/components";
import { firaSansFont, muktaVaani } from "@/assets/fonts/fonts";

// Assuming Metadata type needs to be defined or imported.
// If Metadata is a custom type, it should be imported from its definition file.
// Here, I'm defining it locally for demonstration.
interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "AI Energy Shop",
  description: "Australian Solar WholeSalers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaSansFont.className} ${muktaVaani.className}`}
    >
      <body>
        <Components.ApolloProviderComponent>
          <Components.NavigationBar />
          <div className="h-[calc(100vh - 6rem)]">{children}</div>
          <Components.Footer />
        </Components.ApolloProviderComponent>
      </body>
    </html>
  );
}
