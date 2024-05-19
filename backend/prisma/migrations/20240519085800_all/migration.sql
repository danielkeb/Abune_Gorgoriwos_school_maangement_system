-- CreateTable
CREATE TABLE "schools" (
    "id" SERIAL NOT NULL,
    "school_name" TEXT NOT NULL,
    "school_address" TEXT NOT NULL,
    "school_phone" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "schoolYearId" INTEGER NOT NULL,

    CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "frist_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "address" TEXT,
    "image" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "date_of_birth" TEXT NOT NULL,
    "loggedInAt" TIMESTAMP(3),
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "school_Id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachers" (
    "education_level" TEXT NOT NULL,
    "user_Id" INTEGER NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("user_Id")
);

-- CreateTable
CREATE TABLE "students" (
    "careof_contact1" TEXT NOT NULL,
    "careof_contact2" TEXT,
    "user_Id" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "firstrank" INTEGER,
    "secondtrank" INTEGER,
    "overallrank" INTEGER,
    "firstScore" DOUBLE PRECISION,
    "secondScore" DOUBLE PRECISION,
    "overallScore" DOUBLE PRECISION,

    CONSTRAINT "students_pkey" PRIMARY KEY ("user_Id")
);

-- CreateTable
CREATE TABLE "GradeLevel" (
    "id" SERIAL NOT NULL,
    "grade" TEXT NOT NULL,
    "classType" TEXT,

    CONSTRAINT "GradeLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gradeId" INTEGER NOT NULL,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reset" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shortcode" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teacherId" INTEGER,
    "gradeId" INTEGER,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "test1" DOUBLE PRECISION,
    "assignmentScore1" DOUBLE PRECISION,
    "midtermScore1" DOUBLE PRECISION,
    "finalExamScore1" DOUBLE PRECISION,
    "totalScore1" DOUBLE PRECISION,
    "test2" DOUBLE PRECISION,
    "assignmentScore2" DOUBLE PRECISION,
    "midtermScore2" DOUBLE PRECISION,
    "finalExamScore2" DOUBLE PRECISION,
    "totalScore2" DOUBLE PRECISION,
    "sectionId" INTEGER,
    "teacherId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "gradeLevelId" INTEGER NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolYear" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,

    CONSTRAINT "SchoolYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "schoolYearId" INTEGER NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentHistory" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "totalScore1" INTEGER NOT NULL,
    "totalScore2" INTEGER NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "firstRank" INTEGER NOT NULL,
    "secondRank" INTEGER NOT NULL,
    "overallRank" INTEGER NOT NULL,
    "subjectScores" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Calander" (
    "sub" SERIAL NOT NULL,
    "id" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "allDay" BOOLEAN NOT NULL,

    CONSTRAINT "Calander_pkey" PRIMARY KEY ("sub")
);

-- CreateTable
CREATE TABLE "CourseMaterial" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StudentToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GradeLevelToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SectionToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseMaterialToGradeLevel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "schools_id_idx" ON "schools"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "users"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "GradeLevel_grade_key" ON "GradeLevel"("grade");

-- CreateIndex
CREATE UNIQUE INDEX "results_subjectId_studentId_key" ON "results"("subjectId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseMaterial_file_key" ON "CourseMaterial"("file");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToSubject_AB_unique" ON "_StudentToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToSubject_B_index" ON "_StudentToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GradeLevelToTeacher_AB_unique" ON "_GradeLevelToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_GradeLevelToTeacher_B_index" ON "_GradeLevelToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SectionToTeacher_AB_unique" ON "_SectionToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_SectionToTeacher_B_index" ON "_SectionToTeacher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseMaterialToGradeLevel_AB_unique" ON "_CourseMaterialToGradeLevel"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseMaterialToGradeLevel_B_index" ON "_CourseMaterialToGradeLevel"("B");

-- AddForeignKey
ALTER TABLE "schools" ADD CONSTRAINT "schools_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_school_Id_fkey" FOREIGN KEY ("school_Id") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("user_Id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "GradeLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_gradeLevelId_fkey" FOREIGN KEY ("gradeLevelId") REFERENCES "GradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentHistory" ADD CONSTRAINT "StudentHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMaterial" ADD CONSTRAINT "CourseMaterial_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("user_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseMaterial" ADD CONSTRAINT "CourseMaterial_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "students"("user_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StudentToSubject" ADD CONSTRAINT "_StudentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "GradeLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeLevelToTeacher" ADD CONSTRAINT "_GradeLevelToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("user_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTeacher" ADD CONSTRAINT "_SectionToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectionToTeacher" ADD CONSTRAINT "_SectionToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("user_Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseMaterialToGradeLevel" ADD CONSTRAINT "_CourseMaterialToGradeLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "CourseMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseMaterialToGradeLevel" ADD CONSTRAINT "_CourseMaterialToGradeLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "GradeLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
