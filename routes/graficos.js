import express from "express";
import { postGerarGraficosInicial, pegarEstoqueComponente, pegarBuscarEstoque,pegarClienteProdutoPesquisado, postProdutosClientes, postGerarGraficosClientes, postGerarGraficosClientesProduto, postPegarClientePesquisado } from "../controllers/gerar_graficos.js";

const router = express.Router();

router.get("/gerar_graficos_inicial", postGerarGraficosInicial);

router.post("/pegar_produtos_clientes", postProdutosClientes); 

router.post("/gerar_graficos_clientes", postGerarGraficosClientes); 

router.post("/gerar_graficos_clientes_produto", postGerarGraficosClientesProduto);

router.post("/pegar_cliente_pesquisado", postPegarClientePesquisado);

router.post("/pegar_cliente_produto_pesquisado", pegarClienteProdutoPesquisado); 

router.post("/busca_estoque", pegarBuscarEstoque);

router.post("/busca_estoque_componente", pegarEstoqueComponente);




export default router;



