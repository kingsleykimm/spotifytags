import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(
    email: string, name: string, spotify_id: string
) {
    const user = await prisma.user.create({
        data : {
            email: email,
            name: name,
            spotify_id: spotify_id,
        },
    })
}



export async function createTag(
    user_email : string, tag_name : string
)  {
    const user : object | null  = prisma.user.findUnique({
        where: {
            email: user_email,
        },
        select: {
            id: true,
        }
    })
    const tag = await prisma.tag.create({
        data: {
            tag_name: tag_name,
            authorId: user.id,
        }
    })
}
    // get user from user_email
    // get song id from song name, assign it to this gag
    // create Tag


    export async function addTagToSong (song_name: string, tagname: string, user_email:  string) {
    
    // get tag first, using tag_name. If tag doesn't exist create one
    let tag : object | null = await prisma.tag.findUnique({
      where : {
        tag_name: tagname,
      }
    })
    if(tag == null) {
        createTag(user_email, tagname);
       // use createTag here 
    }
    // create song, then add tag to song and vice versa
    const song = await prisma.song.create({
        data: {

        }
    })
 //To-do
}
export async function deleteTag(name : string) {
    const deleteTag = await prisma.tag.delete ({
        where: {
            tag_name: name,
        }
    })
}

export async function editTag() {

}

export async function getSongsWithTag() {

}
export async function addSong (name : string) {
    //To-do , adds song to database
    const song = await prisma.user.create({
        data : {
            song_name: name,
        }
    })
}