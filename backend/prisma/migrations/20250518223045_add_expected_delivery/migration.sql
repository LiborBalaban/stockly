-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "expectedDeliveryId" INTEGER;

-- CreateTable
CREATE TABLE "ExpectedDelivery" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER,
    "storageId" INTEGER NOT NULL,
    "invoiceNumber" INTEGER,
    "uploadedById" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExpectedDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpectedDeliveryItem" (
    "id" SERIAL NOT NULL,
    "deliveryId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "note" VARCHAR(255),

    CONSTRAINT "ExpectedDeliveryItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_expectedDeliveryId_fkey" FOREIGN KEY ("expectedDeliveryId") REFERENCES "ExpectedDelivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpectedDelivery" ADD CONSTRAINT "ExpectedDelivery_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpectedDelivery" ADD CONSTRAINT "ExpectedDelivery_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpectedDelivery" ADD CONSTRAINT "ExpectedDelivery_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpectedDeliveryItem" ADD CONSTRAINT "ExpectedDeliveryItem_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "ExpectedDelivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpectedDeliveryItem" ADD CONSTRAINT "ExpectedDeliveryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
