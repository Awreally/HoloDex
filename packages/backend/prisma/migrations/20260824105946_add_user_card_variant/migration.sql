/*
  Warnings:

  - A unique constraint covering the columns `[userId,cardId,variant]` on the table `UserCard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variant` to the `UserCard` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserCard_userId_cardId_key";

-- AlterTable
ALTER TABLE "UserCard" ADD COLUMN     "variant" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserCard_userId_cardId_variant_key" ON "UserCard"("userId", "cardId", "variant");
