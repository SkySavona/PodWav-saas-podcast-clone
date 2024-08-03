import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const publicRoutes = ["/", "/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"];
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, req, evt) => {
  const { userId } = auth();

  // Allow access to public routes and Clerk-related routes without redirection
  if (isPublicRoute(req) || req.nextUrl.pathname.startsWith("/.clerk")) {
    return NextResponse.next();
  }

  // Redirect to sign-in only if user is not authenticated and trying to access a protected route
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // For all other cases, allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
