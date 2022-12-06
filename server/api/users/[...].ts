import {createRouter, eventHandler, H3Error, H3Event, readBody, useBase, setCookie, sendRedirect, getCookie} from "h3";
import {useRuntimeConfig} from "#imports";
import {BodyInit} from "node-fetch";

const runtimeConfig = useRuntimeConfig();
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

function processError(event: H3Event, error: H3Error): any {
    event.node.res.statusCode = error.data.statusCode;

    return error.data;
}

async function performRequest(url: string, method: string, body?: BodyInit, authToken?: string) {
    let headers = {} as any;

    if (authToken !== undefined) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    return $fetch(url, {
        method: method,
        headers: headers,
        body: body,
        baseURL: runtimeConfig.backendUrl,
    });
}

export default useBase('/api/users', router.handler);
