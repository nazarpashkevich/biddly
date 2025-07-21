-- AlterTable
ALTER TABLE "lots" ADD COLUMN     "pictureSrc" TEXT,
ALTER COLUMN "current_price" DROP NOT NULL;
