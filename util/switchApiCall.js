import { consoleLogDebug, consoleLogError, consoleLogInfo, parseCookies } from "./util";
import config from '../config.json';
import JSCookie from 'js-cookie';
import cookie from "cookie";

const SWITCH_API_CALL = "Switch API Call";

//var orgId = JSCookie.get("orgId");

function setOrgId(request){
    const cookies = parseCookies(request);
    const subOrgId = cookies.orgId;

    return subOrgId;
}

function getSwitchHeader() {
    const headers = {
        "Authorization" : `Basic ${btoa(`${config.WSO2IS_CLIENT_ID}:${config.WSO2IS_CLIENT_SECRET}`)}`,
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": config.WSO2IS_CLIENT_URL
    }
    return headers;
}
//SYSTEM profile openid
//'scope': `SYSTEM ${config.WSO2IS_SCOPES}`,
// 'switching_organization': "5c1a730c-97c1-4d78-b245-196031efa1db",
function getSwitchBody(oId, accessToken) {
    const body = {
        'grant_type': 'organization_switch',
        'scope': config.WSO2IS_SCOPES,
        'switching_organization': oId,
        'token': accessToken
    }
    consoleLogDebug(SWITCH_API_CALL, new URLSearchParams(body));
    return body;
}

function getSwitchResponse(oId, accessToken) {
    const request = {
        method: 'POST',
        headers: getSwitchHeader(),
        body: new URLSearchParams(getSwitchBody(oId, accessToken)).toString()
    }
    consoleLogDebug(SWITCH_API_CALL,request)
    return request;
}

async function switchOrg(request,accessToken) {

    const res = await fetch(
        `${config.WSO2IS_HOST}/oauth2/token`,
        getSwitchResponse(setOrgId(request), accessToken)
    );
    const data = await res.json();
    consoleLogDebug(SWITCH_API_CALL, data);

    return data;
}

module.exports = { switchOrg };