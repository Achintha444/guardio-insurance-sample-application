import NextAuth from "next-auth"
import { consoleLogDebug, consoleLogInfo } from "../../../util/util";

export default NextAuth({

  providers: [
    {
      id: "wso2is",
      name: "WSO2IS",
      clientId: "UmeTFqYqqNA2PhwzbzjkmGYnv5Qa",
      clientSecret: "1qAvHbjfyDfRgDtaNEuf7U7c8xga",
      type: "oauth",
      wellKnown: process.env.WSO2IS_HOST + "/t/" + process.env.WSO2IS_TENANT_NAME + "/oauth2/token/.well-known/openid-configuration",
      // wellKnown: process.env.WSO2IS_HOST + "/o/" + process.env.NEXT_PUBLIC_WSO2IS_LIFE_ORG_ID + "/oauth2/token/.well-known/openid-configuration",
      // userinfo: process.env.WSO2IS_HOST+"/t/"+process.env.NEXT_PUBLIC_WSO2IS_LIFE_ORG_ID+"/oauth2/userinfo",
      authorization: {
        params: {
          scope: process.env.WSO2IS_SCOPES,
        }
      },
      profile(profile) {
        consoleLogDebug('User Info',this.userinfo);
        consoleLogInfo('profile', profile);
        console.log("////////");
        return {
          id: profile.sub
        }
      },
    },
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      consoleLogDebug('User jwt',user);
      consoleLogDebug('Account',account);
      consoleLogDebug('Token',token);
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token, user }) {
      consoleLogDebug('User session',user);
      session.accessToken = token.accessToken
      session.idToken = token.idToken
      return session
    }
  },
  debug: true,
})