/*
  Warnings:

  - You are about to drop the column `userType` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `Secretary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "userType";

-- AlterTable
ALTER TABLE "Secretary" DROP COLUMN "userType";
