/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,studentId]` on the table `results` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "loggedInAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "results_subjectId_studentId_key" ON "results"("subjectId", "studentId");
