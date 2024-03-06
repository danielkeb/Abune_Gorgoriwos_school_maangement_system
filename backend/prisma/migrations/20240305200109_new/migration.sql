/*
  Warnings:

  - You are about to alter the column `id` on the `Calander` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Calander" ALTER COLUMN "id" SET DATA TYPE INTEGER;
