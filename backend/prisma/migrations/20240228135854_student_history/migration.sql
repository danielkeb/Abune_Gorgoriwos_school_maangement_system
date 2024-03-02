-- CreateTable
CREATE TABLE "StudentHistory" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentHistory" ADD CONSTRAINT "StudentHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
