"use client";

import React, {  PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/trpc/client";
import { httpBatchLink } from "@trpc/client";

const Providers = ({ children } : PropsWithChildren ) => {
  const [queryClient] = useState(() => new QueryClient()); //his is the query client

  //this is the trpc client is used to make requests to the server
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`, //this is the url of the server
          fetch(url, options) {
            //this is a function that returns a fetch request
            return fetch(url, {
              ...options, //here we are spreading the options object
              credentials: "include", //this is to include the cookies
            });
          },
        }),
      ],
    })
  );

  return (
    // here we are wrapping the children with the trpc provider and the query client provider
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}
    >
      {/* here we are wrapping the children with the query client provider */}
      <QueryClientProvider
        client={queryClient}
      >
        { children }
      </QueryClientProvider>
    </trpc.Provider>
  )
};

export default Providers;
