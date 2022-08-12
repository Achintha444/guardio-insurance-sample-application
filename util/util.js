import config from '../config.json';
import cookie from "cookie";
import FrontCookie from 'js-cookie';
import { signOut } from 'next-auth/react';
import { infoTypeDialog } from '../components/util/dialog';

// Common Util

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

function getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}

// ----

// Front end Util

const LOADING_DISPLAY_NONE = {
    display: "none"
};
const LOADING_DISPLAY_BLOCK = {
    display: "block"
};

function hideBasedOnScopes(scopes) {
    if (checkAdmin(scopes)) {
        return LOADING_DISPLAY_BLOCK;
    } else {
        return LOADING_DISPLAY_NONE
    }
}

// ----

// Organization object realted util

function getRouterQuery(orgid) {
    for (var i = 0; i < config.SAMPLE_ORGS.length; i++) {
        if (config.SAMPLE_ORGS[i].id == orgid) {
            return config.SAMPLE_ORGS[i].routerQuery;
        }
    }
}

function getOrg(orgId) {
    for (var i = 0; i < config.SAMPLE_ORGS.length; i++) {
        if (config.SAMPLE_ORGS[i].id == orgId) {
            return config.SAMPLE_ORGS[i];
        }
    }
    return undefined;
}

function getOrgIdfromRouterQuery(routerQuery) {
    for (var i = 0; i < config.SAMPLE_ORGS.length; i++) {
        if (config.SAMPLE_ORGS[i].routerQuery == routerQuery) {
            return config.SAMPLE_ORGS[i].id;
        }
    }
    return undefined;
}

function checkCustomization(colorTheme) {
    return colorTheme == "blue" ? "rs-theme-dark" : "rs-theme-high-contrast";
}


// ----

// Routing related util

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

function redirect(path) {
    return {
        redirect: {
            destination: path,
            permanent: false,
        },
    }
}

function parseCookies(req) {
    //var cookie1 = require('cookie');
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

function orgSignout() {
    FrontCookie.remove("orgId");
    signOut({ callbackUrl: "/" });
}

function emptySession(session) {
    if (session == null || session == undefined) {
        return redirect('/signin');
    }
}

function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
}

function getLoggedUserId(token) {
    return parseJwt(token).sub;
}

// --

module.exports = {
    consoleLogInfo, consoleLogDebug, consoleLogError, stringIsEmpty,
    checkAdmin, redirect, getRouterQuery, getOrg, getOrgIdfromRouterQuery,
    checkCustomization, parseCookies, orgSignout, emptySession, getLoggedUserId, getCurrentDate, hideBasedOnScopes,
    LOADING_DISPLAY_NONE, LOADING_DISPLAY_BLOCK
};