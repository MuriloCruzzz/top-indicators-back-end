
$(document).ready(function() {
    // Quando uma opção do menu dropdown é clicada
    $('.dropdown-menu-4').on('click', 'a', function() {
        // Obtém o texto da opção clicada
        var cliente = $(this).text();
        
        // Atualiza o texto do botão com o texto da opção clicada
        $('#btn_parada_tipo_alerta').text(cliente);
        carregarDadosClientes(cliente);
        
        $.ajax({
            url: 'http://127.0.0.1:8800/graficos/pegar_produtos_clientes',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ cliente: cliente }),
            success: function(data) {
                var dropdownMenu = document.querySelector('.menudrop');

                // Limpa os itens anteriores do dropdown
                dropdownMenu.innerHTML = '';

                // Adiciona os novos itens ao dropdown
                data.forEach(function(item) {
                    // Criar um elemento de item de menu
                    var menuItem = document.createElement('li');
                    menuItem.classList.add('dropdown-item'); // Adicione a classe correta aqui
                    menuItem.textContent = item.nome;
                    menuItem.addEventListener('click', function() {
                        // Atualiza o texto do botão com o nome do item clicado
                        $('#btn_parada_tipo_alerta-1').text(item.nome);
                        $('#nome_produto').text(item.nome + ' ');
                        var produto = item.nome;
                        buscarProduto(produto);

                    });

                    // Adicionar o item de menu ao dropdown
                    dropdownMenu.appendChild(menuItem);
                });
            },
            error: function(xhr, status, error) {
                // Em caso de erro, trate conforme necessário
                console.error('Erro ao obter dados do servidor:', error);
            }
        });
    });
});


function atualizarTextoHeading(data) {
    // Se os dados forem recebidos com sucesso e contiverem a quantidade demandada
   $('#label-quantidade-demanda').text(data[0].total_demandado.toLocaleString('pt-BR'));
    $('#quantidade-produzida').text(data[0].total_produzido.toLocaleString('pt-BR'));
    $('#quantidade-refugo').text(data[0].total_refugo.toLocaleString('pt-BR'));
    
    
    const A = data[0].total_produzido;
    const B = data[0].total_demandado;
    const porcentagem = calcularPorcentagem(A, B);
    
    $('#alcance-da-meta').text(porcentagem + "%");
    
    
}

function calcularPorcentagem(A, B) {
    // Verifica se A ou B é nulo ou NaN
    if (A === 0 || B === 0) {
        
        const porcentagem = 0;
        
        return porcentagem.toFixed(1);
    }

    // Calcula a porcentagem
    const porcentagem = (A / B) * 100;
    return porcentagem.toFixed(1);
}

// Função para fazer a requisição AJAX e atualizar o texto do heading
function carregarDadosEAtualizarTextoHeading() {
    $.ajax({
         url: 'http://127.0.0.1:8800/graficos/gerar_graficos_inicial',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // Quando os dados forem recebidos com sucesso, chame a função para atualizar o texto do heading
            atualizarTextoHeading(data);
            $('#btn_parada_tipo_alerta-1').prop('disabled', true);
        },
        error: function(xhr, status, error) {
            // Em caso de erro, trate conforme necessário
            console.error('Erro ao obter dados do servidor:', error);
        }
    });
}

function carregarDadosClientes(cliente) {
    
    $('#btn_parada_tipo_alerta').text(cliente);
    
    if(cliente == "Todos Clientes"){
        carregarDadosEAtualizarTextoHeading();
        $('#nome_cliente').text('');
        $('#nome_produto').text('');
        
        $('#btn_parada_tipo_alerta-1').text('Produto');
        $('#btn_parada_tipo_alerta-1').prop('disabled', true);
        return;   
    }

    $('#btn_parada_tipo_alerta-1').text('Produto');
    $('#nome_cliente').text(' '+ cliente + ' ');
    $('#nome_produto').text('');
    $('#btn_parada_tipo_alerta-1').prop('disabled', false);
    
    var data_inicial = formatarData(document.getElementById('data_inicial').value);
    
    var data_final = formatarData(document.getElementById('data_final').value);

        
        $.ajax({
            url: 'http://127.0.0.1:8800/graficos/gerar_graficos_clientes',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ cliente: cliente, data_inicial: data_inicial, data_final: data_final }),
            success: function(data) {
    

            atualizarTextoHeading(data);
        },
        error: function(xhr, status, error) {
            // Em caso de erro, trate conforme necessário
            console.error('Erro ao obter dados do servidor:', error);
        }
    });
}

function formatarData(texto) {
    // Divide o texto em partes usando '/'
    var partes = texto.split('/');
    
    // Reorganiza as partes para o formato yyyy-mm-dd
    var dataFormatada = partes[0];
    
    return dataFormatada;
}


function buscarProduto(produto) {

        var cliente = document.getElementById('btn_parada_tipo_alerta').textContent;
        carregarDadosClientesProduto(produto, cliente);

};

function carregarDadosClientesProduto(produto, cliente) {
    $.ajax({
        url: 'http://127.0.0.1:8800/graficos/gerar_graficos_clientes_produto',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ cliente: cliente, produto: produto }),
        success: function(data) {
            // Chame a função para atualizar o texto do heading com os dados recebidos
            atualizarTextoHeading(data);
        },
        error: function(xhr, status, error) {
            // Em caso de erro, trate conforme necessário
            console.error('Erro ao obter dados do servidor:', error);
        }
    });
}
// Aguarde até que o documento esteja pronto para ser manipulado
$(document).ready(function() {
    // Chame a função para carregar os dados e atualizar o texto do heading assim que o documento estiver pronto
    carregarDadosEAtualizarTextoHeading();
});
    
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona os elementos de entrada de data pelos IDs
    var dataInicialInput = document.getElementById('data_inicial');
    var dataFinalInput = document.getElementById('data_final');
        
    if (dataInicialInput && dataFinalInput) {
        // Obtém a data atual
        var today = new Date();

        // Formata a data atual no padrão yyyy-mm-dd para o input type="date"
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
        var year = today.getFullYear();

        var formattedToday = year + '-' + month + '-' + day;
        
        // Define o valor do input data_final com a data atual formatada
        dataFinalInput.value = formattedToday;

        // Define o primeiro dia do mês atual
        var firstDayOfMonth = year + '-' + month + '-01';
        
        // Define o valor do input data_inicial com o primeiro dia do mês atual
        dataInicialInput.value = firstDayOfMonth;
    }
});


$(document).ready(function() {
    $('#busca_clientes').on('input', function() {
        var cliente = $(this).val();
        if (cliente.length >= 3) {
            $.ajax({
                url: 'http://127.0.0.1:8800/graficos/pegar_cliente_pesquisado',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({ cliente: cliente }),
                success: function(data) {
                    var dropdownMenu = $('#menudrop-cliente');
                    dropdownMenu.empty().show();
                    if (data.length > 0) {
                        data.forEach(function(item) {
                            // Cria um elemento de item de menu
                            var menuItem = $('<li></li>').addClass('dropdown-item').text(item.nome);
                            menuItem.on('click', function() {
                                // Atualiza o texto do botão com o nome do item clicado
                                $('#btn_parada_tipo_alerta').text(item.nome);
                                carregarDadosClientes(item.nome);
                                //$('#nome_produto').text(item.nome + ' ');
                                var produto = item.nome;
                                //buscarProduto(produto);
                            });
                            dropdownMenu.append(menuItem);
                        });
                    } else {
                        dropdownMenu.append('<li class="dropdown-item">Nenhum cliente encontrado</li>');
                    }
                },
                error: function(error) {
                    console.error('Erro ao buscar clientes:', error);
                }
            });
        } else {
            $('#menudrop-cliente').hide();
        }
    });

    // Esconde os resultados quando clicar fora
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#busca_clientes').length) {
            $('#menudrop-cliente').hide();
        }
    });

    // Exibe o dropdown quando focar no input
    $('#busca_clientes').on('focus', function() {
        if ($('#busca_clientes').val().length >= 3) {
            $('#menudrop-cliente').show();
        }
    });
});


$(document).ready(function() {
    $('#busca_produtos-1').on('input', function() {
        var produto = $(this).val();
        if (produto.length >= 3) {
            var cliente = document.getElementById('nome_cliente').textContent.trim();
            $.ajax({
                url: 'http://127.0.0.1:8800/graficos/pegar_cliente_produto_pesquisado',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({ cliente: cliente, produto: produto }),
                success: function(data) {
                    var dropdownMenu = $('#menudrop-produto');
                    dropdownMenu.empty().show();
                    if (data.length > 0) {
                        data.forEach(function(item) {
                            // Corrige a chave 'Nome' para corresponder ao retorno do AJAX
                            var menuItem = $('<li></li>').addClass('dropdown-item').text(item.Nome);
                            menuItem.on('click', function() {
                                // Atualiza o texto do botão com o nome do item clicado
                                $('#nome_produto').text(item.Nome + ' ');
                                carregarDadosClientesProduto(item.Nome, cliente);
                                $('#btn_parada_tipo_alerta-1').text(item.Nome);
                            });
                            dropdownMenu.append(menuItem);
                        });
                    } else {
                        dropdownMenu.append('<li class="dropdown-item">Nenhum produto encontrado</li>');
                    }
                },
                error: function(error) {
                    console.error('Erro ao buscar produto:', error);
                }
            });
        } else {
            $('#menudrop-produto').hide();
        }
    });

    // Esconde os resultados quando clicar fora
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#busca_produtos-1').length) {
            $('#menudrop-produto').hide();
        }
    });

    // Exibe o dropdown quando focar no input
    $('#busca_produtos-1').on('focus', function() {
        if ($('#busca_clientes').val().length >= 3) {
            $('#menudrop-produto').show();
        }
    });
});