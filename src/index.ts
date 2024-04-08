import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import tarefasRoutes from "./routes/tarefa.routes";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const csrfProtection = csurf({ cookie: true });

app.get("/csrf-token", csrfProtection, (req: Request, res: Response) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/api", tarefasRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API está rodando. Use /api para acessar as tarefas.");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
