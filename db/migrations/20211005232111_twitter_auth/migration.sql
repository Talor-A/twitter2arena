-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twitterAuthId" INTEGER;

-- CreateTable
CREATE TABLE "TwitterAuth" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "TwitterAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TwitterAuth_userId_key" ON "TwitterAuth"("userId");

-- AddForeignKey
ALTER TABLE "TwitterAuth" ADD CONSTRAINT "TwitterAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
