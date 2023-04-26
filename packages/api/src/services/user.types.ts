import {
  type Prisma,
  type User,
  type UserContact,
  type UserLegal,
  type UserPersonal,
} from "@packages/db";

type AtLeastOneRequired<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type getUserInput = AtLeastOneRequired<Prisma.UserWhereUniqueInput>;

export type FullUser =
  | (User & {
      personal: UserPersonal;
      contact: UserContact;
      legal: UserLegal;
    })
  | null;
