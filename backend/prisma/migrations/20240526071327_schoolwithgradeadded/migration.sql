/*
  Warnings:

  - A unique constraint covering the columns `[gradewithschool]` on the table `GradeLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GradeLevel_grade_key";

-- AlterTable
ALTER TABLE "GradeLevel" ADD COLUMN     "gradewithschool" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "GradeLevel_gradewithschool_key" ON "GradeLevel"("gradewithschool");
