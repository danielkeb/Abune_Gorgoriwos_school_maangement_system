/*
  Warnings:

  - You are about to drop the column `section` on the `GradeLevel` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `GradeLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradeLevel" DROP COLUMN "section",
ADD COLUMN     "sectionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GradeLevel" ADD CONSTRAINT "GradeLevel_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
