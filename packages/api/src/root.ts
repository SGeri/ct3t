//import { authRouter } from "./router/auth";
//import { postRouter } from "./router/post";
import { exampleRouter } from "./router/example";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  //post: postRouter,
  //auth: authRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
