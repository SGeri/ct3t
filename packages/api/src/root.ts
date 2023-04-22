import { authRouter } from "./routers/auth";
import { exampleRouter } from "./routers/example";
import { fileRouter } from "./routers/file";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  auth: authRouter,
  example: exampleRouter,
  file: fileRouter,
});

export type AppRouter = typeof appRouter;
