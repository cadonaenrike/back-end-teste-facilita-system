/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_nome_key" ON "users"("nome");
