import { z } from "zod";

import { createRouter, publicProcedure } from "../trpc";

export const exampleRouter = createRouter({
  test: publicProcedure.query(({ ctx }) => {
    console.log(ctx.auth.userId);

    return {
      message: "Hello World!",
    };
  }),
});
