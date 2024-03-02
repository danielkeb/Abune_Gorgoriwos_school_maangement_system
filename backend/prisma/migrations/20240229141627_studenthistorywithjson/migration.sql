/*
  Warnings:

  - You are about to drop the column `subjectId` on the `StudentHistory` table. All the data in the column will be lost.
  - Added the required column `subjectScores` to the `StudentHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentHistory" DROP COLUMN "subjectId",
ADD COLUMN     "subjectScores" JSONB NOT NULL;
