import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { Role } from "@packages/db";
import { Context } from "./context";
import { createProtectedProcedure } from "./procedures";

const t = initTRPC.context<Context>().create({
  transformer: superjson,

  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createRouter = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const employeeProcedure = createProtectedProcedure(Role.EMPLOYEE);
export const managerProcedure = createProtectedProcedure(Role.MANAGER);
export const adminProcedure = createProtectedProcedure(Role.ADMIN);
