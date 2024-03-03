-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_school_Id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "school_Id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_school_Id_fkey" FOREIGN KEY ("school_Id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
