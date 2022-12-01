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
})
