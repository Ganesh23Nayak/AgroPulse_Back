-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'LABOUR', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BANNED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "props" AS ENUM ('tactors', 'planters', 'harvester');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "clients" (
    "customerId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "landsize" INTEGER NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Labour" (
    "labourId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ratings" INTEGER NOT NULL,
    "equipment" "props" NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Labour_pkey" PRIMARY KEY ("labourId")
);

-- CreateTable
CREATE TABLE "LabourHistory" (
    "id" SERIAL NOT NULL,
    "labourId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabourHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contactus" (
    "contactId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "msg" TEXT NOT NULL,

    CONSTRAINT "Contactus_pkey" PRIMARY KEY ("contactId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clients_userId_key" ON "clients"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Labour_userId_key" ON "Labour"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Labour" ADD CONSTRAINT "Labour_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabourHistory" ADD CONSTRAINT "LabourHistory_labourId_fkey" FOREIGN KEY ("labourId") REFERENCES "Labour"("labourId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
