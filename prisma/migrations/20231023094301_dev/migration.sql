/*
  Warnings:

  - You are about to drop the column `meal_name` on the `Order_Details` table. All the data in the column will be lost.
  - You are about to drop the column `meal_price` on the `Order_Details` table. All the data in the column will be lost.
  - You are about to drop the column `meal_qty` on the `Order_Details` table. All the data in the column will be lost.
  - You are about to drop the column `meal_total` on the `Order_Details` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Order_Details` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Order_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Order_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Order_Details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Order_Details` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_Details_meal_name_key";

-- AlterTable
ALTER TABLE "Order_Details" DROP COLUMN "meal_name",
DROP COLUMN "meal_price",
DROP COLUMN "meal_qty",
DROP COLUMN "meal_total",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "qty" INTEGER NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_Details_name_key" ON "Order_Details"("name");
