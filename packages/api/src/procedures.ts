import { TRPCError } from "@trpc/server";
import { Role, prisma } from "@packages/db";
import { middleware, publicProcedure } from "./trpc";

export const createProtectedProcedure = (permissionLevel: Role | Role[]) => {
  const procedureMiddleware = middleware(async ({ next, ctx }) => {
    if (!ctx.auth.userId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });

    const user = await prisma.user.findUnique({
      where: {
        clerk_id: ctx.auth.userId,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });

    const singleRoleCondition =
      !Array.isArray(permissionLevel) && user.role === permissionLevel;

    const multipleRoleCondition =
      Array.isArray(permissionLevel) && permissionLevel.includes(user.role);

    if (!singleRoleCondition || !multipleRoleCondition)
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Not authorized",
      });

    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  });

  return publicProcedure.use(procedureMiddleware);
};
