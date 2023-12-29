/*
  Warnings:

  - Added the required column `song_name` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "song_name" TEXT NOT NULL,
ALTER COLUMN "track_id" DROP NOT NULL;
