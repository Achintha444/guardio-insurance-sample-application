import callEditUser from "../../apiCall/settings/callEditUser";
import callViewUsers from "../../apiCall/settings/callViewUsers";
import decodeUser from "../../util/apiUtil/decodeUser";

async function editUserEncode(session, id, name, email, username) {
    const editUserEncode = {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
            {
                "op": "replace",
                "value": {
                    "name": {
                        "givenName": name
                    },
                    "userName": username,
                    "emails": [
                        {
                            "value": email,
                            "primary": true
                        }
                    ]
                }
            }
        ]
    }

    try {
        await editUser(session, id, editUserEncode);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


export default async function decodeEditUser(session, id, name, email, username) {
    const editUserEncode = {
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ],
        "Operations": [
            {
                "op": "replace",
                "value": {
                    "name": {
                        "givenName": name
                    },
                    "userName": username,
                    "emails": [
                        {
                            "value": email,
                            "primary": true
                        }
                    ]
                }
            }
        ]
    }

    try {
        const usersData = await callEditUser(session,id,editUserEncode);
        return true;
    } catch (err) {
        return false
    }
}