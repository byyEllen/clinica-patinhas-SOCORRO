-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raca" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "donoId" TEXT NOT NULL,
    "donoNome" TEXT NOT NULL,
    "donoTelefone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,
    "petNome" TEXT NOT NULL,
    "donoNome" TEXT NOT NULL,
    "donoTelefone" TEXT NOT NULL,
    "veterinario" TEXT NOT NULL,
    "motivo" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vacinas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "precoFilhote" DOUBLE PRECISION NOT NULL,
    "precoAdulto" DOUBLE PRECISION NOT NULL,
    "idadeMinima" INTEGER NOT NULL,

    CONSTRAINT "vacinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carteiras_saude" (
    "id" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "carteiras_saude_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_VacinasAplicadas" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VacinasAplicadas_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_VacinasPendentes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_VacinasPendentes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "carteiras_saude_petId_key" ON "carteiras_saude"("petId");

-- CreateIndex
CREATE INDEX "_VacinasAplicadas_B_index" ON "_VacinasAplicadas"("B");

-- CreateIndex
CREATE INDEX "_VacinasPendentes_B_index" ON "_VacinasPendentes"("B");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carteiras_saude" ADD CONSTRAINT "carteiras_saude_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VacinasAplicadas" ADD CONSTRAINT "_VacinasAplicadas_A_fkey" FOREIGN KEY ("A") REFERENCES "carteiras_saude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VacinasAplicadas" ADD CONSTRAINT "_VacinasAplicadas_B_fkey" FOREIGN KEY ("B") REFERENCES "vacinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VacinasPendentes" ADD CONSTRAINT "_VacinasPendentes_A_fkey" FOREIGN KEY ("A") REFERENCES "carteiras_saude"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VacinasPendentes" ADD CONSTRAINT "_VacinasPendentes_B_fkey" FOREIGN KEY ("B") REFERENCES "vacinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
