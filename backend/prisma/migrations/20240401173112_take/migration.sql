/*
  Warnings:

  - You are about to drop the column `studentId` on the `CourseMaterial` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseMaterial" DROP CONSTRAINT "CourseMaterial_studentId_fkey";

-- DropForeignKey
ALTER TABLE "CourseMaterial" DROP CONSTRAINT "CourseMaterial_subjectId_fkey";

-- AlterTable
ALTER TABLE "CourseMaterial" DROP COLUMN "studentId",
ALTER COLUMN "subjectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseMaterial" ADD CONSTRAINT "CourseMaterial_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
