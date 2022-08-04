import config from "../../../config.json";

export const createIdentityProvider = async ({model, session}) => {

    try {
        const res = await fetch(
            `${config.WSO2IS_HOST}/t/${config.WSO2IS_TENANT_NAME}/api/server/v1/identity-providers`,
            {
                method: "POST",
                body: JSON.stringify(model),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "authorization": "Bearer " + session.accessToken,
                    "Access-Control-Allow-Origin": "*"
                }
            },
        );
        return await res.json();
    } catch (err) {
        return null;
    }

}
