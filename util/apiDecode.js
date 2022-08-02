import { fetchMe, fetchUsers } from "./apiCall";
import { consoleLogDebug, consoleLogError, consoleLogInfo } from "./util";

const API_DECODE = "API DECODE";

function decodeUser(user) {
    return {
        "id": user.id,
        "userName": user.userName,
        "name": user.name != undefined ? user.name.givenName : "Not Defined",
        "email": user.emails != undefined ? user.emails[0] : "Not Defined"
    };
}

async function meDetails(session) {

    try {
        const meData = await fetchMe(session);

        const meReturn = decodeUser(meData);

        consoleLogInfo(`${API_DECODE} meDetails`, meReturn)

        return meReturn;
    } catch (err) {
        consoleLogError(API_DECODE, err);
        return null
    }

}

async function usersDetails(session) {

    try {

        const usersData = await fetchUsers(session);

        const usersReturn = [];

        usersData["Resources"].map((user) => {
            usersReturn.push(decodeUser(user));
        })

        consoleLogInfo(`${API_DECODE} usersDetails`, usersReturn)

        return usersReturn;
    } catch (err) {
        consoleLogError(`${API_DECODE} usersDetails`, err);
        return null
    }

}

async function addUserEncode(session, name, email, username, password) {
    const addUserEncode = {
        "schemas": [],
        "name": {
            "givenName": name
        },
        "userName": username,
        "password": password,
        "emails": [
            {
                "value": email,
                "primary": true
            }
        ],
    }


}


module.exports = { meDetails, usersDetails, addUserEncode }