import { z } from "zod";

import { createRouter, publicProcedure } from "../trpc";

export const exampleRouter = createRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return {};
  }),
});
