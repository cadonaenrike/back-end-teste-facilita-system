import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

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

  async updateUserToken(username: string, token: string | null): Promise<void> {
    await this.prisma.user.update({
      where: { nome: username },
      data: { token: token },
    });
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.prisma.user.findFirst({
      where: { nome: username },
    });

    if (!user) return null;

    const passwordMatch = await bcrypt.compare(password, user.senha);

    if (passwordMatch) {
      const token = uuidv4() + "." + new Date().getTime();
      await this.updateUserToken(username, token);

      return token;
    } else {
      return null;
    }
  }

  async logout(token: string, newTokenValue: string | null): Promise<void> {
    // Atualiza o token do usuário para null baseado no token fornecido
    await this.prisma.user.updateMany({
      where: {
        token: token,
      },
      data: {
        token: newTokenValue,
      },
    });
  }

  async validateToken(token: string): Promise<number | null> {
    const user = await this.prisma.user.findFirst({
      where: { token },
    });

    return user ? user.id : null;
  }
}
