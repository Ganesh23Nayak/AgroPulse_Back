/*
  Warnings:

  - Made the column `equipment` on table `Labour` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Labour" ALTER COLUMN "equipment" SET NOT NULL;
