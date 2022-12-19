import {deleteCookie, sendRedirect} from "h3";

export default defineEventHandler((event) => {
    deleteCookie(event, 'accessToken');

    return sendRedirect(event, '/');
});
