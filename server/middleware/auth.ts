import {defineEventHandler, getCookie, sendRedirect} from "h3";

const unprotectedRoutes = [
    '/',
    '/api/login',
];

export default defineEventHandler((event) => {
    const cookie = getCookie(event, 'accessToken');

    if (!cookie && !unprotectedRoutes.some((route) => event.node.req.url === route)) {
        return sendRedirect(event, '/', 302);
    }

    // If we have access token cookie, and we're on login page, we can bypass the process
    if(event.node.req.url === '/' && cookie) {
        return sendRedirect(event, '/app', 302);
    }
})
