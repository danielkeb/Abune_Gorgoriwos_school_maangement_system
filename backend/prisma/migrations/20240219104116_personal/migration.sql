/*
  Warnings:

  - Added the required column `sectionId` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "sectionId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "date_of_birth" TEXT NOT NULL DEFAULT '19/2/2024',
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'male';

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
