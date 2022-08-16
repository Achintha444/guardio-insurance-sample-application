import { consoleLogDebug, consoleLogError, consoleLogInfo } from "../../util";
import config from '../../../config.json';
import Cookie from 'js-cookie';
import { getInternalApiRequestOptions } from '../../util/apiUtil/getInteralApiRequestOptions'
import { API_CALL } from "../../constants";

const subOrgId = Cookie.get("orgId");

export default async function callMe(session) {
    try {
        const res = await fetch(
            `${config.WSO2IS_CLIENT_URL}/api/dashboard/me`,
            getInternalApiRequestOptions(session, subOrgId)
        );
        const data = await res.json();

        return data;
    } catch (err) {

        return null;
    }
}