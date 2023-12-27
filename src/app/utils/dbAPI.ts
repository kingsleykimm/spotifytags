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
    const user :  object | number | null = prisma.user.findUnique({
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
            author: user,
        }
    })
}
    // get user from user_email
    // get song id from song name, assign it to this gag
    // create Tag


export async function addTagToSong () {
 //To-do
}
export async function deleteTag() {

}

export async function editTag() {

}

export async function getSongsWithTag() {

}
export async function addSong () {
    //To-do , adds song to database
}