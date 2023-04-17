import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis, type Role } from "@packages/db";
import { userService } from "./services/user.service";
import { middleware, procedure, publicProcedure } from "./trpc";

export const createProtectedProcedure = (permissionLevel: Role | Role[]) => {
  const procedureMiddleware = middleware(async ({ next, ctx }) => {
    if (!ctx.auth.userId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });

    const user = await userService.getUserByClerkId(ctx.auth.userId);

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });

    const singleRoleCondition =
      !Array.isArray(permissionLevel) && user.role === permissionLevel;

    const multipleRoleCondition =
      Array.isArray(permissionLevel) && permissionLevel.includes(user.role);

    if (!singleRoleCondition && !multipleRoleCondition)
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

type Window = Parameters<typeof Ratelimit.fixedWindow>[1];

export const createRatelimitedProcedure = (
  limit = 10,
  window: Window = "5 s",
) => {
  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(limit, window),
  });

  const procedureMiddleware = middleware(async ({ next, ctx }) => {
    const identifier = ctx.ip; // what to do if ip is null?
    const result = await ratelimit.limit(identifier as string);

    if (!result.success)
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You are ratelimited, please slow down",
      });

    return next({ ctx });
  });

  return procedure.use(procedureMiddleware);
};
