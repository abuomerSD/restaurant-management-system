/*
  Warnings:

  - You are about to drop the column `orderId` on the `Meal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_orderId_fkey";

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "orderId";
