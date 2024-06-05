$(document).ready(function () {
    // Mostrar ou esconder o menu de perfil ao clicar no botão de perfil
    $('#botao-perfil').click(function () {
        let perfilBox = $('#perfil-menu').css("display");
        if (perfilBox == "none") {
            $('#perfil-menu').css("display", "block");
        } else if(perfilBox == "block"){
            $('#perfil-menu').css("display", "none");
        }
    });



    // Fechar o menu ao clicar fora dele
    $(document).click(function (event) {
        if (!$(event.target).closest('#botao-perfil, #perfil-menu').length) {
            $('#perfil-menu').css("display", "none");
        }
    });

    // Remover os dados da conta do localStorage ao clicar em desconectar
    $('#logout-btn').click(function () {
        // Remover os dados da conta do localStorage
        localStorage.removeItem("usuario");
        localStorage.removeItem("senha");
        localStorage.removeItem("perfilAtivo");
        localStorage.removeItem("favoritos");

        location.reload(); // recarregar a página
    });
});