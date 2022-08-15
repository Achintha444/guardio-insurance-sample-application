import callMe from "../../apiCall/dashboard/callMe";
import decodeUser from "../../util/apiUtil/decodeUser";

export default async function decodeMe(session) {

    try {
        consoleLogDebug(`me44`, session);
        const meData = await callMe(session);
        consoleLogDebug(`me44`, meData);
        const meReturn = decodeUser(meData);

        return meReturn;
    } catch (err) {
        return null
    }
}