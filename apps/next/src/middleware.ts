import { NextResponse } from "next/server";
import { withClerkMiddleware } from "@clerk/nextjs/server";

export default withClerkMiddleware(() => NextResponse.next());

// Disable Middleware for static files & API routes
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
