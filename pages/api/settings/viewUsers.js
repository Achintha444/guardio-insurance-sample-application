//import { consoleLogDebug, consoleLogError, consoleLogInfo } from "../../../util/util";
import config from '../../../config.json';
import Cookie from 'js-cookie';
import { NextApiRequest, NextApiResponse } from "next";
import getDataHeader from '../../../util/util/apiUtil/getDataHeader';
import {consoleLogDebug,consoleLogError} from '../../../util/util';
import { API } from '../../../util/constants';

export default async function viewUsers(req , res) {
    if(req.method !== 'POST'){
        res.status(404).json('meData');
    }

    const body = JSON.parse(req.body);
    const session = body.session;
    const subOrgId = body.subOrgId;

    try {
        const fetchData = await fetch(
            `${config.WSO2IS_HOST}/o/${subOrgId}/scim2/Users`,
            getDataHeader(session)
        );
        const users = await fetchData.json();
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json('meData');
    }
}