import { exampleRouter } from "./router/example";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
