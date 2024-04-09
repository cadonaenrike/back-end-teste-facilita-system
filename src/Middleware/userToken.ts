import { Request, Response, NextFunction } from "express";
import { LoginService } from "../services/login.service";

export const tokenAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token;

    if (typeof token !== "string" || !token) {
      return res
        .status(401)
        .json({ message: "Acesso negado. Nenhum token fornecido." });
    }

    const loginService = new LoginService();

    const userId = await loginService.validateToken(token);

    if (userId === null) {
      return res
        .status(401)
        .json({ message: "Acesso negado. Token inválido ou expirado." });
    }

    req.userId = userId;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Erro ao verificar o token." });
  }
};
