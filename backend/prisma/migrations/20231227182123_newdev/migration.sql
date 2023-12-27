/*
  Warnings:

  - Added the required column `sectionn` to the `GradeLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GradeLevel" ADD COLUMN     "sectionn" TEXT NOT NULL;
