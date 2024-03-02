-- AlterTable
ALTER TABLE "students" ALTER COLUMN "sectionId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "date_of_birth" DROP DEFAULT,
ALTER COLUMN "gender" DROP DEFAULT;
