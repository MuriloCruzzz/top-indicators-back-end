import express from "express";
import { ValidarUsuario } from "../controllers/user.js";

const router = express.Router();

router.post("/validar_usuario", ValidarUsuario);


export default router;