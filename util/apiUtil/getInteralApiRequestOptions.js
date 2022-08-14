import config from '../../config.json';
import { RequestMethod } from './requestMethod';

function getInternalApibBody(session, subOrgId) {
    const body = {
        session: session,
        subOrgId: subOrgId
    }
    return body;
}

function getInternalApiRequestOptions(session, subOrgId) {
    const request = {
        method: RequestMethod.POST,
        body: JSON.stringify(getInternalApibBody(session, subOrgId))
    }
    return request;
}

module.exports = { getInternalApiRequestOptions }