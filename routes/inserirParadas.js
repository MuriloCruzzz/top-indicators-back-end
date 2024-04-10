import express from "express";

import { postInserirParadas, getTempoTotalParadas } from "../controllers/inserir_paradas_linha.js";
//
const router = express.Router();

router.post("/inserir_paradas", postInserirParadas);

router.get("/tempo_total_paradas", getTempoTotalParadas);


export default router;