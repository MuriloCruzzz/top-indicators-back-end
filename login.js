$("#btn_login").on("click", function(){

    let user = {
        user: $("#user").val(),
        senha: $("#senha").val()
    };

    $.ajax({
        url: 'http://127.0.0.1:8800/users/validar_usuario',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(user),
        success: function (data, xhr) {

            if (data.message == "success") {
                switch (data.grupo_acesso) {
                    case "Supervisor":
                        window.location = "index-1.html";
                        console.log("TEste sup");
                        break;
                    case "Operador":
                        window.location = "untitled.html";
                        console.log("TEste sup2");
                        break;
                    default:
                        alert("Usuário sem permissão para esses módulos");
                }
            } else {
                alert("Login inválido. Por favor, verifique seu usuário e senha ou entre em contato com seu supervisor.");
            }
                  
        },

        error: function (xhr) {
            if (xhr.status == 0) {
                alert("Erro: Não foi possível conectar-se ao servidor. Por favor, verifique sua conexão de internet ou entre em contato com seu supervisor.");
            } else {
                alert("Erro desconhecido. Por favor, entre em contato com seu supervisor.");
            }
        }
    });
});

