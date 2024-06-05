
function showCopyNotification(message) {
    // Criar elemento de notificação
    const notification = $('<div class="copy-notification"></div>').text(message);
    
    // Adicionar a notificação ao corpo do documento
    $(".saved-list").prepend(notification);
    
    // Mostrar a notificação
    notification.fadeIn(200);
    
    // Esconder a notificação após 3 segundos e removê-la
    setTimeout(function() {
        notification.fadeOut(200, function() {
            $(this).remove();
        });
    }, 3000);
}

// Função para abrir o modal de login
function openLogin() {
    modal.style.display = "block";
}

// Função para fechar o modal de login
function closeLogin() {
    modal.style.display = "none";
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

let body = $("body");

// Verifica se há um perfil ativo armazenado no sessionStorage ou localStorage e, em caso afirmativo, mostra o perfil
let perfilAtivoSession = sessionStorage.getItem("perfilAtivo");
let perfilAtivoLocal = localStorage.getItem("perfilAtivo");
if (perfilAtivoSession || perfilAtivoLocal) {
    mostrarPerfil();
} else {
    body.html("<p style='color: red'>Error: Please, <a class='force-log-in'>log in</a> to access this page</p>");
}

$(".force-log-in").click(function () {
    document.location = "index.html"
})

let myFav = JSON.parse(localStorage.getItem("favoritos")) || [];

for (let i = 0; i < myFav.length; i++) {
    let fav = myFav[i];
    let cardHTML = `
        <div class="movie-card ${fav.mediaType} card-${i}">
            <div class="info-section">
                <div class="movie-header">
                    <img class="locandina" src="${fav.poster}" alt="poster do filme">
                    <h1>${fav.name}</h1>
                    <h4>Release date: ${fav.release}</h4>
                    <button id="like-btn${i}" class="change-color like-btn-style">
                        <svg id="svg-${i}" width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#feffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
                <div class="movie-desc">
                    <p class="text">${fav.description}</p>
                </div>
            </div>  
            <div class="blur-back card-back">
                <img src="${fav.backdrop}" width="100%" alt="imagem do filme">
            </div>
        </div>`;
    
        
        if (fav.mediaType === "movie") {
            $(".filmes").append(cardHTML);
            $(".movie").fadeIn();
        } else if (fav.mediaType === "tv") {
            $(".series").append(cardHTML);
            $(".tv").fadeIn();
        }

        // Adiciona um manipulador de eventos de clique para o botão de like
        $(`#like-btn${i}`).click(function () {
            let corSvg = $(`#svg-${i}`).attr("fill");
                $(`#svg-${i}`).attr("fill", "none");
                removerFavorito(fav);
                $(`.card-${i}`).remove();
        })

        // Verifica se o item atual já está nos favoritos e atualiza o preenchimento do botão de like
        for (let i = 0; i < myFav.length; i++) {
            let itemFavorito = myFav[i]
            if (itemFavorito.name == fav.title || itemFavorito.name == fav.name) {
                $(`#svg-${i}`).attr("fill", "red");
            }
        }
}

if (myFav == "") {
    $(".saved-list").append("<p class='empty-list'>Your list is empty</p>");
} else {
    document.getElementsByTagName("footer")[0].removeAttribute("class");
}

let localName = localStorage.getItem("nome");
let localUser = localStorage.getItem("usuario");

if(localName) {
    $(".fav").html(`${localName}'s list`);
} else if (localUser) {
    $(".fav").html(`${localUser}'s list`);
}

$('#myList').on('click', function(event) {
    event.preventDefault(); // Prevenir o comportamento padrão do link

    let myFav = JSON.parse(localStorage.getItem("favoritos")) || []; // pega a lista de favoritos

    const encodedList = encodeURIComponent(JSON.stringify(myFav))
    const baseUrl = window.location.href.split('?')[0]; //cria uma URL base
    const shareLink = `${baseUrl}?list=${encodedList}`; // cria a URL com os dados da lista
    
    navigator.clipboard.writeText(shareLink).then(function() {
        // Exibir uma mensagem de sucesso
        showCopyNotification('Link copiado para a área de transferência!');
    }, function(err) {
        // Exibir uma mensagem de erro
        showCopyNotification('Falha ao copiar o link: ' + err);
    });
});