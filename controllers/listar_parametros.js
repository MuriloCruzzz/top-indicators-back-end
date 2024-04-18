import { db } from "../db.js";

export const postParametrosLinha = (req, res) => {

    const id_producao = req.body.id_producao;


    //const queryListarParametros = "SELECT id_producao, id_produto_materia_prima, id_produto_material, id_produto_acabado, quantidade_produzidas, quantidade_demanda_atual, tempo_total_producao, hora_inicial, hora_final, quantidade_refugo_materia_prima, quantidade_refugo_produto_acabado, quantidade_refugo_material, tempo_parada_linha, observacao_parada_linha, status_producao, quantidade_operadores, turno FROM producao_linha";
    const queryListarParametros = `SELECT 
    pl.id_producao,
    pl.id_produto_materia_prima,
    pmp.Nome AS nome_produto_materia_prima,
    pl.id_produto_material,
    pmc.Nome AS nome_produto_material,
    pl.id_produto_acabado,
    pl.quantidade_produzidas,
    pl.quantidade_demanda_atual,
    pl.tempo_total_producao,
    pl.hora_inicial,
    pl.hora_final,
    pl.quantidade_refugo_materia_prima,
    pl.quantidade_refugo_produto_acabado,
    pl.quantidade_refugo_material,
    pl.tempo_parada_linha,
    pl.observacao_parada_linha,
    pl.status_producao,
    pl.quantidade_operadores,
    pl.turno
FROM 
    producao_linha pl
LEFT JOIN 
    produto_materia_prima pmp ON pl.id_produto_materia_prima = pmp.id_produto
LEFT JOIN 
    produto_materia_prima_componente pmc ON pl.id_produto_material = pmc.id_produto
WHERE 
    pl.id_producao = `+id_producao +`;`


    
    db.query(queryListarParametros, (err, data) => {

        if (err) return res.json(err);

        console.log("Query ok!");
   
        return res.status(200). json(data);
        
    });
};

export const postAtualizarParametrosLinha = (req, res) => {

    const id_producao = req.body.id_producao;


    //const queryListarParametros = "SELECT id_producao, id_produto_materia_prima, id_produto_material, id_produto_acabado, quantidade_produzidas, quantidade_demanda_atual, tempo_total_producao, hora_inicial, hora_final, quantidade_refugo_materia_prima, quantidade_refugo_produto_acabado, quantidade_refugo_material, tempo_parada_linha, observacao_parada_linha, status_producao, quantidade_operadores, turno FROM producao_linha";
    const queryAtualizarParametros = `SELECT hora_inicial, quantidade_refugo_materia_prima, 
    quantidade_refugo_material, quantidade_refugo_produto_acabado, quantidade_produzidas, quantidade_operadores, turno
    FROM producao_linha 
    WHERE id_producao = `+ id_producao +`;`


    
    db.query(queryAtualizarParametros, (err, data) => {

        if (err) return res.json(err);

        console.log("Query ok!");
   
        return res.status(200). json(data);
        
    });
};



