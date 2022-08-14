import { consoleLogDebug, consoleLogError, consoleLogInfo } from "../../util";
import config from '../../../config.json';
import Cookie from 'js-cookie';
import { getInternalApiRequestOptions } from '../../apiUtil/getInteralApiRequestOptions'
import { API_CALL } from "../../constants";

const subOrgId = Cookie.get("orgId");

export default async function callMe(session) {

    try {
        const res = await fetch(
            // `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/scim2/Me`,
            `${config.WSO2IS_CLIENT_URL}/api/dashboard/me`,
            getInternalApiRequestOptions(session,subOrgId)
        );
        const data = await res.json();
        consoleLogDebug(`${API_CALL} me2`, data);

        return data;
    } catch (err) {
        consoleLogError(`${API_CALL} me2`, err);

        return null;
    }
}