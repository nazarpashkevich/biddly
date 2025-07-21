/*
  Warnings:

  - You are about to drop the `_AuctionLots` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `auction_id` to the `lots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_AuctionLots" DROP CONSTRAINT "_AuctionLots_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuctionLots" DROP CONSTRAINT "_AuctionLots_B_fkey";

-- AlterTable
ALTER TABLE "lots" ADD COLUMN     "auction_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AuctionLots";

-- AddForeignKey
ALTER TABLE "lots" ADD CONSTRAINT "lots_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
