/*
  Warnings:

  - You are about to drop the column `current_price` on the `auctions` table. All the data in the column will be lost.
  - You are about to drop the column `starting_price` on the `auctions` table. All the data in the column will be lost.
  - You are about to drop the column `winner_id` on the `auctions` table. All the data in the column will be lost.
  - You are about to drop the column `auction_id` on the `bids` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `lots` table. All the data in the column will be lost.
  - Added the required column `lot_id` to the `bids` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_price` to the `lots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starting_price` to the `lots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "auctions" DROP CONSTRAINT "auctions_winner_id_fkey";

-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_auction_id_fkey";

-- DropForeignKey
ALTER TABLE "lots" DROP CONSTRAINT "lots_user_id_fkey";

-- AlterTable
ALTER TABLE "auctions" DROP COLUMN "current_price",
DROP COLUMN "starting_price",
DROP COLUMN "winner_id";

-- AlterTable
ALTER TABLE "bids" DROP COLUMN "auction_id",
ADD COLUMN     "lot_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lots" DROP COLUMN "user_id",
ADD COLUMN     "current_price" INTEGER NOT NULL,
ADD COLUMN     "is_sold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "starting_price" INTEGER NOT NULL,
ADD COLUMN     "winner_id" INTEGER;

-- AddForeignKey
ALTER TABLE "lots" ADD CONSTRAINT "lots_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "lots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
