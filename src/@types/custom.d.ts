import "express-session";
declare module "express-serve-static-core" {
  interface Request {
    userId?: number; // Adiciona userId como uma propriedade opcional
  }
}

declare module "express-serve-static-core" {
  interface Request {
    session: Session & Partial<SessionData>;
  }
}
