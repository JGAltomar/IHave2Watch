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

function checkPlayer(p1, p2) {
    if (p1 == p2) {
         check = x;
    } else {
         check = o;
    }
    return check;
}

function AIplay() {

    cloneO = o.clone();
    let cont = 0;
    let fill = 0;

    for (let i = 0; i < blck.length; i++) {

        let randomChoice = Math.floor(Math.random() * 5);
        //só preenche se o filho estiver vazio
        if (blck.eq(i).children().length == 0) {
            if (randomChoice <= 1) {
                blck.eq(i).append(cloneO);
                cont++;
                break;
            }
            //checa quantas estao preenchidas
        } else {
            fill++;
        }
    }

    if (cont == 0 && fill < 9) {
        AIplay();
    }

}

function winCheck() {
    let cont = 0;

    let classesFilhos = [];
    for (let i = 1; i <= 9; i++) {
        let filho = $("#blck" + i).children().attr("class");
        classesFilhos.push(filho);
    }

    console.log(classesFilhos);

    if (classesFilhos[0] == "x" && classesFilhos[1] == "x" && classesFilhos[2] == "x" ||
        classesFilhos[3] == "x" && classesFilhos[4] == "x" && classesFilhos[5] == "x" ||
        classesFilhos[6] == "x" && classesFilhos[7] == "x" && classesFilhos[8] == "x" ||
        classesFilhos[0] == "x" && classesFilhos[3] == "x" && classesFilhos[6] == "x" ||
        classesFilhos[1] == "x" && classesFilhos[4] == "x" && classesFilhos[7] == "x" ||
        classesFilhos[2] == "x" && classesFilhos[5] == "x" && classesFilhos[8] == "x" ||
        classesFilhos[0] == "x" && classesFilhos[4] == "x" && classesFilhos[8] == "x" ||
        classesFilhos[2] == "x" && classesFilhos[4] == "x" && classesFilhos[6] == "x") {
        vencedor("x");
    } else if (classesFilhos[0] == "o" && classesFilhos[1] == "o" && classesFilhos[2] == "o" ||
        classesFilhos[3] == "o" && classesFilhos[4] == "o" && classesFilhos[5] == "o" ||
        classesFilhos[6] == "o" && classesFilhos[7] == "o" && classesFilhos[8] == "o" ||
        classesFilhos[0] == "o" && classesFilhos[3] == "o" && classesFilhos[6] == "o" ||
        classesFilhos[1] == "o" && classesFilhos[4] == "o" && classesFilhos[7] == "o" ||
        classesFilhos[2] == "o" && classesFilhos[5] == "o" && classesFilhos[8] == "o" ||
        classesFilhos[0] == "o" && classesFilhos[4] == "o" && classesFilhos[8] == "o" ||
        classesFilhos[2] == "o" && classesFilhos[4] == "o" && classesFilhos[6] == "o") {
        vencedor("o");
    } else {
        for (let i = 0; i < classesFilhos.length; i++) {
            if (classesFilhos[i] == "x" || classesFilhos[i] == "o") {
                cont++;
            }
        }
        if (cont == 9) {
            vencedor();
        }
    }
}

function vencedor(winner) {

    if (winner == "x") {
        scoreX++;
        $(".msg").html("Player 1 won the round, congrats!");
        $(".msg-container").fadeIn();
        $(".score-count-x").html(scoreX);
    } else if (winner == "o") {
        scoreO++;
        $(".msg").html("Player 2 won the round, congrats!");
        $(".msg-container").fadeIn();
        $(".score-count-o").html(scoreO);
    } else {
        $(".msg").html("DRAW!");
        $(".msg-container").fadeIn();
    }

    setTimeout(function () {
        $(".msg-container").fadeOut();
    }, 3000)

    p1 = 0;
    p2 = 0;

    let cleanBlck = $(".blck div");

    for (let i = 0; i < cleanBlck.length; i++) {
        setTimeout(function () {
            cleanBlck.eq(i).remove();
        }, 3000);
    }
}

let x = $(".x");
let o = $(".o");
let blck = $(".blck");
let scoreX = 0;
let scoreO = 0;
let buttons = $(".buttons button");
let secondPlayer;

// contador de jogadas
let p1 = 0;
let p2 = 0;


for (let i = 0; i < blck.length; i++) {

    $(blck.eq(i)).click(function () {

        let check = checkPlayer(p1, p2);

        if ($(this).children().length == 0) {

            let checkClone = check.clone();

            $(this).append(checkClone);

            if (p1 == p2) {
                p1++;
                if(secondPlayer == "ai-btn") {

                    setTimeout(function () {
                        AIplay();
                        winCheck();
                    }, 400);
                    
                    p2++;
                }
            } else {
                p2++;
            }

            winCheck();

        }
    })
}

for (let i = 0; i < buttons.length; i++) {
    
    $(buttons[i]).click(function(){
        secondPlayer = $(this).attr("class");
        $(".game-container").removeClass("hide");
    })
}

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
