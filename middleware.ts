import { authMiddleware } from "@clerk/nextjs";

//This example protects all routes including api/trpc routes
// PLease edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more info
export default authMiddleware({
    publicRoutes: ['/api/tasks'],
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};