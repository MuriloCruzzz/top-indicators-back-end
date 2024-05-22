import { RowDataPacket } from "mysql/lib/protocol/packets/index.js";
import { db } from "../db.js";



export const postInserirParadas = (req, res) => {

    const id_producao = req.body.id_producao;
    const tempo = req.body.tempo;
    const tipo = req.body.tipo;
    const observacao = req.body.observacao;

    const dataAtual = new Date();

// Obtendo os componentes individuais da data
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

    // Formatando a data no formato desejado
    const dataFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;



    const queryInserirParada = "INSERT INTO paradas_linha_producao (id_producao, tempo, tipo, observação, Data_parada) VALUES ("+ id_producao +", '"+ tempo +"', '"+ tipo +"', '"+ observacao +"', '"+ dataFormatada +"');"
    

    db.query(queryInserirParada, (err, data) => {

        if (null) return res.json(err);
        

        return res.status(200).json({"menssage": "success"});

    });
};

export const postInserirParadasTopo = (req, res) => {

    const id_producao = req.body.id_producao;
    const tipo = req.body.tipo;

    const dataAtual = new Date();

    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

    // Formatando a data no formato desejado
    const dataFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

    const status = 1;//  00:00:00


    //const queryInserirParada = "INSERT INTO paradas_linha_producao (id_producao, tempo, tipo, observações, Data_parada, Status_parada) VALUES ("+ id_producao +",'00:00:00','', '"+ tipo +"', '"+ dataFormatada +"', '"+ status +"');"
    //const queryInserirStatus = "update producao_linha set status_producao = 3 where id_producao = "+ id_producao +";"
    
    const queryInserirParada = "INSERT INTO paradas_linha_producao (id_producao, tipo, Status_parada, Data_parada) VALUES ("+ id_producao +",'"+ tipo +"', '"+ status +"','"+ dataFormatada +"');"
    const queryInserirParada2 = "UPDATE producao_linha SET status_producao = 3 WHERE id_producao = "+ id_producao +";" 



    db.query(queryInserirParada, (err, data) => {

    });

    db.query(queryInserirParada2, (err, data) => {

        if (err) return res.json(err);
         return res.json("sucess");
    });

};

export const postFinalizarParadasTopo = (req, res) => {

    const id_producao = req.body.id_producao;
    var tempo = req.body.tempo;


    const partesTempo = tempo.split(':'); // Divida o tempo em horas, minutos e segundos
    const horas = parseInt(partesTempo[0]); // Obtenha as horas
    const minutos = parseInt(partesTempo[1]); // Obtenha os minutos
    const segundos = parseInt(partesTempo[2]); // Obtenha os segundos


    const tempoTotalSegundos = horas * 3600 + minutos * 60 + segundos; // Converta tudo para segundos

    if (tempoTotalSegundos > 60) {
        // Seu tempo no formato HH:MM:S
        const partesTempo = tempo.split(':'); // Divida o tempo em horas, minutos e segundos
        const horas = partesTempo[0].padStart(2, '0'); // Obtenha as horas e garanta que tenha dois caracteres
        const minutos = partesTempo[0].padStart(2, '0'); // Obtenha os minutos e garanta que tenha dois caracteres
        const segundos = partesTempo[1].padStart(2, '0'); // Obtenha os segundos e garanta que tenha dois caracteres
        tempo = `${horas}:${minutos}:${segundos}`;

        
    }else{
        tempo = "00:00:01";
    }

    

    const queryInserirStatus = "UPDATE paradas_linha_producao SET Status_parada = 0, tempo = '"+ tempo+"' WHERE id_producao = "+ id_producao +" AND Status_parada = 1;"
    const queryInserirStatus2 = "UPDATE producao_linha set status_producao = 1 where id_producao = "+id_producao+";"
    
    db.query(queryInserirStatus2, (err, data) => {

        if (err) return res.json(err);
    });
    
    db.query(queryInserirStatus, (err, data) => {

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

export const postParadasLinhasTopo = (req, res) => {

    const id_producao = req.body.id_producao;

    const queryTempoTParadas = "SELECT tipo, Data_parada FROM paradas_linha_producao WHERE id_producao = "+ id_producao +" and Status_parada = 1;"



    db.query(queryTempoTParadas, (err, data) => {

        if (err) return res.status(404), res.json("Erro banco Mysql");

        if (data.length == 0 ) return res.json("Sem Registro");

        if (data.length > 0){

            if (data[0].tipo == null) return res.status(403), res.json(err);

            const tipo = data[0].tipo;

            const dataAtual = data[0].Data_parada;

            const ano = dataAtual.getFullYear();
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const horas = String(dataAtual.getHours()).padStart(2, '0');
            const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
            const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

            // Formatando a data no formato desejado
            const dataFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

            return res.status(200). json({"message": "sucess", "tipo": tipo,
            "Data_parada": dataFormatada});
           
        }
 
    });

};


export const postParadasLinhas = (req, res) => {

    const id_producao = req.body.id_producao;

    const queryTempoTParadas = `SELECT tempo, tipo, observação FROM paradas_linha_producao
    WHERE id_producao = `+ id_producao + ` and Status_parada = 0; `

    console.log("Mandando bem paradas linha")

    db.query(queryTempoTParadas, (err, data) => {

        if (data.length == 0) return res.json({"Return": "Sem registro"});
        
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

    if (quantidadeProduzida > 1){

        const queryUpdateSetLinha = "UPDATE producao_linha SET status_producao = 1 WHERE id_producao = "+ id_producao +" AND status_producao NOT IN (3, 4);";
        db.query(queryUpdateSetLinha, (err, data) => {

            if(err) return err;

        });
    }


    db.query(atualizarLinha, (err, data) => {

        if (null) return res.json(err);
   
        return res.status(200). json({"message": "success"});
        
    });

};

