-- CreateEnum
CREATE TYPE "Combustivel" AS ENUM ('gasolina', 'alcool', 'flex', 'diesel', 'eletrico');

-- CreateTable
CREATE TABLE "marca" (
    "id" SERIAL NOT NULL,
    "nome_marca" TEXT NOT NULL,

    CONSTRAINT "marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "marca_id" INTEGER NOT NULL,
    "valor_fipe" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "modelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carro" (
    "id" SERIAL NOT NULL,
    "timestamp_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modelo_id" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "combustivel" "Combustivel" NOT NULL DEFAULT 'gasolina',
    "num_portas" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,

    CONSTRAINT "carro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "modelo" ADD CONSTRAINT "modelo_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marca"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carro" ADD CONSTRAINT "carro_modelo_id_fkey" FOREIGN KEY ("modelo_id") REFERENCES "modelo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
