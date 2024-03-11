-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_teacherId_fkey";

-- AlterTable
ALTER TABLE "results" ALTER COLUMN "teacherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("user_Id") ON DELETE SET NULL ON UPDATE CASCADE;
