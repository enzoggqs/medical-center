/*
  Warnings:

  - You are about to drop the `Medicos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Medicos";

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);
