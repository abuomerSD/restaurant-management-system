/*
  Warnings:

  - The primary key for the `Order_Details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detailsID` on the `Order_Details` table. All the data in the column will be lost.
  - The required column `id` was added to the `Order_Details` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Order_Details" DROP CONSTRAINT "Order_Details_pkey",
DROP COLUMN "detailsID",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Order_Details_pkey" PRIMARY KEY ("id");
