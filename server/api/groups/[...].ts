import {createRouter, useBase, eventHandler, getCookie} from "h3";
import {performRequest, processError} from "~/utils/apiRequestUtils";

const router = createRouter();

router.get('/my-own', eventHandler(async (event) => {
    return performRequest(
        '/groups?filter=myOwn',
        'GET',
        undefined,
        getCookie(event, 'accessToken')
    ).catch((err) => processError(event, err));
}));

export default useBase('/api/groups', router.handler);
