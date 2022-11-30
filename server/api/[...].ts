import {createRouter, eventHandler, H3Error, H3Event, readBody, useBase} from "h3";
import {useRuntimeConfig} from "#imports";
import {BodyInit} from "node-fetch";

const runtimeConfig = useRuntimeConfig();
const router = createRouter();

router.post('/login', eventHandler(async (event) => {
    return performRequest('/login', await readBody(event), 'POST')
        .catch((err) => processError(event, err));
}));

function processError(event: H3Event, error: H3Error): any {
    event.node.res.statusCode = error.data.statusCode;

    return error.data;
}

function performRequest(url: string, body: BodyInit, method: string) {
    return $fetch(url, {
        method: method,
        body: body,
        baseURL: runtimeConfig.backendUrl,
    });
}

export default useBase('/api', router.handler);
