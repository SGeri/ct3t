import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/dist/api";
import { getAuth } from "@clerk/nextjs/server";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import requestIP from "request-ip";
import { prisma } from "@packages/db";

type ContextProps = {
  auth: SignedInAuthObject | SignedOutAuthObject;
  ip: string | null;
};

export const createContextInner = ({ auth, ip }: ContextProps) => {
  return {
    auth,
    ip,
    prisma,
  };
};

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const clientIP = requestIP.getClientIp(opts.req);

  return createContextInner({ auth: getAuth(opts.req), ip: clientIP });
};

export type CreateTRPCContext = typeof createTRPCContext;

export type Context = inferAsyncReturnType<CreateTRPCContext>;
