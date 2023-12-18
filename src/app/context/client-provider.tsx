// https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
'use client'

import { Session } from "inspector"
import { SessionProvider } from "next-auth/react"

export default function Provider ({children, session}: {children: React.ReactNode, session: any}): React.ReactNode {
    return <SessionProvider session={session}>
        {children}
    </SessionProvider>
}