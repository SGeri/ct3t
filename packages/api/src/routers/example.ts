import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProcedure, createRouter, publicProcedure } from "../trpc";

export const exampleRouter = createRouter({
  test: publicProcedure.query(() => {
    return {
      message: "Hello World!",
    };
  }),

  checkNumber: adminProcedure
    .input(
      z.object({
        number: z.number(),
      }),
    )
    .mutation(({ input }) => {
      if (input.number !== 1)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Number must be 1",
        });

      return {
        message: "Hello World!",
      };
    }),
});
