
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var id_producao = getUrlParameter('id_producao');

$.ajax({ 
    url: 'http://127.0.0.1:8800/linhas/listar_parametros',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ id_producao: id_producao }), // Convertendo para JSON
    success: function(data) {
        // Manipular os dados retornados, por exemplo, exibindo-os na página
        console.log('Dados retornados:', data);
        

        
        $('#label_name_linha-14').text(data[0].id_producao);
        $('#label_produto_acabado').text(data[0].id_produto_acabado);
        $('#label_name_linha').text(data[0].id_produto_acabado);
        $('#label_name_linha-16').text(data[0].nome_produto_materia_prima);
        $('#label_name_linha-17').text(data[0].nome_produto_material);
        
        carregarParadas();
        
        var valorDemanda = data[0].quantidade_demanda_atual;
        // Definindo o valor no elemento input
        $('#campoDemanda').val(valorDemanda);

    },
    error: function(xhr, textStatus, errorThrown) {
        console.log('Erro ao obter dados da linha:', errorThrown);
    }
});          
                  
carregarParametrosLinha();
$(document).ready(function() {
    // Quando uma opção do menu dropdown é clicada
    $('.dropdown-menu-2').on('click', 'a', function() {
        // Obtém o texto da opção clicada
        var selectedText = $(this).text();
        
        // Atualiza o texto do botão com o texto da opção clicada
        $('#btn_quatidadeOperadores').text(selectedText);
    });
});

$(document).ready(function() {
    // Quando uma opção do menu dropdown é clicada
    $('.dropdown-menu-4').on('click', 'a', function() {
        // Obtém o texto da opção clicada
        var selectedText = $(this).text();
        
        // Atualiza o texto do botão com o texto da opção clicada
        $('#btn_parada_tipo_alerta').text(selectedText);
    });
});

$(document).ready(function() {
    // Quando uma opção do menu dropdown é clicada
    $('.dropdown-menu-3').on('click', 'a', function() {
        // Obtém o texto da opção clicada
        var selectedText = $(this).text();
        
        // Atualiza o texto do botão com o texto da opção clicada
        $('#btn_tipoParada').text(selectedText);
    });
});


$(document).ready(function() {
    // Quando uma opção do menu dropdown é clicada
    $('.dropdown-menu-1').on('click', 'a', function() {
        // Obtém o texto da opção clicada
        var selectedText = $(this).text();
        
        $('#btn_turno').text(selectedText);
    });
});

function validarHorario() {
    var input = document.getElementById('horario_iniciado');
    var horario = input.value;

    // Verifica se o horário é maior que 23:59
    if (horario > "23:59") {
        // Define o valor para 23:59
        input.value = "23:59";
    }
};

document.getElementById('btn-mais-um').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.numero_produzido');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 1;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-menos-um').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.numero_produzido');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Decrementar o valor
            //valorAtual = valorAtual - 1;
            valorAtual = Math.max(0, valorAtual - 1);
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-mais-dez').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.numero_produzido');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 10;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-menos-dez').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.numero_produzido');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Decrementar o valor, garantindo que não seja menor que zero
            valorAtual = Math.max(0, valorAtual - 10);
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-mais-cem').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.numero_produzido');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 100;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-menos-cem').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.numero_produzido');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Decrementar o valor, garantindo que não seja menor que zero
            valorAtual = Math.max(0, valorAtual - 100);
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });


document.getElementById('btn-mais-um-min-parada').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.tempo-parada');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 1;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-mais-cinco-min-parada').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.tempo-parada');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 5;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-mais-dez-min-parada').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.tempo-parada');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 10;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-mais-trinta-min-parada').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.tempo-parada');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 30;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('btn-mais-zerar-min-parada').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.tempo-parada');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual = 0;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });


document.getElementById('refugo-mais-mp').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.mp_refugo');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 1;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('refugo-mais-m').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.campo-refugo-m');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 1;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('refugo-mais-ac').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.campo_refugo-mais-ac');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual += 1;
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('refugo-menos-mp').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.mp_refugo');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual = Math.max(0, valorAtual - 1);
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('refugo-menos-m').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.campo-refugo-m');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual = Math.max(0, valorAtual - 1);
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });

document.getElementById('refugo-menos-ac').addEventListener('click', function() {
            // Obter o valor atual do campo
            var campoNumero = document.querySelector('.campo_refugo-mais-ac');
            var valorAtual = parseInt(campoNumero.value);
            
            // Verificar se o valor é null ou undefined e tratá-lo como zero
            if (isNaN(valorAtual)) {
                valorAtual = 0;
            }
            
            // Incrementar o valor
            valorAtual = Math.max(0, valorAtual - 1);
            
            // Atualizar o campo com o novo valor
            campoNumero.value = valorAtual;
        });


document.getElementById('btn-lancar-parada').addEventListener('click', function() {
    updateParadaLinha ();
            var dropdownValue = $('#btn_tipoParada').text();
            var tempoParadaValue = document.getElementById('tempo-parada').value;
            var obsValue = document.getElementById('obs').value.substring(0, 10); // Limita a 10 caracteres

            var novoBotao = document.createElement('button');
            novoBotao.textContent = 'Parada ' + dropdownValue + ' - Tempo: ' + tempoParadaValue + ' - Obs: ' + obsValue;

            // Adicionando estilos diretamente na criação do botão

            novoBotao.style.margin = '5px';
            novoBotao.style.width = '150px';
            novoBotao.style.backgroundColor = '#3498db';
            novoBotao.style.color = '#fff';
            novoBotao.style.border = 'none';
            novoBotao.style.padding = '10px';
            novoBotao.style.borderRadius = '5px';
            novoBotao.style.borderBottom = '5px';

            document.getElementById('div-paradas-linha').appendChild(novoBotao);
            
            
            // Limpa os campos tempo-parada e obs
            $('#tempo-parada').val('');
            $('#obs').val('');
    
            novoBotao.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });

$(document).ready(function() {
    $('#valida_horario').click(function() {
        var btnValidaHorario = $(this);
        if (btnValidaHorario.text() === "Alterar") {
            btnValidaHorario.text("Validar").css('background-color', 'rgb(59,152,63)');
            $('#horario_iniciado').prop('disabled', false);
        } else {
            updateProducaoTime();
            btnValidaHorario.text("Alterar").css('background-color', 'yellow');
            $('#horario_iniciado').prop('disabled', true);
        }
    });
});

function updateProducaoTime() {
    var horarioIniciado = $('#horario_iniciado').val();
    var horarioProducao = $('#horario_producao');

    // Obtém a hora atual
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    // Converte o horário iniciado para um objeto Date
    var horaIniciadoDate = new Date();
    horaIniciadoDate.setHours(parseInt(horarioIniciado.split(':')[0]));
    horaIniciadoDate.setMinutes(parseInt(horarioIniciado.split(':')[1]));

    // Verifica se o horário iniciado é maior que o horário atual
    if (horaIniciadoDate > now) {
        alert("O horário iniciado não pode ser maior que o horário atual. Por favor, insira um valor de hora menor que o horário atual.");
        $('#horario_iniciado').val('');
        return; // Para a execução da função
    }

    // Calcula o tempo decorrido desde o horário iniciado
    var elapsedHours = hours - horaIniciadoDate.getHours();
    var elapsedMinutes = minutes - horaIniciadoDate.getMinutes();

    // Garante que os minutos estejam entre 0 e 59
    if (elapsedMinutes < 0) {
        elapsedHours--;
        elapsedMinutes += 60;
    }

    // Formata a hora de produção
    var horaProducaoHours = (elapsedHours < 10 ? '0' : '') + elapsedHours;
    var horaProducaoMinutes = (elapsedMinutes < 10 ? '0' : '') + elapsedMinutes;
    var horaProducao = horaProducaoHours + ':' + horaProducaoMinutes;

    // Atualiza o valor do campo horario_producao
    horarioProducao.val(horaProducao);

    // Chama a função novamente a cada segundo
    setTimeout(updateProducaoTime, 1000);
};

function updateParadaLinha (){
    
    var id_producao = parseInt($('#label_name_linha-14').text());
    //const id_producao = parseInt(labelNameText.split('-')[1]); // Extraindo o número da string e convertendo para inteiro
    var minutos = parseInt(document.getElementById('tempo-parada').value);

// Converter minutos para horas e minutos
    var horas = Math.floor(minutos / 60);
    var minutosRestantes = minutos % 60;

// Formatar o tempo no formato HH:MM:SS
    var tempo =  '00:'+('00' + horas).slice(-2) + ':' + ('00' + minutosRestantes).slice(-2);
    // Obter valores dos inputs
    
    //const tempo = $('#tempo-parada').val(); // Valor do input time
    const tipo = $('#btn_tipoParada').text(); // Valor do texto do botão
    const observacao = $('#obs').val(); // Valor do input text
    
    $.ajax({ 
        url: 'http://127.0.0.1:8800/paradas/inserir_paradas',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ id_producao: id_producao,
                                tempo: tempo,
                                tipo: tipo,
                                observacao: observacao }),
                                 // Convertendo para JSON
        success: function(data) {
            // Manipular os dados retornados, por exemplo, exibindo-os na página
            atualizarParadaLinha();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Erro ao obter dados da linha:', errorThrown);
        }
    });
    
   // atualizarParadaLinha();

};

function atualizarParadaLinha() {
    var id_producao = parseInt($('#label_name_linha-14').text());
    
    $.ajax({ 
        url: 'http://127.0.0.1:8800/paradas/tempo_total_paradas',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify ({ id_producao: id_producao }), // Removendo a conversão para JSON
        success: function(data) {
            // Manipular os dados retornados, por exemplo, exibindo-os na página
            const tempo_total = data["Tempo Total"];
            $('#soma-paradas').text(tempo_total);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Erro ao obter dados da linha:', errorThrown);
        }
    });
};



function carregarParadas() {
    
    var id_producao = parseInt($('#label_name_linha-14').text());
    $.ajax({
        url: 'http://127.0.0.1:8800/paradas/paradas_linha', // Substitua pela URL da sua rota que retorna as paradas
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify ({ id_producao: id_producao }),
        success: function(data) {
            // Itera sobre os dados recebidos
            data.forEach(function(parada) {
                // Cria um novo botão para cada parada
                var novoBotao = document.createElement('button');
                novoBotao.textContent = 'Parada ' + parada.tipo + ' - Tempo: ' + parada.tempo + ' - Obs: ' + parada.observação;

                // Adiciona estilos
                var obsValue = document.getElementById('obs').value.substring(0, 10);
                novoBotao.style.margin = '5px';
                novoBotao.style.width = '150px';
                novoBotao.style.backgroundColor = '#3498db';
                novoBotao.style.color = '#fff';
                novoBotao.style.border = 'none';
                novoBotao.style.padding = '10px';
                novoBotao.style.borderRadius = '5px';
                novoBotao.style.borderBottom = '5px';

                // Adiciona o botão à div
                document.getElementById('div-paradas-linha').appendChild(novoBotao);
                atualizarParadaLinha();
            });
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Erro ao carregar paradas:', errorThrown);
        }
    });
}

document.getElementById('btn_return2').addEventListener('click', function() {
    
    var id_producao = parseInt($('#label_name_linha-14').text());
    
    var quatidadeOperadores = parseInt($('#btn_quatidadeOperadores').text());
    var turno = $('#btn_turno').text();

    var quantidadeProduzida = parseInt(document.getElementById('numero_produzido').value);

    var horaInicial = document.getElementById('horario_iniciado').value;

    var refugoMateriaPrima = parseInt(document.getElementById('mp_refugo').value);

    var refugoMaterias = parseInt(document.getElementById('campo-refugo-m').value);
    
    var refugoProdutoAcabado = parseInt(document.getElementById('campo_refugo-mais-ac').value);
    $.ajax({ 
        url: 'http://127.0.0.1:8800/paradas/atualizacao_linhas',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify ({ 
                    "id_producao": id_producao,
            "quatidadeOperadores": quatidadeOperadores,
            "turno": turno,
            "quantidadeProduzida": quantidadeProduzida,
            "horaInicial": horaInicial,
            "refugoMateriaPrima": refugoMateriaPrima,
            "refugoMaterias": refugoMaterias,
            "refugoProdutoAcabado": refugoProdutoAcabado
         }),
        success: function(data) {
            console.log("ok");
            window.location.href = "untitled.html";
            
        },
        error: function(data) {
            console.log('Erro ao obter dados da linha:', errorThrown);
        }
    });

});

function carregarParametrosLinha(){
    
    var id_producao = getUrlParameter('id_producao');

    $.ajax({ 

        url: 'http://127.0.0.1:8800/linhas/atualizar_parametros_linha',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ id_producao: id_producao }), // Convertendo para JSON
        success: function(data) {
            // Manipular os dados retornados, por exemplo, exibindo-os na página
            
            $('#btn_quatidadeOperadores').text(data[0].quantidade_operadores);
            $('#btn_turno').text(data[0].turno);
            $('#numero_produzido').text(data[0].quantidade_produzidas);
            $('#horario_iniciado').text(data[0].hora_inicial);
            $('#mp_refugo').text(data[0].quantidade_refugo_materia_prima);
            $('#campo-refugo-m').text(data[0].quantidade_refugo_material);
            $('#campo_refugo-mais-ac').text(data[0].quantidade_refugo_produto_acabado);

        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Erro ao obter dados da linha:', errorThrown);
        }
    });
    
};

$(document).ready(function() {
    
    $.ajax({ 
    url: 'http://127.0.0.1:8800/paradas/listar_paradas_linha_topo',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({ id_producao: id_producao }), // Convertendo para JSON
    success: function(data) {
        // Manipular os dados retornados, por exemplo, exibindo-os na página
        
        
        carregarParadas();
        
        var data = data[0].data;
        var tipo = data[0].tipo;
        
        

    },
    error: function(xhr, textStatus, errorThrown) {
        console.log('Erro ao obter dados da linha:', errorThrown);
    }
});    
})


var contador; // Variável global para armazenar o contador

document.getElementById('btn-parar-linha').addEventListener('click', function() {
    // Selecionar o botão status-parada
    var botaoStatusParada = document.getElementById('status-parada');
    
    // Selecionar a label texto-parada
    var labelTextoParada = document.getElementById('texto-parada');
    

    // Verificar o texto atual do botão
    if (botaoStatusParada.textContent === 'Produzindo') {
        // Iniciar cronômetro
        var tempoInicial = Date.now();
        contador = setInterval(function() {
            var tempoAtual = Date.now();
            var diferenca = tempoAtual - tempoInicial;
            var horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            var segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
            labelTextoParada.textContent = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
        }, 1000);
        
        var body = document.querySelector('body');
        body.style.backgroundColor = '#f43f4f'; //vermelhinho

        var html = document.querySelector('html');
        html.style.backgroundColor = '#f43f4f';//vermelhinho
        
        // Alterar texto para Produzindo e cor para verde
        
        //var audio = new Audio('C:\Users\ACER\Desktop\PROJETO IFSP\IFSP-SEMESTRE-6\Projeto Integrado II\top-indicators-front-end\sonds\sirene.mp3');
        
        //audio.play();
        
        botaoStatusParada.textContent = 'Produção Parada';
        botaoStatusParada.style.backgroundColor = 'red';
        labelTextoParada.style.color = '#75263d';
        updateParadaLinhaTopo ();
    } else {
        // Parar cronômetro
        clearInterval(contador);
        labelTextoParada.textContent = '00:00:00';
        
        // Caso contrário, alterar texto para Produção Parada e cor para vermelho
        var body = document.querySelector('body');
        body.style.backgroundColor = '#c9e8dd'; //verdinho

        var html = document.querySelector('html');
        html.style.backgroundColor = '#c9e8dd'; //verdinho
        
        botaoStatusParada.textContent = 'Produzindo';
        botaoStatusParada.style.backgroundColor = 'green';
        labelTextoParada.style.color = 'green';
        
        finalizarParadaLinhaTopo ();
    }
});


function updateParadaLinhaTopo (){
    
    var id_producao = parseInt($('#label_name_linha-14').text());
    //const id_producao = parseInt(labelNameText.split('-')[1]); // Extraindo o número da string e convertendo para inteiro
    
    //const tempo = $('#tempo-parada').val(); // Valor do input time
    const tipo = $('#btn_parada_tipo_alerta').text(); // Valor do texto do botão

    
    $.ajax({ 
        url: 'http://127.0.0.1:8800/paradas/InserirParadasTopo',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ id_producao: id_producao,
                                tipo: tipo }),
                                 // Convertendo para JSON
        success: function(data) {
            // Manipular os dados retornados, por exemplo, exibindo-os na página
            atualizarParadaLinha();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Erro ao obter dados da linha:', errorThrown);
        }
    });
    
   // atualizarParadaLinha();

};

function finalizarParadaLinhaTopo (){
    
    var id_producao = parseInt($('#label_name_linha-14').text());
    //const id_producao = parseInt(labelNameText.split('-')[1]); // Extraindo o número da string e convertendo para inteiro

    
    $.ajax({ 
        url: 'http://127.0.0.1:8800/paradas/FinalizarParadasTopo',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ id_producao: id_producao }),
                                 // Convertendo para JSON
        success: function(data) {
            // Manipular os dados retornados, por exemplo, exibindo-os na página
            atualizarParadaLinha();
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('Erro ao obter dados da linha:', errorThrown);
        }
    });
    
   // atualizarParadaLinha();
};