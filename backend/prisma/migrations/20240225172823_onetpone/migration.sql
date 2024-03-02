/*
  Warnings:

  - You are about to drop the `_GradeLevelToSubject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gradeId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GradeLevelToSubject" DROP CONSTRAINT "_GradeLevelToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_GradeLevelToSubject" DROP CONSTRAINT "_GradeLevelToSubject_B_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "gradeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_GradeLevelToSubject";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
