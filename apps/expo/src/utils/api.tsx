import React, { useState, type ReactNode } from "react";
import Constants from "expo-constants";
import { useAuth } from "@clerk/clerk-expo";
import {
  QueryClient,
  QueryClientProvider,
  type DefaultOptions,
} from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import { type AppRouter } from "@packages/api";
import { handleAPIError } from "./error";

export const api = createTRPCReact<AppRouter>();
export { type RouterInputs, type RouterOutputs } from "@packages/api";

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0];

  if (!localhost) {
    // return "https://your-production-url.com";
    throw new Error(
      "Failed to get localhost. Please point to your production server.",
    );
  }

  return `http://${localhost}:3000`;
};

const queryClientConfig: DefaultOptions = {
  queries: {
    onError: handleAPIError,
  },
  mutations: {
    onError: handleAPIError,
  },
};

export const TRPCProvider = ({ children }: { children: ReactNode }) => {
  const { getToken } = useAuth();

  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryClientConfig }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          async headers() {
            const authToken = await getToken();

            return {
              Authorization: authToken ?? undefined,
            };
          },

          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};
