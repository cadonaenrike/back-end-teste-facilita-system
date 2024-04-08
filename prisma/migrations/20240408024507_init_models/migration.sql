/*
  Warnings:

  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tarefa";

-- CreateTable
CREATE TABLE "tarefas" (
    "codigo" SERIAL NOT NULL,
    "idUser" INTEGER NOT NULL,
    "tarefa" TEXT NOT NULL,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "token" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
