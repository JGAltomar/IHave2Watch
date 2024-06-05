// Função para abrir a janela de login
function openLogin() {
    modal.style.display = "block";
}

// Função para fechar a janela de login
function closeLogin() {
    modal.style.display = "none";
}

// Função para mostrar o perfil do usuário
function mostrarPerfil() {
    $("#botao-perfil").css("display", "block");
    $(".nav-btn").hide();
    $(".fav").css("display", "block");
}

// Função para filtrar elementos
function filterSelection(c) {
    // Obtém os elementos a serem filtrados
    let x = document.getElementsByClassName("filterDiv");
    if (c == "all") {
        c = "";
    }
    // Adiciona ou remove classes para mostrar ou esconder os elementos filtrados
    for (let i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) {
            addClass(x[i], "show");
        }
    }
}

// Função auxiliar para adicionar classes
function addClass(element, name) {
    let arr1 = element.className.split(" ");
    let arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Função auxiliar para remover classes
function removeClass(element, name) {
    let arr1 = element.className.split(" ");
    let arr2 = name.split(" ");
    for (let i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Obtém a referência do modal de login
let modal = document.getElementById("idLogin");

// Define a seleção ativa no botão de filtro
let btnContainer = document.getElementsByClassName("join-team-container");
let btns = document.getElementsByClassName("filter-btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

// Fecha o modal quando o usuário clica fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Redireciona para a página de Signup
$(".sign-btn").click(function () {
    document.location = "signup.html";
})

// Função para realizar o login
$("#login-btn").click(function () {
    // Obtém os dados de login do localStorage
    let localUsername = localStorage.getItem("usuario");
    let localSenha = localStorage.getItem("senha");
    // Obtém os dados inseridos pelo usuário
    let username = $("#uname").val();
    let senha = $("#psw").val();
    let checked = $("#remember").val();

    // Verifica se os dados de login estão corretos
    if (localUsername == username && localSenha == senha) {
        closeLogin();
        mostrarPerfil();
        // Armazena a informação de perfil ativo no localStorage ou sessionStorage
        if (checked == true) {
            localStorage.setItem("perfilAtivo", true);
        } else {
            sessionStorage.setItem("perfilAtivo", true);
        }
    } else {
        // Exibe uma mensagem de erro se os dados de login estiverem incorretos
        $("#no-match-psw").addClass("show-msg");
    }
}); 

// Verifica se há um perfil ativo armazenado no localStorage ou sessionStorage e mostra o perfil
let perfilAtivoSession = sessionStorage.getItem("perfilAtivo");
let perfilAtivoLocal = localStorage.getItem("perfilAtivo");
if (perfilAtivoSession || perfilAtivoLocal) {
    mostrarPerfil();
}

// Função para rolar para a seção de oportunidades
$(".opportunity-btn").click(function(){
    let posicaoFinal = $(".join-team-container").offset().top;
    $("html, body").animate({ scrollTop: posicaoFinal } , "slow");
});

let localName = localStorage.getItem("nome");
let localUser = localStorage.getItem("usuario");

if(localName) {
    $(".fav").html(`${localName}'s list`);
} else if (localUser) {
    $(".fav").html(`${localUser}'s list`);
}