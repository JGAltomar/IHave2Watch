// Função para mostrar o perfil do usuário
function mostrarPerfil() {
    // Exibe o botão de perfil
    $("#botao-perfil").css("display", "block");
    // Esconde os botões de navegação
    $(".nav-btn").hide();
    // Exibe a seção de favoritos
    $(".fav").css("display", "block");
}

// Função para adicionar um item aos favoritos
function adicionarFavorito(item) {
    // Cria um objeto representando o item favorito
    let itemFavorito = {
        name: item.title || item.name,
        mediaType: item.media_type,
        description: item.overview,
        backdrop: "https://image.tmdb.org/t/p/w500" + item.backdrop_path,
        poster: "https://image.tmdb.org/t/p/w500" + item.poster_path,
        release: item.release_date || item.first_air_date,
    };
    // Obtém a lista de favoritos do armazenamento local ou cria uma nova lista vazia
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Adiciona o item à lista de favoritos
    favoritos.push(itemFavorito);
    // Salva a lista de favoritos atualizada no armazenamento local
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Função para remover um item dos favoritos
function removerFavorito(index) {
    // Obtém a lista de favoritos do armazenamento local ou cria uma nova lista vazia
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Remove o item da lista de favoritos usando o índice fornecido
    favoritos.splice(index, 1);
    // Salva a lista de favoritos atualizada no armazenamento local
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Função para abrir o modal de login
function openLogin() {
    modal.style.display = "block";
}

// Função para fechar o modal de login
function closeLogin() {
    modal.style.display = "none";
}

// Remove o texto de campos de entrada ao clicar no "x"
const clear = document.querySelectorAll('.clear');
for (let i = 0; i < clear.length; i++) {
    clear[i].addEventListener("click", function () {
        clear[i].previousElementSibling.value = '';
    });
}

// Obtém a referência do modal de login
let modal = document.getElementById("idLogin");

// Evento que fecha o modal de login quando o usuário clica fora dele
window.onclick = function (event) {
    // Fecha o modal se o usuário clicar fora dele
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Evento para redirecionar para a página de inscrição ao clicar no botão de inscrição
$(".sign-btn").click(function () {
    document.location = "signup.html";
})

// -- Sessão de Pesquisa e resultado --

// Evento que ocorre quando uma tecla é pressionada no campo de pesquisa
$(".search-input").on("keypress", function (e) {
    // Obtém o texto digitado no campo de pesquisa
    var enter = $("#search-bar").val();

    // Verifica se a tecla pressionada é Enter (código 13)
    if (e.keyCode === 13) {
        // Limpa os conteúdos das seções de filmes e séries
        $(".filmes").empty();
        $(".series").empty();

        // Mostra as seções de filmes e séries
        $(".movie").fadeIn();
        $(".tv").fadeIn();

        // Realiza uma solicitação AJAX para a API do TMDB para buscar resultados baseados no texto digitado
        $.getJSON("https://api.themoviedb.org/3/search/multi?api_key=082080ed30cf67f7c5b4b4293fb7cb5e&language=en-US&query=" + enter + "&include_adult=false", function (data) {
            console.log(data);

            // Verifica se não há resultados encontrados
            if (data.total_results == 0) {
                // Exibe uma mensagem de erro indicando que a pesquisa não retornou resultados
                $(".filmes, .series").html(`<p class="error">Search "${enter}" not found.</p>`);
            } else {
                // Loop através dos resultados retornados pela pesquisa
                for (let i = 0; i < data.results.length; i++) {
                    // Remove a classe do footer, se presente, para permitir a rolagem da página
                    document.getElementsByTagName("footer")[0].removeAttribute("class");

                    // Obtém os detalhes do item atual
                    let item = data.results[i];
                    let name;
                    let releaseDate;
                    let mediaType = item.media_type;
                    if (mediaType === "movie") {
                        name = item.title;
                        releaseDate = item.release_date;
                    } else {
                        name = item.name;
                        releaseDate = item.first_air_date;
                    }
                    let description = item.overview;
                    let poster = item.poster_path;
                    let posterURL = "https://image.tmdb.org/t/p/w500" + poster;
                    let backdrop = item.backdrop_path;
                    let backdropURL = "https://image.tmdb.org/t/p/w500" + backdrop;

                    // Verifica se não há imagem de fundo disponível e usa a imagem do poster como alternativa
                    if (backdrop == null) backdropURL = posterURL;

                    // Constrói o HTML para exibir o cartão do filme ou série
                    let cardHTML = `
                    <div class="movie-card ${mediaType}">
                        <div class="info-section">
                            <div class="movie-header">
                                <img class="locandina" src="${posterURL}" alt="poster do filme">
                                <h1>${name}</h1>
                                <h4>Release date: ${releaseDate}</h4>
                                <button id="like-btn${i}" class="change-color like-btn-style">
                                    <svg id="svg-${i}" width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#feffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="movie-desc">
                                <p class="text">${description}</p>
                            </div>
                        </div>  
                        <div class="blur-back card-back">
                            <img src="${backdropURL}" width="100%" alt="imagem do filme">
                        </div>
                    </div>`;

                    // Adiciona o HTML do cartão ao contêiner apropriado (filmes ou séries)
                    if (mediaType === "movie") {
                        $(".filmes").append(cardHTML);
                    } else if (mediaType === "tv") {
                        $(".series").append(cardHTML);
                    }

                    // Adiciona um manipulador de eventos de clique para o botão de like
                    $(`#like-btn${i}`).click(function () {
                        let corSvg = $(`#svg-${i}`).attr("fill");
                        if (corSvg == "none") {
                            $(`#svg-${i}`).attr("fill", "red");
                            adicionarFavorito(item);
                        } else {
                            $(`#svg-${i}`).attr("fill", "none");
                            removerFavorito(item);
                        }
                    })

                    // Verifica se o item atual já está nos favoritos e atualiza o preenchimento do botão de like
                    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
                    for (let i = 0; i < favoritos.length; i++) {
                        let itemFavorito = favoritos[i];
                        if (itemFavorito.name == item.title || itemFavorito.name == item.name) {
                            $(`#svg-${i}`).attr("fill", "red");
                        }
                    }
                }
            }
        })
    }
});

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
        if (checked) {
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

$(".movie-search").click(function(){
    let posicaoFinal = $(".search").offset().top;
    $("html, body").animate({ scrollTop: posicaoFinal } , "slow");
});

$(".series-search").click(function(){
    let posicaoFinal = $(".tv").offset().top;
    $("html, body").animate({ scrollTop: posicaoFinal } , "slow");
});