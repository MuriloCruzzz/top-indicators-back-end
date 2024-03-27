import express from "express";
import { getLinhasListadas, getParametrosLinha } from "../controllers/listar_linhas.js";

const router = express.Router();

router.get("/listar_linhas", getLinhasListadas);

router.get("/listar_parametros_linhas", getParametrosLinha);


export default router;