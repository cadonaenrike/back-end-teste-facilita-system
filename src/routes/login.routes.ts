import express from "express";
import { LoginController } from "../controllers/login.controller";

const router = express.Router();
const loginController = new LoginController();

router.post("/login", loginController.login.bind(loginController));

router.post("/logout", loginController.logout.bind(loginController));

router.post("/register", loginController.register.bind(loginController));

export { router as loginRouter };
