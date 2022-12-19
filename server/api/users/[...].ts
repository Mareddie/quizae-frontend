import {createRouter, eventHandler, readBody, useBase, setCookie, getCookie} from "h3";
import {performRequest, processError} from "~/utils/apiRequestUtils";

const router = createRouter();

router.post('/login', eventHandler(async (event) => {
    const response = await performRequest('/login', 'POST', await readBody(event))
        .catch((err) => processError(event, err)) as any;

    if (!response.hasOwnProperty('accessToken')) {
        return response;
    }

    setCookie(event, 'accessToken', response.accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: 14400, // 4 hours
        sameSite: 'lax',
    });

    return { success: true };
}));

router.get('/profile', eventHandler(async (event) => {
    return performRequest('/users/profile', 'GET', undefined, getCookie(event, 'accessToken'))
        .catch((err) => processError(event, err));
}));

export default useBase('/api/users', router.handler);
