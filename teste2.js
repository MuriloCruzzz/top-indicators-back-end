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


function carregarDadosEstoqueComponentes() {
    var cliente = document.getElementById('nome_cliente').textContent.trim();
    $.ajax({
        url: 'http://127.0.0.1:8800/graficos/busca_estoque_componente', // Certifique-se de que este seja o URL correto
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

function carregarDadosEstoque() {
    var cliente = document.getElementById('nome_cliente').textContent.trim();
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
};



// Define os manipuladores de clique para cada botão
$('#btn_materia_prima').on('click', function() {

var botao_materia_prima = document.getElementById('btn_materia_prima');
botao_materia_prima.style.backgroundColor = 'var(--green)';

var botao_componentes = document.getElementById('btn_componentes');
botao_componentes.style.backgroundColor = 'var(--blue)';

var botao_produto_acabado = document.getElementById('btn_produto_acabado');
botao_produto_acabado.style.backgroundColor = 'var(--blue)';

    carregarDadosEstoque();
});

$('#btn_componentes').on('click', function() {

var botao_materia_prima = document.getElementById('btn_materia_prima');
botao_materia_prima.style.backgroundColor = 'var(--blue)';

var botao_componentes = document.getElementById('btn_componentes');
botao_componentes.style.backgroundColor = 'var(--green)';

var botao_produto_acabado = document.getElementById('btn_produto_acabado');
botao_produto_acabado.style.backgroundColor = 'var(--blue)';
    
    carregarDadosEstoqueComponentes();
});

$('#btn_produto_acabado').on('click', function() {

var botao_materia_prima = document.getElementById('btn_materia_prima');
botao_materia_prima.style.backgroundColor = 'var(--blue)';

var botao_componentes = document.getElementById('btn_componentes');
botao_componentes.style.backgroundColor = 'var(--blue)';

var botao_produto_acabado = document.getElementById('btn_produto_acabado');
botao_produto_acabado.style.backgroundColor = 'var(--green)';
});

// Options for the observer (which mutations to observe)

$(document).ready(function() {
        $('#busca_estoque').on('input', function() {
            var searchValue = $(this).val().toLowerCase();

            $('#estoque-table-body tr').each(function() {
                var nome = $(this).find('td').eq(0).text().toLowerCase();
                if (nome.includes(searchValue)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });
    });


$(document).ready(function() {
    function exportTableToCSV(filename) {
        var csv = [];
        var rows = $('#estoque-table-body tr');
        
        rows.each(function() {
            var rowData = [];
            $(this).find('td').each(function() {
                rowData.push($(this).text());
            });
            csv.push(rowData.join(","));
        });

        // Download CSV
        var csvFile;
        var downloadLink;

        csvFile = new Blob([csv.join("\n")], { type: "text/csv" });

        downloadLink = document.createElement("a");
        downloadLink.download = filename;

        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    $('#id_download_tabela').on('click', function() {
        exportTableToCSV('estoque.csv');
    });
});

$('#id-teste-js-fora').on('click', function() {
        updateProgress('#demanda-bar', 90);
    });


// Função para atualizar os valores das barras de progresso
function updateProgress(barClass, value) {
    // Seleciona a barra de progresso pelo nome da classe
    var progressBar = document.querySelector('.' + barClass + ' .progress-bar');

    // Atualiza a largura da barra de progresso
    progressBar.style.width = value + '%';

    // Atualiza o valor exibido dentro da barra de progresso
    progressBar.nextElementSibling.textContent = value + '%';

    // Altera a cor da barra de progresso com base no valor
    if (value >= 90) {
        progressBar.style.backgroundColor = '#28a745'; // Verde
    } else if (value >= 70) {
        progressBar.style.backgroundColor = '#ffc107'; // Amarelo
    } else {
        progressBar.style.backgroundColor = '#dc3545'; // Vermelho
    }
}

// Exemplo de uso da função
