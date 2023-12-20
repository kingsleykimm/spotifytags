import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import type { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import axios from "axios"
// https://www.reddit.com/r/nextjs/comments/10o6aup/next_auth_spotify_reauthentication_access_token/
// used this link to implement the authentication process
export const authOptions : NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_ID!,
            clientSecret: process.env.SPOTIFY_SECRET!,
            authorization: {params: {scope: "user-read-email playlist-modify-private playlist-modify-public"}}
            // authorization: "https://accounts.spotify.com/authorize?scope=user-read-email+playlist-modify-private+playlist-modify-public",
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
          if (account && user) {
            return {
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              accessTokenExpires: account.expires_at * 1000,
              user,
            }
          }
          if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
            return token
          }
          const newToken = await refreshAccessToken(token)
          return newToken
        },
        async session({ session, token }) {
          session.accessToken = token.accessToken
          session.error = token.error
          session.user = token.user
          return session
        },
      },
}
async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
      const basicAuth = Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString(
        'base64'
      )
      const { data } = await axios.post(
        'https://accounts.spotify.com/api/token',
        {
          grant_type: 'refresh_token',
          refresh_token: token.refreshToken,
        },
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      return {
        ...token,
        accessToken: data.access_token,
        accessTokenExpires: Date.now() + data.expires_in * 1000,
      }
    } catch (error) {
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      }
    }
  }



const handler = NextAuth(authOptions)
export {handler as GET, handler as POST }