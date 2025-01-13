-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "categoría" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "código" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "diseños" TEXT[],
    "hojas" TEXT NOT NULL,
    "cantidadCaja" TEXT NOT NULL,
    "img1" TEXT NOT NULL,
    "img2" TEXT[],
    "texto" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CotizaAqui" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "industria" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "preferencia" TEXT NOT NULL,

    CONSTRAINT "CotizaAqui_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contactanos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "apellido" TEXT,
    "correo" TEXT,

    CONSTRAINT "Contactanos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReclamaAqui" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,

    CONSTRAINT "ReclamaAqui_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_código_key" ON "Product"("código");
