import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { default } from 'next-auth/middleware'


export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const publicRoutes = ["/sign-in", "/sign-up", "/verify", "/"];

  const isPublicRoute = publicRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // Redirect authenticated users away from public routes
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// Run middleware on specific routes
export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
};
