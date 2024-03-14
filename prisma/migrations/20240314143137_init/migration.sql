/*
  Warnings:

  - You are about to drop the column `message` on the `Contactus` table. All the data in the column will be lost.
  - Added the required column `msg` to the `Contactus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contactus" DROP COLUMN "message",
ADD COLUMN     "msg" TEXT NOT NULL;
