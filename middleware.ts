import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase/auth";
import app from "@/lib/firebase";

const auth = getAuth(app);

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/profile", "/create", "/admin"];
  const { pathname } = req.nextUrl;
  if (!protectedPaths.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // Could verify token with Firebase Admin if we had backend. For now, let it pass.
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/create", "/admin/:path*"],
};
