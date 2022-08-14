import config from '../../config.json';
import RequestMethod from './requestMethod';

function getInteralApibBody(session, subOrgId) {
    const body = {
        session: session,
        subOrgId: subOrgId
    }
    return body;
}

function getInteralApiRequestOptions(session, subOrgId) {
    const request = {
        method: RequestMethod.POST,
        body: getInteralApibBody(session, subOrgId)
    }
    return request;
}

module.exports = { getInteralApiRequestOptions }