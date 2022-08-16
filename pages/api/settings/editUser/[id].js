//import { consoleLogDebug, consoleLogError, consoleLogInfo } from "../../../util/util";
import config from '../../../../config.json';
import Cookie from 'js-cookie';
import { NextApiRequest, NextApiResponse } from "next";
import getDataHeader from '../../../../util/util/apiUtil/getDataHeader';
import { consoleLogDebug, consoleLogError } from '../../../../util/util';
import { API } from '../../../../util/constants';
import { RequestMethod } from '../../../../util/util/apiUtil/requestMethod';
import { getSentDataRequestOptions } from '../../../../util/util/apiUtil/getSentDataRequestOptions'

export default async function editUser(req, res) {
    if (req.method !== 'POST') {
        res.status(404).json('meData');
    }

    const body = JSON.parse(req.body);
    const session = body.session;
    const subOrgId = body.subOrgId;
    const user = body.param;

    const id = req.query.id;

    try {
        const fetchData = await fetch(
            `${config.WSO2IS_HOST}/o/${subOrgId}/scim2/Users/${id}`,
            getSentDataRequestOptions(session, RequestMethod.PATCH, user)
        );
        const data = await fetchData.json();
        res.status(200).json(data);    
    } catch (err) {
        res.status(404).json('meData');
    }
}