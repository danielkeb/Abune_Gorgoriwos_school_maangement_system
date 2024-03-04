/*
  Warnings:

  - You are about to drop the column `rank_both_simester1` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `rank_simester1` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `rank_simester2` on the `students` table. All the data in the column will be lost.
  - You are about to drop the `SubjectTotals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubjectTotals" DROP CONSTRAINT "SubjectTotals_studentId_fkey";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "rank_both_simester1",
DROP COLUMN "rank_simester1",
DROP COLUMN "rank_simester2";

-- DropTable
DROP TABLE "SubjectTotals";
