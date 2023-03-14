import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => (
  <ClerkProvider {...pageProps} appearance={{ baseTheme: dark }}>
    <Component {...pageProps} />
  </ClerkProvider>
);

export default api.withTRPC(MyApp);
