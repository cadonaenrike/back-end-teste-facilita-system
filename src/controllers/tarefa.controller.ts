import { Request, Response } from "express";
import { TarefaService } from "../services/tarefa.service";
import { ResponseDto } from "../dtos/response.dto";

export class TarefaController {
  private tarefaService: TarefaService;

  constructor() {
    this.tarefaService = new TarefaService();
  }

  private sendResponse(res: Response, responseDto: ResponseDto) {
    return res.status(responseDto.code).json(responseDto);
  }

  private handleError(error: unknown): string {
    return error instanceof Error
      ? error.message
      : "Ocorreu um erro desconhecido";
  }

  public async getAllTarefas(req: Request, res: Response) {
    try {
      const tarefas = await this.tarefaService.getAllTarefas();
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
    try {
      const codigo = parseInt(req.params.codigo);
      const tarefa = await this.tarefaService.getTarefaByCodigo(codigo);

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
    try {
      const { tarefa } = req.body;
      const novaTarefa = await this.tarefaService.createTarefa(tarefa);
      this.sendResponse(res, {
        code: 201,
        message: "Tarefa criada com sucesso",
        data: novaTarefa,
      });
    } catch (error: any) {
      this.sendResponse(res, { code: 400, message: error.message });
    }
  }

  public async updateTarefa(req: Request, res: Response) {
    try {
      const codigo = parseInt(req.params.codigo);
      const { tarefa } = req.body;
      const tarefaAtualizada = await this.tarefaService.updateTarefa(
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
    try {
      const codigo = parseInt(req.params.codigo);
      await this.tarefaService.deleteTarefa(codigo);
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
