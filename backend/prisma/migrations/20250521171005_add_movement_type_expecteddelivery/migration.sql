-- AlterTable
ALTER TABLE "ExpectedDelivery" ADD COLUMN     "typeId" INTEGER;

-- AddForeignKey
ALTER TABLE "ExpectedDelivery" ADD CONSTRAINT "ExpectedDelivery_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MovementType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
