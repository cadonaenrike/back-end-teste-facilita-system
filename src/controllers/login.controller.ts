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
      const token = await this.loginService.login(nome, senha);
      if (token) {
        this.sendResponse(res, {
          code: 200,
          message: "Login realizado com sucesso",
          data: { token },
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

  public async logout(req: Request, res: Response) {
    try {
      const token = req.headers.token as string | undefined;
      if (!token) {
        return this.sendResponse(res, {
          code: 401,
          message: "Token não fornecido.",
        });
      }
      await this.loginService.logout(token, null);
      this.sendResponse(res, {
        code: 200,
        message: "Logout realizado com sucesso.",
      });
    } catch (error: any) {
      this.sendResponse(res, { code: 500, message: error.message });
    }
  }
}
