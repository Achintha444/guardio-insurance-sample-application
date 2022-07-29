import NextAuth from "next-auth"

export default NextAuth({

  providers: [
    {
      id: "wso2is",
      name: "WSO2IS",
      clientId: process.env.WSO2IS_CLIENT_ID,
      clientSecret: process.env.WSO2IS_CLIENT_SECRET,
      type: "oauth",
      wellKnown: process.env.WSO2IS_HOST + "/o/" + process.env.NEXT_PUBLIC_WSO2IS_LIFE_ORG_ID + "/oauth2/token/.well-known/openid-configuration",
      userinfo: process.env.WSO2IS_HOST+"/t/"+process.env.NEXT_PUBLIC_WSO2IS_LIFE_ORG_ID+"oauth2/userinfo",
      authorization: {
        params: {
          scope: process.env.WSO2IS_SCOPES,
        }
      },
      profile(profile) {
        console.log("///////")
        console.log(this.userinfo);
        console.log(profile);
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
      console.log(user);
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }
      return token
    },
    async session({ session, token, user }) {
      console.log(user);
      session.accessToken = token.accessToken
      session.idToken = token.idToken
      return session
    }
  },
  debug: true,
})