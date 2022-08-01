import { consoleLogDebug, consoleLogError, consoleLogInfo } from "./util";

const API_CALL = "API CALL"

async function me(session) {
    consoleLogInfo(`session ${API_CALL}`, session);
    const headers = {
        "accept": "application/scim+json",
        "authorization": "Bearer " + session.accessToken
    }
    try {
        const res = await fetch(
            `https://localhost:9443/t/carbon.super/scim2/Me`,
            { headers }
        );
        const data = await res.json();
        consoleLogDebug(API_CALL, data);

        return data;
    } catch (err) {
        consoleLogError(API_CALL, err);

        return null;
    }
}

function add() {
    return 1 + 2
}

module.exports = { me, add }