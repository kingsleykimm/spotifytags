import styles from "../page.module.css"
// server-side component
import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginPage() {

    const {data : session } = useSession()
    if (session) {
        return (
            <>
            Signed in as {session.user!.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign In</button>
        </>
    )

}