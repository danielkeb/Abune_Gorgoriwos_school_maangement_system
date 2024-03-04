-- CreateTable
CREATE TABLE "SubjectTotals" (
    "id" SERIAL NOT NULL,
    "totalScore1" INTEGER,
    "totalScore2" INTEGER,
    "studentId" INTEGER,

    CONSTRAINT "SubjectTotals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubjectTotals_studentId_key" ON "SubjectTotals"("studentId");

-- AddForeignKey
ALTER TABLE "SubjectTotals" ADD CONSTRAINT "SubjectTotals_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("user_Id") ON DELETE SET NULL ON UPDATE CASCADE;
