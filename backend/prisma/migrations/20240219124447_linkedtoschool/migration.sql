/*
  Warnings:

  - You are about to drop the column `schoolYearId` on the `GradeLevel` table. All the data in the column will be lost.
  - Added the required column `schoolYearId` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GradeLevel" DROP CONSTRAINT "GradeLevel_schoolYearId_fkey";

-- AlterTable
ALTER TABLE "GradeLevel" DROP COLUMN "schoolYearId";

-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "schoolYearId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
