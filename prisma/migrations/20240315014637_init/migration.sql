-- CreateTable
CREATE TABLE "LabourHistory" (
    "id" SERIAL NOT NULL,
    "labourId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabourHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LabourHistory" ADD CONSTRAINT "LabourHistory_labourId_fkey" FOREIGN KEY ("labourId") REFERENCES "Labour"("labourId") ON DELETE RESTRICT ON UPDATE CASCADE;
