-- DropForeignKey
ALTER TABLE "Juego" DROP CONSTRAINT "Juego_consolaId_fkey";

-- CreateTable
CREATE TABLE "_JuegoConsola" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JuegoConsola_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JuegoConsola_B_index" ON "_JuegoConsola"("B");

-- AddForeignKey
ALTER TABLE "_JuegoConsola" ADD CONSTRAINT "_JuegoConsola_A_fkey" FOREIGN KEY ("A") REFERENCES "Consola"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JuegoConsola" ADD CONSTRAINT "_JuegoConsola_B_fkey" FOREIGN KEY ("B") REFERENCES "Juego"("id") ON DELETE CASCADE ON UPDATE CASCADE;
