import express from "express";

import { postInserirParadas, postTempoTotalParadas, postParadasLinhas, postAtualizacaoLinhas } from "../controllers/inserir_paradas_linha.js";
//
const router = express.Router();

router.post("/inserir_paradas", postInserirParadas);

router.post("/tempo_total_paradas", postTempoTotalParadas);

router.post("/paradas_linha", postParadasLinhas);

router.post("/atualizacao_linhas", postAtualizacaoLinhas);


export default router;