import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";

interface Track {
    song_name: string,
    artist_name: string,
    album_name: string,
}
export async function SongSearch (song_name : string)  {
    const session = await getServerSession(authOptions)
    try {
    const basicAuth = Buffer.from(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString(
        'base64')
    const { data } = await axios.post(

        'https://api.spotify.com/v1/search',
        {
            q: song_name,
            type: "track",
            market: "US",
        },
        {
            headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
            }
        }
    )
    // what information would we need for each track?
    // song_name, artist_name, genres, album, 
    console.log("check")
    let trackObjects  = data.tracks.items
    let trackObjectsFiltered : Track[] = trackObjects.map((cur : any) => {cur.name, cur.artists[0].name, cur.album })
    for(let i = 0; i < trackObjectsFiltered.length; i++) {
        console.log(trackObjectsFiltered[i])
    }
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