import NextAuth, { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
        expiresInMins: 30, // optional, defaults to 60
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.token,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fallback if new one not returned
      expiresAt: Date.now() + 60 * 60 * 1000, 
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
            expiresInMins: 30, // optional, defaults to 60
          }),
        })

        const user = await res.json()

        if (res.ok && user) {
          return user // Se pueden definir que datos se quieren devolver para usarlos en el callback
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken ?? "dummy-refresh-token", // Dummyjson might not return it
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.image,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          expiresAt: Date.now() + 60 * 60 * 1000, // 60 minutes
        }
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      if(token) {
        session.user.accessToken = token.accessToken
        session.user.id = token.id
        session.user.username = token.username
        session.user.email = token.email
        session.user.image = token.image
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.gender = token.gender
        session.error = token.error
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

