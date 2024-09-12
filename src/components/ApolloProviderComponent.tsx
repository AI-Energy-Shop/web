"use client";
import { client } from "@/apollo/client";
import { ApolloProvider } from "@apollo/client";
import React from "react";

const ApolloProviderComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
  // return <div></div>;
};

export default ApolloProviderComponent;
