
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

                console.log("status 200");
                
                 if (data.grupo_acesso === "Supervisor") {
                    window.location = "index-1.html";
                    clearCache();
                 }

                 if (data.grupo_acesso === "Operador") {
                    window.location = "untitled.html";
                    clearCache();
                 }else{
                    alert("Usuario sem permissão para esses modulos"); 
                    clearCache();
                 }


            } else {
                
                alert("Login inválido. Por favor, verifique seu usuário e senha ou entre em contato com seu supervisor.");

                clearCache();
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
    

function clearCache() {

    caches.open('default').then(function(cache) {
        // Limpar todo o cache
        cache.delete().then(function() { // Removi o 'All' daqui, pois não é uma função válida
            console.log("Cache limpo com sucesso!");
        }).catch(function(error) {
            console.log("Erro ao limpar o cache:", error);
        });
    })
}