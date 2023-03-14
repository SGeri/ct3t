import { authRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  example: exampleRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
