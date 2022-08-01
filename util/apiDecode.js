import { me } from "./apiCall";
import { consoleLogError, consoleLogInfo } from "./util";

const API_DECODE = "API DECODE";

let meData = null

async function meDetails(session) {

    try {
        if (meData==null) {
            meData = await me(session);
        }
        
        const meReturn = {
            "id": meData.id,
            "userName": meData.userName,
            "name": meData.name.givenName,
            "email": meData.emails[0]
        };

        consoleLogInfo(`${API_DECODE} meDetails`, meReturn)

        return meReturn;
    } catch (err) {
        consoleLogError(API_DECODE, err);
        return null
    }

}

module.exports = { meDetails }