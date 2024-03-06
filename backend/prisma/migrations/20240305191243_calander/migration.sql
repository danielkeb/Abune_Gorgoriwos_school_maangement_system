-- CreateTable
CREATE TABLE "Calander" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "start" TEXT NOT NULL,
    "allDay" BOOLEAN NOT NULL,

    CONSTRAINT "Calander_pkey" PRIMARY KEY ("id")
);
