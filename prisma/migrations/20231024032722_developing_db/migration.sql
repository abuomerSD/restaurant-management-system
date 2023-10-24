/*
  Warnings:

  - The required column `detailsID` was added to the `Order_Details` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "Order_Details_name_key";

-- AlterTable
ALTER TABLE "Order_Details" ADD COLUMN     "detailsID" TEXT NOT NULL,
ADD CONSTRAINT "Order_Details_pkey" PRIMARY KEY ("detailsID");
