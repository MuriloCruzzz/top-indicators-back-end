import { db } from "../db.js";



export const postInserirParadas = (req, res) => {

    const id_producao = req.body.id_producao;
    const tempo = req.body.tempo;
    const tipo = req.body.tipo;
    const observacao = req.body.observacao;

    const queryInserirParada = "INSERT INTO paradas_linha_producao (id_producao, tempo, tipo, observação) VALUES ("+ id_producao +", '"+ tempo +"', '"+ tipo +"', '"+ observacao +"');"
    

    db.query(queryInserirParada, (err, data) => {

        if (null) return res.json(err);
        

        return res.status(200).json({"menssage": "success"});

    });
};

export const postTempoTotalParadas = (req, res) => {

    const id_producao = req.body.id_producao;

    console.log("Teste"+ id_producao +"");


    const queryTempoTParadas = `SELECT 
    SEC_TO_TIME(SUM(TIME_TO_SEC(tempo))) AS tempo_total
    FROM 
    paradas_linha_producao
    WHERE 
    id_producao = `+ id_producao + `; `

    db.query(queryTempoTParadas, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
    
        const tempo_total = result[0].tempo_total;
        
        const tempo_formatado = tempo_total.substring(3);// Supondo que o nome da coluna seja "tempo_total"
    
        return res.status(200).json({
            "message": "success",
            "Tempo Total": tempo_formatado
        });
    });
    
};



export const postParadasLinhas = (req, res) => {

    const id_producao = req.body.id_producao;

    const queryTempoTParadas = `SELECT tempo, tipo, observação FROM paradas_linha_producao
    WHERE id_producao = `+ id_producao + `; `

    console.log("Mandando bem paradas linha")

    db.query(queryTempoTParadas, (err, data) => {

        if (err) return res.json(err);
   
        return res.status(200). json(data);
        
    });

};


export const postAtualizacaoLinhas = (req, res) => {

    const id_producao = req.body.id_producao;
    const quatidadeOperadores = req.body.quatidadeOperadores;
    const turno = req.body.turno;
    const quantidadeProduzida = req.body.quantidadeProduzida;
    const horaInicial = req.body.horaInicial;
    const refugoMateriaPrima = req.body.refugoMateriaPrima;
    const refugoMaterias = req.body.refugoMaterias;
    const refugoProdutoAcabado = req.body.refugoProdutoAcabado;

    const atualizarLinha = `UPDATE producao_linha SET ` +
    "hora_inicial = '" + horaInicial + "', " +
    "turno = '" + turno + "', " +
    "quantidade_refugo_materia_prima = " + refugoMateriaPrima + ", " +
    "quantidade_refugo_material = " + refugoMaterias + ", " +
    "quantidade_refugo_produto_acabado = " + refugoProdutoAcabado + ", " +
    "quantidade_produzidas = " + quantidadeProduzida + ", " +
    "quantidade_operadores = " + quatidadeOperadores + 
    " WHERE id_producao = " + id_producao; ``

    console.log("Mandando bem atyyy linha")

    db.query(atualizarLinha, (err, data) => {

        if (null) return res.json(err);
   
        return res.status(200). json({"message": "success"});
        
    });

};

