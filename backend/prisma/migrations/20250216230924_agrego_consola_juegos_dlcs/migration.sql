-- CreateTable
CREATE TABLE "Juego" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "modoDeJuegoId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,
    "fecha_lanzamiento" TIMESTAMP(3) NOT NULL,
    "peso" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Juego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DLC" (
    "id" SERIAL NOT NULL,
    "juegoId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_lanzamiento" TIMESTAMP(3) NOT NULL,
    "peso" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "DLC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consola" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "fecha_lanzamiento" DATE,
    "desarrollador" TEXT,
    "almacenamiento" DECIMAL(65,30),
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Consola_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModoDeJuego" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "ModoDeJuego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genero" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JuegoConsola" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_JuegoConsola_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JuegoConsola_B_index" ON "_JuegoConsola"("B");

-- AddForeignKey
ALTER TABLE "Juego" ADD CONSTRAINT "Juego_modoDeJuegoId_fkey" FOREIGN KEY ("modoDeJuegoId") REFERENCES "ModoDeJuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Juego" ADD CONSTRAINT "Juego_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DLC" ADD CONSTRAINT "DLC_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JuegoConsola" ADD CONSTRAINT "_JuegoConsola_A_fkey" FOREIGN KEY ("A") REFERENCES "Consola"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JuegoConsola" ADD CONSTRAINT "_JuegoConsola_B_fkey" FOREIGN KEY ("B") REFERENCES "Juego"("id") ON DELETE CASCADE ON UPDATE CASCADE;
