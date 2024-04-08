import { Router } from "express";
import { csrfMiddleware } from "../middleware/csrfMiddleware";
import { TarefaController } from "../controllers/tarefa.controller";

const router = Router();
const tarefaController = new TarefaController();

router.get("/tarefas", tarefaController.getAllTarefas.bind(tarefaController));

router.get(
  "/tarefas/:codigo",
  tarefaController.getTarefaByCodigo.bind(tarefaController)
);

router.post(
  "/tarefas",
  csrfMiddleware,
  tarefaController.createTarefa.bind(tarefaController)
);

router.put(
  "/tarefas/:codigo",
  csrfMiddleware,
  tarefaController.updateTarefa.bind(tarefaController)
);

router.delete(
  "/tarefas/:codigo",
  csrfMiddleware,
  tarefaController.deleteTarefa.bind(tarefaController)
);

export default router;
