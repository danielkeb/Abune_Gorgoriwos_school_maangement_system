/*
  Warnings:

  - You are about to drop the column `teacherId` on the `GradeLevel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GradeLevel" DROP CONSTRAINT "GradeLevel_teacherId_fkey";

-- AlterTable
ALTER TABLE "GradeLevel" DROP COLUMN "teacherId";

-- CreateTable
CREATE TABLE "_GradeLevelToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GradeLevelToTeacher_AB_unique" ON "_GradeLevelToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_GradeLevelToTeacher_B_index" ON "_GradeLevelToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "GradeLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("user_Id") ON DELETE CASCADE ON UPDATE CASCADE;
