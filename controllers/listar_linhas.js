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

