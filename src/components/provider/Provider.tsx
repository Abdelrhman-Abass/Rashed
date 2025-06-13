// "use client";
// import React, { Fragment, use, useEffect, useState, useTransition } from "react";
// import Navbar from "../layout/Navbar";
// import Footer from "../layout/Footer";
// import useThemeProvider from "@/store/ThemeProvider";
// import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useParams, usePathname, useRouter } from "next/navigation";
// import { Toaster } from "react-hot-toast";
// // import NewLoader from "../common/newLoader/NewLoader";
// import { useCookies } from "react-cookie";
// import { MotionConfig } from "framer-motion";
// import GeneralScrollTop from "../common/GeneralScrollTop";
// import { ChatProvider } from "@/store/ChatContext";
// // import GeneralPopup from "../common/generalPopup/GeneralPopup";
// export default function Provider({ children }: { children: React.ReactNode }) {
//     // const [cookies] = useCookies(["userData"]);
//     // const pathname = usePathname();
//     // const router = useRouter();
//     // const { theme } = useThemeProvider();
//     const [queryClient] = useState(
//         () =>
//             new QueryClient({
//                 defaultOptions: {
//                     queries: {
//                         refetchOnWindowFocus: false,
//                     },
//                 },
//             }),
//     );
//     const dehydratedState = dehydrate(queryClient);

//     return (
//         <QueryClientProvider client={queryClient}>
//             <ChatProvider>
//                 <HydrationBoundary state={dehydratedState}>
//                     <Fragment>
//                         {/* <Navbar /> */}
//                         <main>
//                             <Toaster position="top-right" reverseOrder={false} />
//                             {children}
//                             {/* <GeneralScrollTop /> */}
//                         </main>
//                     </Fragment>
//                 </HydrationBoundary>
//             </ChatProvider>
//         </QueryClientProvider>
//     );
// }

//-------------------------------------------------------------------------------------------------
// use react-toastify

"use client";
import React, { Fragment, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import useThemeProvider from "@/store/ThemeProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { MotionConfig } from "framer-motion";
import GeneralScrollTop from "../common/GeneralScrollTop";
import { ChatProvider } from "@/store/ChatContext";

// Import react-toastify components and styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Provider({ children }: { children: React.ReactNode }) {
  // const [cookies] = useCookies(["userData"]);
  // const pathname = usePathname();
  // const router = useRouter();
  // const { theme } = useThemeProvider();
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
