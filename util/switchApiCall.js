import { consoleLogDebug, consoleLogError, consoleLogInfo } from "./util";
import config from '../config.json';
import Cookie from 'js-cookie';

const SWITCH_API_CALL = "`Switch API Call";

const subOrgId = Cookie.get("orgId");

function getSwitchHeader() {
    const headers = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "http://localhost:3000"
    }
    return headers;
}
//SYSTEM profile openid
//'scope': `SYSTEM ${config.WSO2IS_SCOPES}`,
function getSwitchBody(subOrgId, accessToken) {
    const body = {
        'client_id': config.WSO2IS_CLIENT_ID,
        'grant_type': 'organization_switch',
        'scope': `SYSTEM profile openid`,
        'switching_organization': subOrgId,
        'token': accessToken
    }
    consoleLogDebug(SWITCH_API_CALL, new URLSearchParams(body));
    return body;
}

function getSwitchResponse(subOrgId, accessToken) {
    const request = {
        method: 'POST',
        headers: getSwitchHeader(),
        body: new URLSearchParams(getSwitchBody(subOrgId, accessToken)).toString()
    }
    consoleLogDebug(SWITCH_API_CALL,request)
    return request;
}

async function switchOrg(accessToken) {
    const res = await fetch(
        `${config.WSO2IS_HOST}/oauth2/token`,
        getSwitchResponse(subOrgId, accessToken)
    );
    const data = await res.json();
    consoleLogDebug(SWITCH_API_CALL, data);

    return data;
}

module.exports = { switchOrg };