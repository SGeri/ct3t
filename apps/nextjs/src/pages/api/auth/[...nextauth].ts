import NextAuth from "next-auth";

import { authOptions } from "@packages/auth";

export default NextAuth(authOptions);
