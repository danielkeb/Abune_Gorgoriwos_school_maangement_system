/*
  Warnings:

  - The primary key for the `Calander` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Calander" DROP CONSTRAINT "Calander_pkey",
ALTER COLUMN "id" SET DATA TYPE BIGINT,
ADD CONSTRAINT "Calander_pkey" PRIMARY KEY ("id");