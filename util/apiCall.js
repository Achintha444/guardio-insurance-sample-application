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

async function me(session) {
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

module.exports = { me, fetchUsers }