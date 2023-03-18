import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { Context } from "./context";

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
export const protectedProcedure = t.procedure; // todo make template
