import { db } from "../db.js";

export const postGerarGraficosInicial = (_, res) => {

    const queryGerarRelatoriosGeral = "SELECT SUM(quantidade_produzidas) AS total_produzido, SUM(quantidade_demanda_atual) AS total_demandado, SUM(quantidade_refugo_material + quantidade_refugo_produto_acabado + quantidade_refugo_materia_prima) AS total_refugo FROM producao_linha;";


    db.query(queryGerarRelatoriosGeral, (err, data) => {

        if (err) return res.json(err);

        //console.log(data);
   
        return res.status(200).json(data);
        
    });
};

export const postGerarGraficosClientesProduto = (req, res) => {

    const cliente = req.body.cliente;
    const produto = req.body.produto;


    const queryBuscarProdutos = "SELECT SUM(quantidade_produzidas) AS total_produzido, SUM(quantidade_demanda_atual) AS total_demandado, SUM(quantidade_refugo_material + quantidade_refugo_produto_acabado + quantidade_refugo_materia_prima) AS total_refugo FROM producao_linha WHERE id_produto_acabado IN (SELECT '"+ produto +"' FROM produto_acabado WHERE Cliente = '"+ cliente +"');"
    
    db.query(queryBuscarProdutos, (err, data) => {

        if (err) return res.json(err);

        const totalProduzido = data[0].total_produzido || 0;
        const totalDemandado = data[0].total_demandado || 0;
        const totalRefugo = data[0].total_refugo || 0;



        if (totalProduzido > 0 || totalDemandado > 0 || totalRefugo > 0){
            // Verifica se os valores retornados são nulos

            return res.status(200).json(data);

        }
        else{
            return res.status(200).json([{
                "total_produzido": 0,
                "total_demandado": 0,
                "total_refugo": 0
            }]);
        }
    }
)};
export const postGerarGraficosClientes = (req, res) => {

    const cliente = req.body.cliente;
    const data_inicial = req.body.data_inicial;
    const data_final = req.body.data_final;
    console.log(data_inicial);
    console.log(data_final);


    const queryBuscarProdutos = "SELECT SUM(quantidade_produzidas) AS total_produzido, SUM(quantidade_demanda_atual) AS total_demandado, SUM(quantidade_refugo_material + quantidade_refugo_produto_acabado + quantidade_refugo_materia_prima) AS total_refugo FROM producao_linha WHERE id_produto_acabado IN (SELECT nome FROM produto_acabado WHERE Cliente = '"+ cliente +"') AND DATE(hora_final) >= '"+ data_inicial +"' AND DATE(hora_final) <= '"+ data_final +"';"
    
    db.query(queryBuscarProdutos, (err, data) => {

        if (err) return res.json(err);

        const totalProduzido = data[0].total_produzido || 0;
        const totalDemandado = data[0].total_demandado || 0;
        const totalRefugo = data[0].total_refugo || 0;



        if (totalProduzido > 0 || totalDemandado > 0 || totalRefugo > 0){
            // Verifica se os valores retornados são nulos

            return res.status(200).json(data);

        }
        else{
            return res.status(200).json([{
                "total_produzido": 0,
                "total_demandado": 0,
                "total_refugo": 0
            }]);
        }
    }
)};



export const postProdutosClientes = (req, res) => {

    const cliente = req.body.cliente;



    const queryBuscarProdutos = "select nome from produto_acabado where Cliente = '"+ cliente +"';";
    
    db.query(queryBuscarProdutos, (err, data) => {

        if (err) return res.json(err);

        if (data.length > 0){

            return res.status(200).json(data);

        }
    });
    
};

export const postPegarClientePesquisado = (req, res) => {

    const cliente = req.body.cliente;

    const queryBuscarProdutos = "SELECT nome FROM cliente WHERE nome LIKE '%"+ cliente +"%';";
    
    db.query(queryBuscarProdutos, (err, data) => {

        if (err) return res.json(err);

        if (data.length > 0){

            return res.status(200).json(data);
        }
        else{
            return res.status(404). json("Não encontrado");
        }
    });
    
};

export const pegarClienteProdutoPesquisado = (req, res) => {

    const cliente = req.body.cliente;
    const produto = req.body.produto;

    const queryBuscarProdutos = "SELECT Nome FROM produto_acabado WHERE Cliente = '"+ cliente +"' and Nome LIKE '%"+ produto +"%';";
    
    db.query(queryBuscarProdutos, (err, data) => {

        if (err) return res.json(err);

        if (data.length > 0){

            return res.status(200).json(data);
        }
        else{
            return res.status(404). json("Não encontrado");
        }
    });
    
};

export const pegarBuscarEstoque = (req, res) => {

    const cliente = req.body.cliente;
    //const produto = req.body.produto;

    const queryBuscarProdutos = "SELECT id_produto, Nome, Data_Validade, Quantidade AS Estoque_Atual, estoque_minimo, estoque_maximo, status FROM produto_materia_prima";
    
    db.query(queryBuscarProdutos, (err, data) => {

        if (err) return res.json(err);

        if (data.length > 0){

            // Itera sobre os resultados e formata a data
            data.forEach((produto) => {
                // Obtém o objeto Date para a data
                const dataValidade = new Date(produto.Data_Validade);
                
                // Extrai o dia, mês e ano
                const dia = String(dataValidade.getDate()).padStart(2, '0');
                const mes = String(dataValidade.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11, então é necessário adicionar 1
                const ano = dataValidade.getFullYear();
                
                // Monta a data formatada no formato dd/mm/aaaa
                produto.Data_Validade = `${dia}/${mes}/${ano}`;
            });

            return res.status(200).json(data);
        }
        else{
            return res.status(404).json("Não encontrado");
        }
    });
};



export const pegarEstoqueComponente = (req, res) => {


    const queryBuscarProdutos = "SELECT id_produto, Nome, Data_Validade, Quantidade AS Estoque_Atual, estoque_minimo, estoque_maximo, status FROM produto_materia_prima_componente";
    
    db.query(queryBuscarProdutos, (err, data) => {

        if (err) return res.json(err);

        if (data.length > 0){

            // Itera sobre os resultados e formata a data
            data.forEach((produto) => {
                // Obtém o objeto Date para a data
                const dataValidade = new Date(produto.Data_Validade);
                
                // Extrai o dia, mês e ano
                const dia = String(dataValidade.getDate()).padStart(2, '0');
                const mes = String(dataValidade.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11, então é necessário adicionar 1
                const ano = dataValidade.getFullYear();
                
                // Monta a data formatada no formato dd/mm/aaaa
                produto.Data_Validade = `${dia}/${mes}/${ano}`;
            });

            return res.status(200).json(data);
        }
        else{
            return res.status(404).json("Não encontrado");
        }
    });
};
