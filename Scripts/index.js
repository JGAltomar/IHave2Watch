
// Função para abrir o modal de login
function openLogin() {
    modal.style.display = "block";
}

// Função para fechar o modal de login
function closeLogin() {
    modal.style.display = "none";
}

// Função para mostrar o perfil do usuário
function mostrarPerfil() {
    // Mostra o botão de perfil
    $("#botao-perfil").css("display", "block");
    // Esconde os botões de navegação
    $(".nav-btn").hide();
    // Mostra os favoritos
    $(".fav").css("display", "block");
}

// Obtém a referência do modal de login
let modal = document.getElementById("idLogin");

// Evento que fecha o modal de login quando o usuário clica fora dele
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Evento para redirecionar para a página de inscrição ao clicar no botão de inscrição
$(".sign-btn").click(function () {
    document.location = "signup.html";
})

// Obtém os programas de TV em alta da API do The Movie Database e os exibe na página
$.getJSON("https://api.themoviedb.org/3/trending/tv/week?api_key=082080ed30cf67f7c5b4b4293fb7cb5e&language=en-US&include_adult=false", function (data) {
    // Itera sobre os resultados recebidos
    for (let i = 0; i < 10; i++) {
        let movieName = data.results[i].name;
        let poster = data.results[i].poster_path;
        let posterURL = "https://image.tmdb.org/t/p/w500" + poster;
        let desc = data.results[i].overview;
        // Adiciona os detalhes do programa de TV ao contêiner de banners na página
        $(".banner-container").append(`
            <h3 class="top-list">Top ${i + 1}
                <div class="card">
                    <img src="${posterURL}" alt="Poster"></img>
                    <div class="descriptions">
                        <h1>${movieName}</h1>
                        <p>${desc}</p>
                    </div>
            </h3>        
        `)
    }
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
        $("#no-match-psw").css("display", "block");
    }
}); 

// Verifica se há um perfil ativo armazenado no sessionStorage ou localStorage e, em caso afirmativo, mostra o perfil
let perfilAtivoSession = sessionStorage.getItem("perfilAtivo");
let perfilAtivoLocal = localStorage.getItem("perfilAtivo");
if (perfilAtivoSession || perfilAtivoLocal) {
    mostrarPerfil();
}

// Evento para redirecionar para a página de pesquisa ao clicar no botão de exploração
$(".explore-btn").click(function() {
    document.location = "search.html";
})

// Evento para lidar com erros na solicitação AJAX para obter programas de TV em alta
$(document).ajaxError(function () {
    // Exibe uma mensagem de erro caso haja um problema ao carregar os programas de TV em alta
    $(".banner-container").html("<p style='color: red;'>Erro ao carregar os programas de TV em alta. Tente novamente mais tarde.</p>");
});

let localName = localStorage.getItem("nome");
let localUser = localStorage.getItem("usuario");

if(localName) {
    $(".fav").html(`${localName}'s list`);
} else if (localUser) {
    $(".fav").html(`${localUser}'s list`);
}

$(document).keydown(function(e) {
    // Verifica se as teclas Shift, J e V foram pressionadas ao mesmo tempo
    if (e.shiftKey && e.key === " ") {
        // Executa a ação desejada
        document.location = "tic-tac-toe.html";
        
    }
});
