import { consoleLogDebug, consoleLogError, consoleLogInfo } from "./util";
import config from '../config.json';

const API_CALL = "API CALL"

function getHeader(session) {
    const headers = {
        "accept": "application/scim+json",
        "authorization": "Bearer " + session.accessToken
    }
    return { headers };
}

function getPOSTRequestOptions(session, body){
    return {
        method: 'POST',
        headers: getHeader(session),
        body: JSON.stringify(body)
    }
}

async function fetchMe(session) {
    consoleLogInfo(`session ${API_CALL}`, session);

    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/scim2/Me`,
            getHeader(session)
        );
        const data = await res.json();
        consoleLogDebug(`${API_CALL} me`, data);

        return data;
    } catch (err) {
        consoleLogError(`${API_CALL} me`, err);

        return null;
    }
}

async function fetchUsers(session) {
    consoleLogInfo(`session ${API_CALL}`, session);

    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/scim2/Users`,
            getHeader(session)
        );
        const data = await res.json();
        consoleLogDebug(`${API_CALL} users`, data);

        return data;
    } catch (err) {
        consoleLogError(`${API_CALL} users`, err);

        return null;
    }
}

async function addUser(session, user) {
    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/scim2/Users`,
            getPOSTRequestOptions(session, user)
        );
        const data = await res.json();
        consoleLogDebug(`${API_CALL} users`, data);

        return data;
    } catch (err) {
        consoleLogError(`${API_CALL} users`, err);

        return null;
    }
}

module.exports = { fetchMe, fetchUsers }