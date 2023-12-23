import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";

interface Track {
    track_name : string,
    artist : string,
    album : string,
}

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

    let trackObjects  = data.tracks.items

    let trackObjectsFiltered : Track[] = []
    // let trackObjectsFiltered = trackObjects.map((cur) => {cur.name, cur.artists[0].name, cur.album.name})
    for(let i = 0; i < trackObjects.length; i++) {
        let track : any = trackObjects[i]
        let new_track : Track = {
            track_name : track.name,
            artist: track.artists[0].name,
            album: track.album.name,
        }
        trackObjectsFiltered.push(new_track)
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


export async function createPlaylistFromSongs() {
    
}