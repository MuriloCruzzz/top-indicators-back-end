$(document).ready(function() {
        
    var cliente = document.getElementById('nome_cliente').textContent.trim();

    function carregarDadosEstoque() {
        $.ajax({
            url: 'http://127.0.0.1:8800/graficos/busca_estoque', // Certifique-se de que este seja o URL correto
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ cliente: cliente}),
            success: function(data) {
                var tableBody = $('#estoque-table-body');
                tableBody.empty();
                data.forEach(function(item) {
                    // Define a classe CSS com base no status
                    var statusClass = '';
                    if (item.status === 'OK') {
                        statusClass = 'status-ok';
                    } else if (item.status === 'Alto') {
                        statusClass = 'status-alto';
                    } else if (item.status === 'Baixo') {
                        statusClass = 'status-baixo';
                    }

                    var row = '<tr>' +
                        '<td>' + item.Nome + '</td>' +
                        '<td>' + item.Data_Validade + '</td>' +
                        '<td>' + item.Estoque_Atual + '</td>' +
                        '<td>' + item.estoque_minimo + '</td>' +
                        '<td>' + item.estoque_maximo + '</td>' +
                        '<td class="' + statusClass + '">' + item.status + '</td>' + // Aplica a classe CSS ao <td>
                        '</tr>';
                    tableBody.append(row);
                });
            },
            error: function(error) {
                console.error('Erro ao buscar dados:', error);
            }
        });
    }

    // Carrega os dados inicialmente
    carregarDadosEstoque();
});



// Define os manipuladores de clique para cada botão
$('#btn_materia_prima').on('click', function() {

    var botao_materia_prima = document.getElementById('btn_materia_prima');
    botao_materia_prima.style.backgroundColor = 'var(--green)';

    var botao_componentes = document.getElementById('btn_componentes');
    botao_componentes.style.backgroundColor = 'var(--blue)';

    var botao_produto_acabado = document.getElementById('btn_produto_acabado');
    botao_produto_acabado.style.backgroundColor = 'var(--blue)';

});

$('#btn_componentes').on('click', function() {

    var botao_materia_prima = document.getElementById('btn_materia_prima');
    botao_materia_prima.style.backgroundColor = 'var(--blue)';

    var botao_componentes = document.getElementById('btn_componentes');
    botao_componentes.style.backgroundColor = 'var(--green)';

    var botao_produto_acabado = document.getElementById('btn_produto_acabado');
    botao_produto_acabado.style.backgroundColor = 'var(--blue)';
});

$('#btn_produto_acabado').on('click', function() {

    var botao_materia_prima = document.getElementById('btn_materia_prima');
    botao_materia_prima.style.backgroundColor = 'var(--blue)';

    var botao_componentes = document.getElementById('btn_componentes');
    botao_componentes.style.backgroundColor = 'var(--blue)';

    var botao_produto_acabado = document.getElementById('btn_produto_acabado');
    botao_produto_acabado.style.backgroundColor = 'var(--green)';
});

document.addEventListener('DOMContentLoaded', (event) => {
    const cliente = document.getElementById('nome_cliente');

// Callback function to execute when mutations are observed
    const callback = (mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('O conteúdo do heading foi alterado para:', cliente.textContent);
                // Execute your function here
                carregarDadosEstoqueCliente(cliente);
            }
        }
    };

// Options for the observer (which mutations to observe)
const config = { childList: true };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(cliente, config);
// Exemplo de alteração do heading após 3 segundos
setTimeout(() => {
    cliente.textContent = 'Novo Nome do Cliente';
}, 3000);
});


function carregarDadosEstoqueCliente(cliente) {

    $.ajax({
        url: 'http://127.0.0.1:8800/graficos/busca_estoque_cliente', // Certifique-se de que este seja o URL correto
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ cliente: cliente}),
        success: function(data) {
            var tableBody = $('#estoque-table-body');
            tableBody.empty();
            data.forEach(function(item) {
                // Define a classe CSS com base no status
                var statusClass = '';
                if (item.status === 'OK') {
                    statusClass = 'status-ok';
                } else if (item.status === 'Alto') {
                    statusClass = 'status-alto';
                } else if (item.status === 'Baixo') {
                    statusClass = 'status-baixo';
                }

                var row = '<tr>' +
                    '<td>' + item.Nome + '</td>' +
                    '<td>' + item.Data_Validade + '</td>' +
                    '<td>' + item.Estoque_Atual + '</td>' +
                    '<td>' + item.estoque_minimo + '</td>' +
                    '<td>' + item.estoque_maximo + '</td>' +
                    '<td class="' + statusClass + '">' + item.status + '</td>' + // Aplica a classe CSS ao <td>
                    '</tr>';
                tableBody.append(row);
            });
        },
        error: function(error) {
            console.error('Erro ao buscar dados:', error);
        }
    });
};

















