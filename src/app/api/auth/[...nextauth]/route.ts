import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import type { AuthOptions } from "next-auth"

export const authOptions : AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_ID!,
            clientSecret: process.env.SPOTIFY_SECRET!,
        })
    ],
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST }