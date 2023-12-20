import Image from 'next/image'
import styles from './page.module.css'
import { SongSearch } from "./utils/spotifyAPI"
interface Track {
  song_name: string,
  artist_name: string,
  album_name: string,
}
export default function Home() {
  getSongs("Sugar")

  return (
    <main className={styles.main}>
     
    </main>
  )
  }
async function getSongs(query : string) {
  const data = await SongSearch(query)


}


