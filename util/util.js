function consoleLogInfo(title, message) {
    console.log(`\n INFO : ${title} : ${JSON.stringify(message, null, '\t')}`);
}

function consoleLogDebug(title, message) {
    console.log(`\n DEBUG : ${title} : ${JSON.stringify(message, null, '\t')}`);
}

function consoleLogError(title, message) {
    console.log(`\n ERROR : ${title} : ${JSON.stringify(message, null, '\t')}`);
}

function stringIsEmpty(str) {
    return (str === "");
}

const LOADING_DISPLAY_NONE = {
    display: "none"
};
const LOADING_DISPLAY_BLOCK = {
    display: "block"
};

var login_org_id = "";

function getLoginOrgId() {
    return login_org_id;
}

function setLoginOrgId(orgId) {
    login_org_id = orgId;
}

function checkAdmin(scopes) {
    const adminScopes = ["email", "internal_login", "internal_user_mgt_create", "internal_user_mgt_delete",
        "internal_user_mgt_list", "internal_user_mgt_update", "internal_user_mgt_view", "openid", "profile"];

    for (let i = 0; i < adminScopes.length; i++) {
        if (!scopes.includes(adminScopes[i])) {
            return false;
        }
    }

    return true;
}


module.exports = {
    consoleLogInfo, consoleLogDebug, consoleLogError, stringIsEmpty,
    getLoginOrgId, setLoginOrgId, checkAdmin, LOADING_DISPLAY_NONE, LOADING_DISPLAY_BLOCK
};