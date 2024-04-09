import { Request, Response } from "express";
import { TarefaService } from "../services/tarefa.service";
import { ResponseDto } from "../dtos/response.dto";

export class TarefaController {
  private tarefaService: TarefaService;

  constructor() {
    this.tarefaService = new TarefaService();
  }

  private sendResponse(res: Response, responseDto: ResponseDto) {
    res.status(responseDto.code).json(responseDto);
  }

  private handleError(error: unknown): string {
    return error instanceof Error
      ? error.message
      : "Ocorreu um erro desconhecido";
  }

  private getUserIdFromRequest(
    req: Request,
    res: Response
  ): number | undefined {
    const userId = req.userId;
    if (typeof userId !== "number") {
      this.sendResponse(res, {
        code: 403,
        message: "Usuário não autenticado",
      });
      return undefined;
    }
    return userId;
  }

  public async getAllTarefas(req: Request, res: Response) {
    const userId = this.getUserIdFromRequest(req, res);
    if (userId === undefined) return;

    try {
      const tarefas = await this.tarefaService.getAllTarefas(userId);
      this.sendResponse(res, {
        code: 200,
        message: "Tarefas recuperadas com sucesso",
        data: tarefas,
      });
    } catch (error) {
      this.sendResponse(res, { code: 500, message: this.handleError(error) });
    }
  }

  public async getTarefaByCodigo(req: Request, res: Response) {
    const userId = this.getUserIdFromRequest(req, res);
    if (userId === undefined) return;

    try {
      const codigo = parseInt(req.params.codigo);
      const tarefa = await this.tarefaService.getTarefaByCodigo(userId, codigo);

      if (tarefa) {
        this.sendResponse(res, {
          code: 200,
          message: "Tarefa encontrada",
          data: tarefa,
        });
      } else {
        this.sendResponse(res, {
          code: 404,
          message: "Tarefa não encontrada",
        });
      }
    } catch (error) {
      this.sendResponse(res, { code: 500, message: this.handleError(error) });
    }
  }

  public async createTarefa(req: Request, res: Response) {
    const userId = this.getUserIdFromRequest(req, res);
    if (userId === undefined) return;

    try {
      const { tarefa } = req.body;
      const novaTarefa = await this.tarefaService.createTarefa(userId, tarefa);
      this.sendResponse(res, {
        code: 201,
        message: "Tarefa criada com sucesso",
        data: novaTarefa,
      });
    } catch (error: any) {
      this.sendResponse(res, { code: 400, message: this.handleError(error) });
    }
  }

  public async updateTarefa(req: Request, res: Response) {
    const userId = this.getUserIdFromRequest(req, res);
    if (userId === undefined) return;

    try {
      const codigo = parseInt(req.params.codigo);
      const { tarefa } = req.body;
      const tarefaAtualizada = await this.tarefaService.updateTarefa(
        userId,
        codigo,
        tarefa
      );
      this.sendResponse(res, {
        code: 200,
        message: "Tarefa atualizada com sucesso",
        data: tarefaAtualizada,
      });
    } catch (error) {
      this.sendResponse(res, { code: 500, message: this.handleError(error) });
    }
  }

  public async deleteTarefa(req: Request, res: Response) {
    const userId = this.getUserIdFromRequest(req, res);
    if (userId === undefined) return;

    try {
      const codigo = parseInt(req.params.codigo);
      await this.tarefaService.deleteTarefa(userId, codigo);
      this.sendResponse(res, {
        code: 200,
        message: "Tarefa excluída com sucesso",
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Tarefa não encontrada") {
        this.sendResponse(res, { code: 404, message: error.message });
      } else {
        this.sendResponse(res, { code: 500, message: this.handleError(error) });
      }
    }
  }
}
