import { NextRequest, NextResponse } from "next/server";
import { IUserJwtPayload, verifyAuth } from "@/utils/auth";
import { COOKIE_NAME } from "@/constants";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log("Verification error:", err);
      return null;
    }));

  const { pathname, origin } = req.nextUrl;
  const userRole = (verifiedToken as IUserJwtPayload)?.role || "user";

  if (!verifiedToken) {
    if (pathname.startsWith("/auth")) return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (pathname.startsWith("/admin")) {
    if (userRole !== "admin")
      return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (pathname.startsWith("/teacher")) {
    if (userRole !== "teacher")
      return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (pathname.startsWith("/student")) {
    if (userRole !== "student")
      return NextResponse.redirect(new URL("/auth/login", origin));
  }

  if (pathname.startsWith("/auth")) {
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
