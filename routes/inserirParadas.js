import express from "express";

import { postInserirParadas, postFinalizarParadasTopo, postParadasLinhasTopo, postInserirParadasTopo, postTempoTotalParadas, postParadasLinhas, postAtualizacaoLinhas } from "../controllers/inserir_paradas_linha.js";
//
const router = express.Router();

router.post("/inserir_paradas", postInserirParadas);

router.post("/InserirParadasTopo", postInserirParadasTopo);

router.post("/FinalizarParadasTopo", postFinalizarParadasTopo);

router.post("/tempo_total_paradas", postTempoTotalParadas);

router.post("/paradas_linha", postParadasLinhas);

router.post("/listar_paradas_linha_topo", postParadasLinhasTopo);

router.post("/atualizacao_linhas", postAtualizacaoLinhas);





export default router;