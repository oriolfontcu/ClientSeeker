import NextAuth from "next-auth"

import authConfig from "@/auth.config"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    premiumRoutes,
    publicRoutes
} from "@/routes"

const { auth } = NextAuth(authConfig);
 
export default auth((req) => {

    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPremiumRoute = premiumRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute){
        return;
    }

    if (isAuthRoute){
        if (isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    if (!isLoggedIn && !isPublicRoutes){
        return Response.redirect(new URL("/auth/login", nextUrl));
    }


    return;

})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}