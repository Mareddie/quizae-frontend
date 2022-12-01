import {createRouter, eventHandler, H3Error, H3Event, readBody, useBase, setCookie, sendRedirect} from "h3";
import {useRuntimeConfig} from "#imports";
import {BodyInit} from "node-fetch";

const runtimeConfig = useRuntimeConfig();
const router = createRouter();

router.post('/login', eventHandler(async (event) => {
    const response = await performRequest('/login', await readBody(event), 'POST')
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

function processError(event: H3Event, error: H3Error): any {
    event.node.res.statusCode = error.data.statusCode;

    return error.data;
}

async function performRequest(url: string, body: BodyInit, method: string) {
    return $fetch(url, {
        method: method,
        body: body,
        baseURL: runtimeConfig.backendUrl,
    });
}

export default useBase('/api', router.handler);
