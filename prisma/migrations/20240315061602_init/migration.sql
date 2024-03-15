/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Ratings` to the `Labour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_customerId_fkey";

-- AlterTable
ALTER TABLE "Labour" ADD COLUMN     "Ratings" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Plan";

-- CreateTable
CREATE TABLE "Clients" (
    "customerId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("customerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_userId_key" ON "Clients"("userId");

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
