/*
  Warnings:

  - You are about to drop the column `schoolYearId` on the `schools` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "schools" DROP CONSTRAINT "schools_schoolYearId_fkey";

-- AlterTable
ALTER TABLE "schools" DROP COLUMN "schoolYearId";
