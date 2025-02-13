-- CreateTable
CREATE TABLE "Juego" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "modoDeJuegoId" INTEGER NOT NULL,
    "generoId" INTEGER NOT NULL,
    "consolaId" INTEGER NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,
    "peso" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Juego_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DLC" (
    "id" SERIAL NOT NULL,
    "juegoId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,
    "peso" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "DLC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consola" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

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

-- AddForeignKey
ALTER TABLE "Juego" ADD CONSTRAINT "Juego_modoDeJuegoId_fkey" FOREIGN KEY ("modoDeJuegoId") REFERENCES "ModoDeJuego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Juego" ADD CONSTRAINT "Juego_generoId_fkey" FOREIGN KEY ("generoId") REFERENCES "Genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Juego" ADD CONSTRAINT "Juego_consolaId_fkey" FOREIGN KEY ("consolaId") REFERENCES "Consola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DLC" ADD CONSTRAINT "DLC_juegoId_fkey" FOREIGN KEY ("juegoId") REFERENCES "Juego"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
