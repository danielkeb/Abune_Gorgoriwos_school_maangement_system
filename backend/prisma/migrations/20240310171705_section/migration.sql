/*
  Warnings:

  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "_SectionToTeacher" DROP CONSTRAINT "_SectionToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_sectionId_fkey";

-- DropTable
DROP TABLE "Section";

-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gradeId" INTEGER NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTeacher" ADD CONSTRAINT "_SectionToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
