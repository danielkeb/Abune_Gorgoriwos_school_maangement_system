-- CreateTable
CREATE TABLE "_SectionToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SectionToTeacher_AB_unique" ON "_SectionToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SectionToTeacher_B_index" ON "_SectionToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_SectionToTeacher" ADD CONSTRAINT "_SectionToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTeacher" ADD CONSTRAINT "_SectionToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("user_Id") ON DELETE CASCADE ON UPDATE CASCADE;
