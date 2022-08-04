import { consoleLogDebug, consoleLogError, consoleLogInfo } from "./util";
import config from '../config.json';

const API_CALL = "API CALL"

const POST_METHOD = "POST";

function sentDataHeader(session) {
    const headers = {
        "accept": "application/scim+json",
        "content-type": "application/scim+json",
        "authorization": "Bearer " + session.accessToken,
        "access-control-allow-origin": "http://localhost:3000"
    }
    return headers;
}

function getDataHeader(session) {
    const headers = {
        "accept": "application/scim+json",
        "authorization": "Bearer " + session.accessToken,
    }

    return { headers }
}

function getSentDataRequestOptions(session, method, body) {
    const request =  {
        method: method,
        headers: sentDataHeader(session),
        body: JSON.stringify(body)
    }
    console.log(request);
    return request;
}

async function fetchMe(session) {
    consoleLogInfo(`session ${API_CALL}`, session);

    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/scim2/Me`,
            getDataHeader(session)
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
            getDataHeader(session)
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
    console.log(user);
    const res = await fetch(
        `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/scim2/Users`,
        getSentDataRequestOptions(session, POST_METHOD, user)
    );
    const data = await res.json();
    consoleLogDebug(`${API_CALL} users`, data);

    return data;
}

module.exports = { fetchMe, fetchUsers, addUser }