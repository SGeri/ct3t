import { type Prisma } from "@packages/db";

type AtLeastOneRequired<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type getUserInput = AtLeastOneRequired<Prisma.UserWhereUniqueInput>;
