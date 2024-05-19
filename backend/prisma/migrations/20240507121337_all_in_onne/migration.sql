-- CreateTable
CREATE TABLE "Reset" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "shortcode" TEXT NOT NULL,

    CONSTRAINT "Reset_pkey" PRIMARY KEY ("id")
);
