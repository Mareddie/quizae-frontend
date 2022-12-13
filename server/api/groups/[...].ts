import {createRouter, useBase, eventHandler, getCookie, readBody} from "h3";
import {performRequest, processError} from "~/utils/apiRequestUtils";

const router = createRouter();

router.post('/create', eventHandler(async (event) => {
    return performRequest(
        '/groups/create',
        'POST',
        await readBody(event),
        getCookie(event, 'accessToken')
    ).catch((err) => processError(event, err));
}));

router.patch('/:groupId', eventHandler(async (event) => {
    return performRequest(
        `/groups/${event.context.params.groupId}`,
        'PATCH',
        await readBody(event),
        getCookie(event, 'accessToken')
    ).catch((err) => processError(event, err));
}));

router.delete('/:groupId', eventHandler(async (event) => {
    return performRequest(
        `/groups/${event.context.params.groupId}`,
        'DELETE',
        await readBody(event),
        getCookie(event, 'accessToken')
    ).catch((err) => processError(event, err));
}));

router.get('/my-own', eventHandler(async (event) => {
    return performRequest(
        '/groups?filter=myOwn',
        'GET',
        undefined,
        getCookie(event, 'accessToken')
    ).catch((err) => processError(event, err));
}));

export default useBase('/api/groups', router.handler);
