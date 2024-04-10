/*
  Warnings:

  - A unique constraint covering the columns `[file]` on the table `CourseMaterial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseMaterial" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseMaterial_file_key" ON "CourseMaterial"("file");
