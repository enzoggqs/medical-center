-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "userType" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Secretary" ADD COLUMN     "userType" INTEGER NOT NULL DEFAULT 2;
