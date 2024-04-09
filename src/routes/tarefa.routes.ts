import express from "express";
import { TarefaController } from "../controllers/tarefa.controller";
import { tokenAuthenticationMiddleware } from "../Middleware/userToken"; // Ajuste o caminho conforme necessário

const router = express.Router();
const tarefaController = new TarefaController();

// Aplicar o middleware de autenticação para todas as rotas de tarefa
router.use(tokenAuthenticationMiddleware);

router.get("/", tarefaController.getAllTarefas.bind(tarefaController));
router.get(
  "/:codigo",
  tarefaController.getTarefaByCodigo.bind(tarefaController)
);
router.post("/", tarefaController.createTarefa.bind(tarefaController));
router.put("/:codigo", tarefaController.updateTarefa.bind(tarefaController));
router.delete("/:codigo", tarefaController.deleteTarefa.bind(tarefaController));

export { router as tarefasRouter };
