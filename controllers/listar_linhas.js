import { db } from "../db.js";

export const getLinhasListadas = (_, res) => {
    const queryListar = "SELECT id_producao, id_produto_acabado, status_producao FROM producao_linha";

    db.query(queryListar, (err, data) => {

        if (err) return res.json(err);
        
        const rows = data;

        while(true){
            for (const row of rows) {
                //console.log(`ID Produção: ${row.id_producao}, Produto: ${row.id_produto_acabado}, Status Produção: ${row.status_producao}`);

                //const queryNomeLinha = "SELECT id_producao, status_producao FROM producao_linha";

                if (row.status_producao == 0)
                {
                    row.status_producao = "Aguandando 1º lançamento";
                }
                if (row.status_producao == 1)
                {
                    row.status_producao = "Em Andamento";
                }
                if(row.status_producao == 2)
                {
                    row.status_producao = "Linha Finalizada";
                }
                if(row.status_producao == 3)
                {
                    row.status_producao = "Linha Parada";
                }
            }
            
            console.log("teste listar Linhas ok");

            
    
            return res.status(200).json(data);
        }
    });
};

export const getParametrosLinha = (_, res) => {


    //const queryListarParametros = "SELECT id_producao, id_produto_materia_prima, id_produto_material, id_produto_acabado, quantidade_produzidas, quantidade_demanda_atual, tempo_total_producao, hora_inicial, hora_final, quantidade_refugo_materia_prima, quantidade_refugo_produto_acabado, quantidade_refugo_material, tempo_parada_linha, observacao_parada_linha, status_producao, quantidade_operadores, turno FROM producao_linha";
    const queryListarParametros = "select * from producao_linha;"

    
    db.query(queryListarParametros, (err, data) => {

        if (err) return res.json(err);

        //console.log(data);
   
        return res.status(200).json(data);
        
    });
};

export const postFinalizarLinha = (req, res) => {

    const id_producao = req.body.id_producao;
    const quantidadeProduzida =req.body.quantidadeProduzida;
    const horaInicial =req.body.horaInicial;
    const refugoMateriaPrima =req.body.refugoMateriaPrima;
    const refugoMaterias =req.body.refugoMaterias;
    const refugoProdutoAcabado =req.body.refugoProdutoAcabado;
    const turno =req.body.turno;
    const quatidadeOperadores =req.body.quatidadeOperadores;
    const tempo_Json =req.body.tempoTotalParadas;
    const materiaPrima =req.body.materia_prima;
    const componente =req.body.componente;
    const tempoTotalProducao = `00:${tempo_Json}`;
    const dataHoraAtual = new Date();

// Extrair os componentes da data/hora
    const ano = dataHoraAtual.getFullYear();
    const mes = String(dataHoraAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(dataHoraAtual.getDate()).padStart(2, '0');
    const hora = String(dataHoraAtual.getHours()).padStart(2, '0');
    const minutos = String(dataHoraAtual.getMinutes()).padStart(2, '0');
    const segundos = String(dataHoraAtual.getSeconds()).padStart(2, '0');

    // Formatar a data e hora no formato desejado
    const horaAtual = `${ano}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    const MateriaPrimaAtualizada = refugoMateriaPrima + refugoProdutoAcabado + quantidadeProduzida;
    const componenteAtualizada = refugoMaterias + refugoProdutoAcabado + quantidadeProduzida;
    const queryFinalizarLinha = `UPDATE producao_linha SET hora_final = '${horaAtual}', quantidade_produzidas = ${quantidadeProduzida}, hora_inicial = '${horaInicial}', quantidade_refugo_materia_prima = ${refugoMateriaPrima}, quantidade_refugo_material = ${refugoMaterias}, quantidade_refugo_produto_acabado = ${refugoProdutoAcabado}, turno = '${turno}', tempo_total_producao = '${tempoTotalProducao}', quantidade_operadores = ${quatidadeOperadores}, status_producao = 2 WHERE id_producao = ${id_producao};`;
    const queryConsumirEstoqueMateriaPrima = "UPDATE produto_materia_prima SET Quantidade = Quantidade - "+ MateriaPrimaAtualizada +" WHERE Nome = '"+ materiaPrima +"';";
    const queryConsumirEstoqueComponente = "UPDATE produto_materia_prima_componente SET Quantidade = Quantidade - "+ componenteAtualizada +" WHERE Nome = '"+ componente +"';";
    const queryInserirEstoquePA = "UPDATE produto_acabado SET Quantidade = Quantidade + "+ quantidadeProduzida +" WHERE Material_Consumo = '"+ componente +"' and Materia_Prima_Consumo = '"+ materiaPrima +"';";


    db.query(queryInserirEstoquePA, (err, data) => {

        if (err) return res.json(err);

        console.log("Query 5 ok!");

        
    });

    db.query(queryFinalizarLinha, (err, data) => {

        if (err) return res.json(err);

        console.log("Query 1 ok!");
   
        return res.status(200). json(data);
        
    });

    db.query(queryConsumirEstoqueMateriaPrima, (err, data) => {

        if (err) return res.json(err);

        console.log("Query 2 ok!");
   
    });

    db.query(queryConsumirEstoqueComponente, (err, data) => {

        if (err) return res.json(err);

        console.log("Query 3 ok!");
   
        
    });
};



