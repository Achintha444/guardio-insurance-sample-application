import config from "../../../config.json";


export const listApplications = async ({limit, offset, filter = null, session}) => {

    const DEFAULT_FILTER = filter || "name co *";
    const q = `limit=${limit}&offset=${offset}&filter=${DEFAULT_FILTER}`;

    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/api/server/v1/applications?${q}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.accessToken,
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            },
        );
        // FIXME: once API changes are done.
        // For now, we will receive the clientId as `inboundKey` in a list item.
        // However, it will change to `clientId` (for OIDC) and `issuer` (for SAML)
        // applications with a planed API update.
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }

};

export const getApplicationDetails = async ({id, session}) => {

    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/api/server/v1/applications/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.accessToken,
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            },
        );
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }

};

export const patchApplication = async ({id, partial, session}) => {

    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/api/server/v1/applications/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.accessToken,
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                },
                body: JSON.stringify(partial)
            },
        );
        return await res.json();
    } catch (err) {
        console.error(err);
        return null;
    }

}
