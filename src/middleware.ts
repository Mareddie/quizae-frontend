export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        /*
         * Matches all paths except the following:
         * - /auth
         * - /api/auth
         * - /_next/static
         * - /_next/image
         * - /favicon.ico
         */
        '/((?!auth|api/auth|_next/static|_next/image|favicon.ico).*)',
    ]
}
