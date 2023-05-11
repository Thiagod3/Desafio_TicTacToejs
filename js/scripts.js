let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let container = document.querySelector("#container");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = messageContainer.querySelector("p");
let secondPlayer;

//contador de jogadas

let player1 = 0;
let player2 = 0;

//escolha IA ou 2 players
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function(){

        secondPlayer = this.getAttribute("id");

        for(let j = 0; j < buttons.length; j++){
            buttons[j].style.display = "none";
        }

        setTimeout(function(){
            container.classList.remove("hide");
        },500)
    });
}

//adicionando evento de clique aos boxes
for(let i = 0; i < boxes.length; i++){

    //ao clicar na caixa
    boxes[i].addEventListener("click", function() { 

        let el = checkEl(player1,player2);

        //verifica se ja tem simbolo
        if(this.childNodes.length == 0){

            let cloneEl = el.cloneNode(true);

        this.appendChild(cloneEl);

            //computar jogada
            if(player1 == player2){
                player1++;

                if(secondPlayer == 'contraIa'){
                    computerPlay();
                    player2++;
            }
            }else{
                player2++;
            }
        }

        //checa quem venceu
        checkWinner();
    });
}

function checkEl(player1, player2){
    if(player1 == player2){
        //x
        el = x;
    }else{
        //o
        el = o;
    }

    return el;

}

function checkWinner(el){

    let b1 = document.querySelector("#block-1");
    let b2 = document.querySelector("#block-2");
    let b3 = document.querySelector("#block-3");
    let b4 = document.querySelector("#block-4");
    let b5 = document.querySelector("#block-5");
    let b6 = document.querySelector("#block-6");
    let b7 = document.querySelector("#block-7");
    let b8 = document.querySelector("#block-8");
    let b9 = document.querySelector("#block-9");
    let winner;

    //horizontal
    if(b1.childNodes.length > 0 && b2.childNodes.length && b3.childNodes.length){
        let b1Child = b1.childNodes[0].className;
        let b2Child = b2.childNodes[0].className;
        let b3Child = b3.childNodes[0].className;


        if(b1Child == b2Child && b1Child == b3Child){
            declareWinner(b1Child);
        }

    }

    if(b4.childNodes.length > 0 && b5.childNodes.length && b6.childNodes.length){
        let b4Child = b4.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b6Child = b6.childNodes[0].className;


        if(b4Child == b5Child && b4Child == b6Child){
            declareWinner(b4Child);
        }

    }

    if(b7.childNodes.length > 0 && b8.childNodes.length && b9.childNodes.length){
        let b7Child = b7.childNodes[0].className;
        let b8Child = b8.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;


        if(b7Child == b8Child && b7Child == b9Child){
            declareWinner(b7Child);
        }

    }

    //vertical
    if(b1.childNodes.length > 0 && b4.childNodes.length && b7.childNodes.length){
        let b1Child = b1.childNodes[0].className;
        let b4Child = b4.childNodes[0].className;
        let b7Child = b7.childNodes[0].className;


        if(b1Child == b4Child && b1Child == b7Child){
            declareWinner(b1Child);
        }

    }

    if(b2.childNodes.length > 0 && b5.childNodes.length && b8.childNodes.length){
        let b2Child = b2.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b8Child = b8.childNodes[0].className;


        if(b2Child == b5Child && b2Child == b8Child){
            declareWinner(b2Child);
        }

    }

    if(b3.childNodes.length > 0 && b6.childNodes.length && b9.childNodes.length){
        let b3Child = b3.childNodes[0].className;
        let b6Child = b6.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;


        if(b3Child == b6Child && b3Child == b9Child){
            declareWinner(b3Child);
        }

    }

    //diagonal
    if(b1.childNodes.length > 0 && b5.childNodes.length && b9.childNodes.length){
        let b1Child = b1.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b9Child = b9.childNodes[0].className;


        if(b1Child == b5Child && b1Child == b9Child){
            declareWinner(b1Child);
        }

    }

    if(b3.childNodes.length > 0 && b5.childNodes.length && b7.childNodes.length){
        let b3Child = b3.childNodes[0].className;
        let b5Child = b5.childNodes[0].className;
        let b7Child = b7.childNodes[0].className;


        if(b3Child == b5Child && b3Child == b7Child){
            declareWinner(b3Child);
        }

    }

    //velha
    let count = 0;
    for(let i = 0; i < boxes.length; i++){
        if(boxes[i].childNodes[0] != undefined){
            count++;
        }

        if(count == 9){
            declareWinner("velha");
        }
    }

    return winner;

}


//limpa o jogo, declara o vencedor e atualiza o placar

function declareWinner(winner){

    let scoreboardX = document.querySelector("#scoreboard-1");
    let scoreboardY = document.querySelector("#scoreboard-2");

    //Declara o vencedor e atualiza o placar
    if(winner == 'x'){
        scoreboardX.textContent = parseInt(scoreboardX.textContent) +1;
        messageText.textContent = `Jogador 1 Venceu!`;
        messageContainer.classList.remove("hide");
    }else if(winner == 'o'){
        scoreboardY.textContent = parseInt(scoreboardY.textContent) +1;
        messageText.textContent = `Jogador 2 Venceu!`
        messageContainer.classList.remove("hide");
    }else{        
        messageText.textContent = `DEU VELHA!`
        messageContainer.classList.remove("hide");
    }

    //esconde a mensagem
    setTimeout(function(){
        messageContainer.classList.add("hide");
    },2500);

    //reseta o tabuleiro
    let boxesToRemove = document.querySelectorAll(".box div");

    for(let i = 0; i < boxesToRemove.length; i++){
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }
}

//jogada do computador
function computerPlay(){
    let cloneO = o.cloneNode(true);
  counter = 0;
  filled = 0;
          
  for(let i = 0; i < boxes.length; i++) {

    let randomNumber = Math.floor(Math.random() * 5);

    // só se não tiver marcado anteriormente
    if(boxes[i].childNodes[0] == undefined) {  
      if(randomNumber <= 1) {
        boxes[i].appendChild(cloneO);
        counter++;
        break;
      }
    // checar quantas estão preenchidas        
    } else {
      filled++;
    }

  }

  if(counter == 0 && filled < 9) {
    computerPlay();
  }
}