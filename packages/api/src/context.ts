import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { prisma } from "@packages/db";

type AuthContextProps = {
  auth: SignedInAuthObject | SignedOutAuthObject;
};

export const createContextInner = async ({ auth }: AuthContextProps) => {
  return {
    auth,
    prisma,
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  return await createContextInner({ auth: getAuth(opts.req) });
};

export type CreateTRPCContext = typeof createTRPCContext;

export type Context = inferAsyncReturnType<CreateTRPCContext>;
