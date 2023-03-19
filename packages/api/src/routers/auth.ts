import { TRPCError } from "@trpc/server";
import { createRouter, publicProcedure } from "../trpc";

export const authRouter = createRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });

    const user = await ctx.prisma.user.findUnique({
      where: {
        clerk_id: ctx.auth.userId,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });

    return { user };
  }),

  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),

  getSecretMessage: publicProcedure.query(() => {
    return "you can see this secret message!";
  }),
});
