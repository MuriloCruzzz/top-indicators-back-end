function updateParadaLinha (){
    
    const labelNameText = $('#label_name_linha-14').text();
    const id_producao = parseInt(labelNameText.split('-')[1]); // Extraindo o número da string e convertendo para inteiro

    // Obter valores dos inputs
    const tempo = $('#tempo-parada').val(); // Valor do input time
    const tipo = $('#btn_tipoParada').text(); // Valor do texto do botão
    const observacao = $('#obs').val(); // Valor do input text
    
    $.ajax({ 
    url: 'http://127.0.0.1:8800/paradas/inserir_paradas',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({
    "id_producao": id_producao,
    "tempo": tempo,
    "tipo": tipo,
    "observacao": observacao }), // Convertendo para JSON
    success: function(data) {
        // Manipular os dados retornados, por exemplo, exibindo-os na página
       
    },
    error: function(xhr, textStatus, errorThrown) {
        console.log('Erro ao obter dados da linha:', errorThrown);
    }
});

    
};
