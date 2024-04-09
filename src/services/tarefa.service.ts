import { PrismaClient, Tarefa as PrismaTarefa } from "@prisma/client";

export class TarefaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createTarefa(
    idUser: number,
    tarefa: string
  ): Promise<PrismaTarefa> {
    if (!tarefa || typeof tarefa !== "string" || tarefa.trim() === "") {
      throw new Error(
        "A tarefa é obrigatória e deve ser uma string não vazia."
      );
    }

    // Cria uma nova tarefa associada ao idUser fornecido
    return await this.prisma.tarefa.create({
      data: {
        idUser, // Associa a tarefa ao usuário
        tarefa, // Usa o campo conforme definido no esquema
      },
    });
  }

  public async getAllTarefas(idUser: number): Promise<PrismaTarefa[]> {
    // Retorna todas as tarefas associadas ao idUser
    return this.prisma.tarefa.findMany({
      where: {
        idUser, // Filtra as tarefas pelo idUser
      },
    });
  }

  public async getTarefaByCodigo(
    idUser: number,
    codigo: number
  ): Promise<PrismaTarefa | null> {
    // Retorna uma tarefa específica pelo código, garantindo que pertença ao idUser
    return this.prisma.tarefa.findFirst({
      where: {
        codigo,
        idUser, // Adiciona a verificação de idUser
      },
    });
  }

  public async updateTarefa(
    idUser: number,
    codigo: number,
    tarefa: string
  ): Promise<PrismaTarefa> {
    // Verifica se a tarefa existe e pertence ao usuário antes de atualizá-la
    const tarefaExistente = await this.prisma.tarefa.findFirst({
      where: { codigo, idUser },
    });

    if (!tarefaExistente) {
      throw new Error("Tarefa não encontrada");
    }

    // Atualiza a tarefa
    return await this.prisma.tarefa.update({
      where: { codigo },
      data: { tarefa }, // Atualiza o campo tarefa
    });
  }

  public async deleteTarefa(
    idUser: number,
    codigo: number
  ): Promise<PrismaTarefa> {
    // Verifica se a tarefa existe e pertence ao usuário antes de deletá-la
    const tarefaExistente = await this.prisma.tarefa.findFirst({
      where: { codigo, idUser },
    });

    if (!tarefaExistente) {
      throw new Error("Tarefa não encontrada");
    }

    // Deleta a tarefa
    return await this.prisma.tarefa.delete({
      where: { codigo },
    });
  }
}
