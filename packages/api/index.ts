import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "./src/root";

export { appRouter, type AppRouter } from "./src/root";

export { createTRPCContext } from "./src/context";
export type { Context } from "./src/context";

// Export UserService to be used in utils/auth.ts
export { userService } from "./src/services/user.service";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
