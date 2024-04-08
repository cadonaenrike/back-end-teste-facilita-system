import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export class LoginService {
  private prisma = new PrismaClient();

  async createUser(username: string, password: string): Promise<boolean> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { nome: username },
      });

      if (existingUser) {
        throw new Error("Usuário já existe.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await this.prisma.user.create({
        data: {
          nome: username,
          senha: hashedPassword,
        },
      });

      return true;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return false;
    }
  }

  async login(username: string, password: string, req: any): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { nome: username },
    });

    if (!user) return false;

    const passwordMatch = await bcrypt.compare(password, user.senha);
    if (passwordMatch) {
      req.session.userId = user.id;
      return true;
    } else {
      return false;
    }
  }
}
