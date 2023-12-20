import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";


export async function SongSearch (song_name : string)  {
    const session = await getServerSession(authOptions)
    try {
    const basicAuth = Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString(
        'base64')

    const { data } = await axios.get(

        'https://api.spotify.com/v1/search', {
            params: {
                q: song_name,
                type: "track",
                market: "US",
            },
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                'Content-Type': 'application/json',
              },
        }


        
    )
    // what information would we need for each track?
    // song_name, artist_name, genres, album, 
    console.log(data)
    let trackObjects  = data.tracks.items
    console.log(trackObjects[0])
    let trackObjectsFiltered = trackObjects.map((cur) => {cur.name, cur.artists[0].name, cur.album })
    console.log(trackObjectsFiltered)
    return trackObjectsFiltered
    }

    catch (error) {
        let err : Track[] = []
        return {
            ...err,
            error: "What happened"
        }
    }
}

SongSearch("Sugar")