import {H3Error, H3Event} from "h3";
import {BodyInit} from "node-fetch";
import {useRuntimeConfig} from "#imports";

const runtimeConfig = useRuntimeConfig();

export function processError(event: H3Event, error: H3Error): any {
    event.node.res.statusCode = error.data.statusCode;

    return error.data;
}

export async function performRequest(url: string, method: string, body?: BodyInit, authToken?: string) {
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
