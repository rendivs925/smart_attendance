import { NextRequest, NextResponse } from "next/server";
import { IUserJwtPayload, verifyAuth } from "@/utils/auth";
import { COOKIE_NAME } from "@/constants";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const verifiedToken = token
    ? await verifyAuth(token).catch((err) => {
        console.log("Verification error:", err);
        return null;
      })
    : null;

  const { pathname, origin } = req.nextUrl;

  const isPublicPath = pathname.startsWith("/auth");

  if (!verifiedToken) {
    if (isPublicPath) return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  const userRole = (verifiedToken as IUserJwtPayload)?.role || "student";

  const rolePaths: Record<string, string> = {
    admin: "/admin",
    teacher: "/teacher",
    student: "/student",
  };

  const isUnauthorized =
    Object.entries(rolePaths).some(
      ([role, path]) => pathname.startsWith(path) && userRole !== role,
    ) ||
    (isPublicPath && pathname !== "/auth/logout");

  if (isUnauthorized && !pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (verifiedToken && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
    "/auth/:path*",
  ],
};
