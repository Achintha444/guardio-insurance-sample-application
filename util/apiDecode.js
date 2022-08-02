import { me } from "./apiCall";
import { consoleLogDebug, consoleLogError, consoleLogInfo } from "./util";

const API_DECODE = "API DECODE";

async function meDetails(session) {

    try {
        const meData = await me(session);
        
        const meReturn = {
            "id": meData.id,
            "userName": meData.userName,
            "name": meData.name!=undefined ? meData.name.givenName : "Not Defined",
            "email": meData.emails!=undefined ? meData.emails[0] : "Not Defined"
        };

        consoleLogInfo(`${API_DECODE} meDetails`, meReturn)

        return meReturn;
    } catch (err) {
        consoleLogError(API_DECODE, err);
        return null
    }

}

module.exports = { meDetails }