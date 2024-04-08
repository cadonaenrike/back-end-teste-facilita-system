// LoginController.ts
import { Request, Response } from "express";
import { LoginService } from "../services/login.service";

import { ResponseDto } from "../dtos/response.dto";

export class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  private sendResponse(res: Response, responseDto: ResponseDto) {
    return res.status(responseDto.code).json(responseDto);
  }

  public async login(req: Request, res: Response) {
    try {
      const { nome, senha } = req.body;
      const loginSuccess = await this.loginService.login(nome, senha, req);
      if (loginSuccess) {
        this.sendResponse(res, {
          code: 200,
          message: "Login realizado com sucesso",
        });
      } else {
        this.sendResponse(res, { code: 401, message: "Login falhou" });
      }
    } catch (error: any) {
      this.sendResponse(res, { code: 500, message: error.message });
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const { nome, senha } = req.body;
      const userCreated = await this.loginService.createUser(nome, senha);
      if (userCreated) {
        this.sendResponse(res, {
          code: 201,
          message: "Usuário registrado com sucesso",
        });
      } else {
        this.sendResponse(res, {
          code: 400,
          message: "Falha ao registrar usuário",
        });
      }
    } catch (error: any) {
      this.sendResponse(res, { code: 500, message: error.message });
    }
  }

  public logout(req: Request, res: Response) {
    req.session.destroy((err: Error | null) => {
      if (err) {
        return this.sendResponse(res, {
          code: 500,
          message: "Não foi possível realizar o logout.",
        });
      }

      res.clearCookie("connect.sid");
      this.sendResponse(res, {
        code: 200,
        message: "Logout realizado com sucesso.",
      });
    });
  }
}
