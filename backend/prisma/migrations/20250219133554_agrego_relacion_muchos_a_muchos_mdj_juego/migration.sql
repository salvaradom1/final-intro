/*
  Warnings:

  - You are about to drop the column `modoDeJuegoId` on the `Juego` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Juego" DROP CONSTRAINT "Juego_modoDeJuegoId_fkey";

-- AlterTable
ALTER TABLE "Consola" ALTER COLUMN "tipo" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Juego" DROP COLUMN "modoDeJuegoId";

-- CreateTable
CREATE TABLE "_JuegoModoDeJuego" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JuegoModoDeJuego_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JuegoModoDeJuego_B_index" ON "_JuegoModoDeJuego"("B");

-- AddForeignKey
ALTER TABLE "_JuegoModoDeJuego" ADD CONSTRAINT "_JuegoModoDeJuego_A_fkey" FOREIGN KEY ("A") REFERENCES "Juego"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JuegoModoDeJuego" ADD CONSTRAINT "_JuegoModoDeJuego_B_fkey" FOREIGN KEY ("B") REFERENCES "ModoDeJuego"("id") ON DELETE CASCADE ON UPDATE CASCADE;
