/*
  Warnings:

  - You are about to drop the column `generoId` on the `Juego` table. All the data in the column will be lost.
  - You are about to drop the `Genero` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Juego" DROP CONSTRAINT "Juego_generoId_fkey";

-- AlterTable
ALTER TABLE "Juego" DROP COLUMN "generoId";

-- DropTable
DROP TABLE "Genero";
