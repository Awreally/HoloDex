-- CreateTable
CREATE TABLE "PackOpening" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "setId" TEXT NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PackOpening_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PackOpening_userId_idx" ON "PackOpening"("userId");

-- AddForeignKey
ALTER TABLE "PackOpening" ADD CONSTRAINT "PackOpening_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackOpening" ADD CONSTRAINT "PackOpening_setId_fkey" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
