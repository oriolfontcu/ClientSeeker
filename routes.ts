/**
 * An array of routes that are accesible to the public
 * Theses routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]


/**
 * An array of routes that are accesible to the public
 * Theses routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]


export const premiumRoutes = [
    "/dashboard",
]

/**
 * The prefix for API authentication routes
 * Routes that start with these prefix are used for API authentication purposes
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"