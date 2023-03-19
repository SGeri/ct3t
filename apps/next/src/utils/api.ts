import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "@packages/api";
import { handleAPIError } from "./error";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:3000`;
};

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,

      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],

      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            onError: handleAPIError,
          },
          mutations: {
            onError: handleAPIError,
          },
        },
      },
    };
  },

  ssr: false, // todo - enable this
});

export { type RouterInputs, type RouterOutputs } from "@packages/api";
