// Função para abrir o modal de login
function openLogin() {
    modal.style.display = "block"; // Define o estilo para exibir o modal
}

// Função para fechar o modal de login
function closeLogin() {
    modal.style.display = "none"; // Define o estilo para ocultar o modal
}

// Função para mostrar o perfil do usuário
function mostrarPerfil() {
    $("#botao-perfil").css("display", "block"); // Mostra o botão de perfil
    $(".nav-btn").hide(); // Esconde os botões de navegação
    $(".fav").css("display", "block"); // Mostra os favoritos
}

// Obtém a referência do modal de login
let modal = document.getElementById("idLogin");

// Evento que fecha o modal de login quando o usuário clica fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"; // Define o estilo para ocultar o modal
    }
}

// Evento para redirecionar para a página de inscrição ao clicar no botão de inscrição
$(".sign-btn").click(function () {
    document.location = "signup.html"; // Redireciona para a página de inscrição
})

// Evento para lidar com o clique no botão de login
$("#login-btn").click(function () {
    let localUsername = localStorage.getItem("usuario");
    let localSenha = localStorage.getItem("senha");
    let username = $("#uname").val();
    let senha = $("#psw").val();
    let checked = $('#remember').is(":checked");
    // Verifica se o nome de usuário e a senha correspondem aos armazenados
    if (localUsername == username && localSenha == senha) {
        // Fecha o modal de login
        closeLogin();
        // Mostra o perfil
        mostrarPerfil();
        // Armazena a preferência de "lembrar" o usuário
        if(checked) {
            localStorage.setItem("perfilAtivo", true);
        } else {
            sessionStorage.setItem("perfilAtivo", true);
        }
    } else {
        // Exibe uma mensagem de erro caso as credenciais sejam inválidas
        $("#no-match-psw").addClass("show-msg");
    }
}); 

// Verifica se há um perfil ativo armazenado no sessionStorage ou localStorage e, em caso afirmativo, mostra o perfil
let perfilAtivoSession = sessionStorage.getItem("perfilAtivo");
let perfilAtivoLocal = localStorage.getItem("perfilAtivo");
if (perfilAtivoSession || perfilAtivoLocal) {
    mostrarPerfil();
}

let localName = localStorage.getItem("nome");
let localUser = localStorage.getItem("usuario");

if(localName) {
    $(".fav").html(`${localName}'s list`);
} else if (localUser) {
    $(".fav").html(`${localUser}'s list`);
}