// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// // import { default } from 'next-auth/middleware'

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET_KEY,
//     raw : true
//   });

//   const url = request.nextUrl;

//   console.log("lee bahi mera token", token);

//   console.log("Request Path:", request.nextUrl.pathname);
//   console.log("Token:", token);

//   const publicRoutes = ["/sign-in", "/sign-up", "/verify", "/"];

//   const isPublicRoute = publicRoutes.some((route) =>
//     url.pathname.startsWith(route)
//   );

//   // Redirect authenticated users away from public routes
//   if (token && isPublicRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Redirect unauthenticated users away from protected routes
//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// // Run middleware on specific routes
// export const config = {
//   matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET_KEY, // Ensure this matches across authOptions and middleware
      raw: true, // Optional: Inspect the raw token
    });

    // Redirect to dashboard if the user is already authenticated
    // and trying to access sign-in, sign-up, or home page
    if (
      token &&
      (url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/sign-up") ||
        url.pathname.startsWith("/verify"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!token && url.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}
