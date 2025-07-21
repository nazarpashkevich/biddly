/*
  Warnings:

  - You are about to drop the column `lot_id` on the `auctions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "auctions" DROP CONSTRAINT "auctions_lot_id_fkey";

-- AlterTable
ALTER TABLE "auctions" DROP COLUMN "lot_id";

-- CreateTable
CREATE TABLE "_AuctionLots" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AuctionLots_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AuctionLots_B_index" ON "_AuctionLots"("B");

-- AddForeignKey
ALTER TABLE "_AuctionLots" ADD CONSTRAINT "_AuctionLots_A_fkey" FOREIGN KEY ("A") REFERENCES "auctions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuctionLots" ADD CONSTRAINT "_AuctionLots_B_fkey" FOREIGN KEY ("B") REFERENCES "lots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
