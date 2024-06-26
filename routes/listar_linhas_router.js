import express from "express";
import { getLinhasListadas,postFinalizarLinha, getParametrosLinha } from "../controllers/listar_linhas.js";
import { postParametrosLinha, postAtualizarParametrosLinha } from "../controllers/listar_parametros.js";
//
const router = express.Router();

router.get("/listar_linhas", getLinhasListadas);

router.post("/listar_parametros", postParametrosLinha);

router.get("/listar_parametros_linhas", getParametrosLinha);

router.post("/atualizar_parametros_linha", postAtualizarParametrosLinha);

router.post("/finalizar_linha_producao", postFinalizarLinha);



export default router;