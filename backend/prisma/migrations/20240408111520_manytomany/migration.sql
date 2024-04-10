-- CreateTable
CREATE TABLE "_CourseMaterialToGradeLevel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseMaterialToGradeLevel_AB_unique" ON "_CourseMaterialToGradeLevel"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseMaterialToGradeLevel_B_index" ON "_CourseMaterialToGradeLevel"("B");

-- AddForeignKey
ALTER TABLE "_CourseMaterialToGradeLevel" ADD CONSTRAINT "_CourseMaterialToGradeLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseMaterialToGradeLevel" ADD CONSTRAINT "_CourseMaterialToGradeLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "GradeLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
