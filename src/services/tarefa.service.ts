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
      throw new Error("A tarefa é obrigatória e deve ser uma string não vazia");
    }

    return await this.prisma.tarefa.create({
      data: { idUser, tarefa },
    });
  }

  public async getAllTarefas(): Promise<PrismaTarefa[]> {
    return this.prisma.tarefa.findMany();
  }

  public async getTarefaByCodigo(codigo: number): Promise<PrismaTarefa | null> {
    return this.prisma.tarefa.findUnique({
      where: { codigo },
    });
  }

  public async updateTarefa(
    codigo: number,
    tarefa: string
  ): Promise<PrismaTarefa> {
    const tarefaExistente = await this.prisma.tarefa.findUnique({
      where: { codigo },
    });

    if (!tarefaExistente) {
      throw new Error("Tarefa não encontrada");
    }

    const tarefaAtualizada = await this.prisma.tarefa.update({
      where: { codigo },
      data: { tarefa },
    });

    return tarefaAtualizada;
  }

  public async deleteTarefa(codigo: number): Promise<PrismaTarefa | string> {
    const tarefaExistente = await this.prisma.tarefa.findUnique({
      where: { codigo },
    });

    if (!tarefaExistente) {
      throw new Error("Tarefa não encontrada");
    }

    const tarefaDeletada = await this.prisma.tarefa.delete({
      where: { codigo },
    });

    return tarefaDeletada;
  }
}
