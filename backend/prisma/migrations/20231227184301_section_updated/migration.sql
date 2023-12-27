/*
  Warnings:

  - You are about to drop the column `sectionId` on the `GradeLevel` table. All the data in the column will be lost.
  - Added the required column `gradeId` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GradeLevel" DROP CONSTRAINT "GradeLevel_sectionId_fkey";

-- AlterTable
ALTER TABLE "GradeLevel" DROP COLUMN "sectionId";

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "gradeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
