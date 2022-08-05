import NextAuth from "next-auth"
import { consoleLogDebug, consoleLogInfo, getLoginOrgId } from "../../../util/util";

export default NextAuth({

  providers: [
    {
      id: "wso2is",
      name: "WSO2IS",
      clientId: "Q3M7aSzMJQMzmHG7Jrintgn6wCka",
      clientSecret: "RhGob0Kqof4xA2Oepp9rZJz2OYsa",
      type: "oauth",
      wellKnown: process.env.WSO2IS_HOST + "/t/" + process.env.WSO2IS_TENANT_NAME + "/oauth2/token/.well-known/openid-configuration",
      userinfo: process.env.WSO2IS_HOST+"/t/"+process.env.WSO2IS_TENANT_NAME+"/scim2/Me",
      // wellKnown: process.env.WSO2IS_HOST + "/o/" + process.env.NEXT_PUBLIC_WSO2IS_LIFE_ORG_ID + "/oauth2/token/.well-known/openid-configuration",
      // userinfo: process.env.WSO2IS_HOST+"/t/"+process.env.NEXT_PUBLIC_WSO2IS_LIFE_ORG_ID+"/oauth2/userinfo",
      authorization: {
        params: {
          scope: process.env.WSO2IS_SCOPES,
        }
      },
      profile(profile) {
        return {
          id: profile.sub
        }
      },
    },
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      consoleLogDebug('token',token);
      consoleLogDebug('user',user);
      consoleLogDebug('account',account);
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.scope = account.scope
      }
      return token
    },
    async session({ session, token, user }) {
     
      session.accessToken = token.accessToken
      session.idToken = token.idToken
      session.scope = token.scope

      consoleLogDebug('session',session);

      return session
    }
  },
  debug: true,
})