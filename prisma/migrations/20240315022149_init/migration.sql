/*
  Warnings:

  - Added the required column `address` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landsize` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "landsize" INTEGER NOT NULL;
