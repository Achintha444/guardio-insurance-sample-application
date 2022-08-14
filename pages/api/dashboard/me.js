//import { consoleLogDebug, consoleLogError, consoleLogInfo } from "../../../util/util";
import config from '../../../config.json';
import Cookie from 'js-cookie';
import { NextApiRequest, NextApiResponse } from "next";
import getDataHeader from '../../../util/apiUtil/getDataHeader';
import {consoleLogDebug,consoleLogError} from '../../../util/util';
import { API } from '../../../util/constants';

export default async function me(req , res) {
    if(req.method !== 'POST'){
        
    }

    const session = req.body.session;
    const subOrgId = req.body.subOrgId;

    try {
        const fetchData = await fetch(
            // `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/scim2/Me`,
            `${config.WSO2IS_HOST}/o/${subOrgId}/scim2/Users/${session.userId}`,
            getDataHeader(session)
        );
        const meData = await fetchData.json();

        consoleLogDebug(`${API} me`, meData);

        res.status(200).json(meData);
    } catch (err) {
        consoleLogError(`${API} me`, err);

        res.status(404).json(meData);
    }
}