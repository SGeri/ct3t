import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createTRPCContext } from "@packages/api";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
