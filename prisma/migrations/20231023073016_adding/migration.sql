-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "orderId" INTEGER;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_Details" (
    "meal_name" TEXT NOT NULL,
    "meal_price" DOUBLE PRECISION NOT NULL,
    "meal_qty" INTEGER NOT NULL,
    "meal_total" DOUBLE PRECISION NOT NULL,
    "orderID" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_Details_meal_name_key" ON "Order_Details"("meal_name");

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_Details" ADD CONSTRAINT "Order_Details_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
