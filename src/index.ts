// server.ts
import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { tarefasRouter } from "./routes/tarefa.routes";
import { loginRouter } from "./routes/login.routes";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/tarefas", tarefasRouter);
app.use("/api", loginRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("API está rodando. Use /api para acessar as tarefas.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
