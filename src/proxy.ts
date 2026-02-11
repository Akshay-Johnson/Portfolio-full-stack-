import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function proxy(req: any) {
  const token = req.cookies.get("adminToken")?.value;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      verifyToken(token);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
