-- CreateTable
CREATE TABLE "_SubjectSection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectSection_AB_unique" ON "_SubjectSection"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectSection_B_index" ON "_SubjectSection"("B");

-- AddForeignKey
ALTER TABLE "_SubjectSection" ADD CONSTRAINT "_SubjectSection_A_fkey" FOREIGN KEY ("A") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectSection" ADD CONSTRAINT "_SubjectSection_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
