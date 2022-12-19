import {defineEventHandler} from "h3";

const protectedMethods = [
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
];

export default defineEventHandler((event) => {
    // Skip the middleware if the request is not supported
    if (!protectedMethods.some((method) => method === event.node.req.method)) {
        return;
    }

    if (process.env.NUXT_ORIGIN === event.node.req.headers['origin']) {
        return;
    }

    event.node.res.statusCode = 403;

    return {
        error: 'Unauthorized',
        message: 'Origin of the request does not match',
    };
})
