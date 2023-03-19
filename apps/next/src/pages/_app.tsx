import "../styles/globals.css";
import type { AppType } from "next/app";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Authentication Playground</title>
      <meta name="description" content="Authentication Playground" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ClerkProvider {...pageProps} appearance={{ baseTheme: dark }}>
      <MantineProvider
        withNormalizeCSS
        withCSSVariables
        theme={{ colorScheme: "dark" }}
      >
        <Notifications limit={5} />

        <Component {...pageProps} />
      </MantineProvider>
    </ClerkProvider>
  </>
);

export default api.withTRPC(MyApp);
