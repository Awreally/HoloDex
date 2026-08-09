/*
  Warnings:

  - You are about to drop the `Ping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ping";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "series" TEXT,
    "total" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3),
    "logoUrl" TEXT,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "imageSmall" TEXT,
    "imageLarge" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "obtainedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserCard_userId_cardId_key" ON "UserCard"("userId", "cardId");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCard" ADD CONSTRAINT "UserCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
