/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "arenaProfile" JSONB,
ADD COLUMN     "twitterProfile" JSONB;

-- DropTable
DROP TABLE "Profile";

-- DropEnum
DROP TYPE "AuthProvider";
