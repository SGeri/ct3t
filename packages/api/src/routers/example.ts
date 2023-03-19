import { z } from "zod";
import { createRouter, publicProcedure } from "../trpc";

export const exampleRouter = createRouter({
  test: publicProcedure.query(({ ctx }) => {
    //console.log(ctx.auth, ctx.auth.userId, ctx.auth.user);

    return {
      message: "Hello World!",
    };
  }),
});
