// Função para executar quando o documento estiver pronto
$(document).ready(function () {

    // Evento de clique no botão de adesão
    $("#join-btn").click(function () {
        // Obtém o nome de usuário e senha dos campos de entrada
        let username = $("#username").val();
        let senha = $("#password").val();
        let nome = $("#fName").val();
        // Verifica se os campos não estão vazios
        if (username != "" && senha != "") {
            // Verifica se a senha de confirmação corresponde à senha inserida
            let senhaConfirmada = $("#password-confirmation").val();
            // Armazena o nome de usuário e a senha no localStorage
            localStorage.setItem("usuario", username);
            localStorage.setItem("senha", senha);
            localStorage.setItem("nome", nome);
            // Redireciona para a página de sucesso se a senha for confirmada corretamente
            if (senhaConfirmada === senha) {
                document.location = "success_signup.html";
            } else {
                // Exibe uma mensagem de erro se a senha de confirmação não corresponder à senha inserida
                $("#user-pass-req").removeClass("active");
                $("#no-match-psw").addClass("active");
            }
        } else {
            // Exibe uma mensagem de erro se os campos de entrada estiverem vazios
            $("#no-match-psw").removeClass("active");
            $("#user-pass-req").addClass("active");
        }
    })

    // Evento de clique no logo
    $(".logo").click(function () {
        // Redireciona para a página inicial ao clicar no logo
        document.location = "index.html";
    })
})