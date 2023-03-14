import { createRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
});
