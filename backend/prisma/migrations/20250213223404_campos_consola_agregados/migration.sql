/*
  Warnings:

  - You are about to drop the column `fecha_publicacion` on the `DLC` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_publicacion` on the `Juego` table. All the data in the column will be lost.
  - Added the required column `fecha_lanzamiento` to the `Consola` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Consola` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_lanzamiento` to the `DLC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_lanzamiento` to the `Juego` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consola" ADD COLUMN     "almacenamiento" DECIMAL(65,30),
ADD COLUMN     "desarrollador" TEXT,
ADD COLUMN     "fecha_lanzamiento" DATE NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DLC" DROP COLUMN "fecha_publicacion",
ADD COLUMN     "fecha_lanzamiento" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Juego" DROP COLUMN "fecha_publicacion",
ADD COLUMN     "fecha_lanzamiento" TIMESTAMP(3) NOT NULL;
