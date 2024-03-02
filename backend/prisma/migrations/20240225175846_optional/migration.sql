-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_gradeId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_teacherId_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "teacherId" DROP NOT NULL,
ALTER COLUMN "gradeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("user_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
