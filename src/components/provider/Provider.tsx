"use client";
import React, { Fragment, useState } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ChatProvider } from "@/store/ChatContext";

// Import react-toastify components and styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ChatProvider>
        <HydrationBoundary state={dehydratedState}>
          <Fragment>
            {/* <Navbar /> */}
            <main>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" // or "light"
              />
              {children}
              {/* <GeneralScrollTop /> */}
            </main>
          </Fragment>
        </HydrationBoundary>
      </ChatProvider>
    </QueryClientProvider>
  );
}
