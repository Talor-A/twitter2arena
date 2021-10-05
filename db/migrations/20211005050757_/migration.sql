/*
  Warnings:

  - A unique constraint covering the columns `[site,userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `site` on the `Profile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('TWITTER', 'ARENA');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "site",
ADD COLUMN     "site" "AuthProvider" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_site_userId_key" ON "Profile"("site", "userId");
