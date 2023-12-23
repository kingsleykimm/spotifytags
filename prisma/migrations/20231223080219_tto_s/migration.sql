/*
  Warnings:

  - You are about to drop the column `song_id` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Song` table. All the data in the column will be lost.
  - Added the required column `track_id` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_tagId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "song_id",
DROP COLUMN "tagId",
ADD COLUMN     "track_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TagsOnSongs" (
    "song_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TagsOnSongs_pkey" PRIMARY KEY ("song_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "TagsOnSongs" ADD CONSTRAINT "TagsOnSongs_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnSongs" ADD CONSTRAINT "TagsOnSongs_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
