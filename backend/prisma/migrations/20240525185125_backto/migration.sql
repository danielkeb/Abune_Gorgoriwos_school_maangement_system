/*
  Warnings:

  - A unique constraint covering the columns `[grade]` on the table `GradeLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GradeLevel_grade_key" ON "GradeLevel"("grade");
