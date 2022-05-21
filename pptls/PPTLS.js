let jogou = 0;
let qtddJogadas = 3 ;
let rodadaAtual = 0 ;

const matriz = [['e','g','p','g','p'],['p','e','g','p','g'],['g','p','e','g','p'],['p','g','p','e','g'],['g','p','g','p','e']] ;

function quemGanhou (){
  const jog = document.querySelector(`.jogador:not(.apagado)`).getAttribute("data-n");
  const pc = document.querySelector(`.computador:not(.apagado)`).getAttribute("data-n");
 
  console.info (jog + "x" + pc ); // pode apagar
  resultado = matriz[pc][jog];    // pode apagar
  console.info (resultado);       // pode apagar

  if (resultado == 'e'){
    document.querySelector(`.empate`).classList.remove('some');

    const divEmpate = document.querySelector('.e');
    const divBranco = document.createElement('div');
    divBranco.classList.add('branco');
    divBranco.classList.add('bola');
    divEmpate.appendChild(divBranco);

  } else if (resultado == 'p'){
    document.querySelector(`.perdeu`).classList.remove('some');

    const divPerdeu = document.querySelector('.p');
    const divAzul = document.createElement('div');
    divAzul.classList.add('azul');
    divAzul.classList.add('bola');
    divPerdeu.appendChild(divAzul);

  } else if (resultado == 'g'){
    document.querySelector(`.ganhou`).classList.remove('some');

    const divGanhou = document.querySelector('.g');
    const divVerm = document.createElement('div');
    divVerm.classList.add('vermelho');
    divVerm.classList.add('bola');
    divGanhou.appendChild(divVerm);
  }
  
  
 
  textoDaBatalha();
  setTimeout(proxJogada, 2000);
  rodadaAtual++ ;
  setTimeout(naMelhorDe, 1000);
  
}

function jogadaPC (){
  let jogada = Math.floor(Math.random() * 5);
  const sorteado = document.querySelector(`.computador[data-n="${jogada}"]`);
  sorteado.classList.remove('apagado');
  quemGanhou();
}

function jogadaJogador(event){

  let escolhido = event.target;
  if (jogou == 0){
    escolhido.classList.remove('apagado');
    jogou++ ;
    console.info(jogou + 'é um?');
    console.info(rodadaAtual + 'de' + qtddJogadas );
    jogadaPC();
  }
}

function proxJogada(){
  document.querySelector('.jogador:not(.apagado)').classList.add('apagado');
  document.querySelector('.computador:not(.apagado)').classList.add('apagado');
  jogou = 0;
  console.info(jogou + 'é zer0?');                            // pode apagar           
  document.querySelector(`.perdeu`).classList.add('some');
  document.querySelector(`.ganhou`).classList.add('some');
  document.querySelector(`.empate`).classList.add('some');
  document.querySelector('.textoBatalha').classList.add('some');
}

function enterNoInput(event){
  if ( event.key == 'Enter') {
    document.querySelector('.doInput').blur() ;
    qtddJogadas = event.target.value ;
    rodadaAtual = 0;
  }
}
document.querySelector('.doInput').addEventListener('keydown', enterNoInput);

const clicado = document.querySelectorAll('.jogador');
for (i = 0 ; i <clicado.length ; i++){
   clicado[i].addEventListener('click', jogadaJogador);
}

// const inputQtddJogadas = document.querySelector('.doInput');
//let qtddJogadas = inputQtddJogadas.value;

function naMelhorDe (){
  if (rodadaAtual == qtddJogadas){
    const verms = document.querySelectorAll('.vermelho')
    const contadorVerm = verms.length ;
    const azuls =  document.querySelectorAll('.azul')
    const contadorAzul = azuls.length ;
    const bcos =  document.querySelectorAll('.branco')
    const contadorBcos = bcos.length ;

    document.querySelector('.vitoriaderrota').classList.remove('some');

    if (contadorVerm>contadorAzul){
      document.querySelector('.textoresult').innerText = "GANHOU" ;
    } else if (contadorVerm<contadorAzul){
      document.querySelector('.textoresult').innerText = "PERDEU" ;
    } else if (contadorVerm==contadorAzul){
      document.querySelector('.textoresult').innerText = "EMPATOU" ;
    }
    document.querySelector('.qtddMelhorDe').innerText = qtddJogadas ;
    setTimeout(resetaTabuleiro, 2000);
  }
}

function resetaTabuleiro(){

  const verms = document.querySelectorAll('.vermelho')
  const contadorVerm = verms.length ;
  const azuls =  document.querySelectorAll('.azul')
  const contadorAzul = azuls.length ;
  const bcos =  document.querySelectorAll('.branco')
  const contadorBcos = bcos.length ;

  for (i = 0 ; i < contadorVerm ; i++){
    verms[i].remove();
  }
  for (i = 0 ; i < contadorAzul ; i++){
    azuls[i].remove();
  }
  for (i = 0 ; i < contadorBcos ; i++){
    bcos[i].remove();
  }
  rodadaAtual = 0 ;
  document.querySelector('.vitoriaderrota').classList.add('some');
}

function textoDaBatalha(){
  const escolhaJog = document.querySelector(`.jogador:not(.apagado)`).getAttribute("data-n");
  const escolhaPc = document.querySelector(`.computador:not(.apagado)`).getAttribute("data-n");
  const itemJog = document.querySelector('.jogJogador');
  const action = document.querySelector('.oqAcontece');
  const itemPc = document.querySelector('.jogPC');
  
  if (escolhaJog == 0){
    itemJog.innerText = "PEDRA";
    if (escolhaPc == 0){
      action.innerText = "=";
      itemPc.innerText = "PEDRA";
    } else if (escolhaPc == 1){
      action.innerText = "é coberta pelo";
      itemPc.innerText = "PAPEL";
    } else if (escolhaPc == 2){
      action.innerText = "destrói a";
      itemPc.innerText = "TESOURA";
    } else if (escolhaPc == 3){
      action.innerText = "é vaporizada pelo";
      itemPc.innerText = "SPOCK";
    } else if (escolhaPc == 4){
      action.innerText = "esmaga o";
      itemPc.innerText = "LAGARTO";
    } 
  } else if (escolhaJog == 1){
    itemJog.innerText = "PAPEL";
    if (escolhaPc == 0){
      action.innerText = "cobre a";
      itemPc.innerText = "PEDRA";
    } else if (escolhaPc == 1){
      action.innerText = "=";
      itemPc.innerText = "PAPEL";
    } else if (escolhaPc == 2){
      action.innerText = "é cortado pela";
      itemPc.innerText = "TESOURA";
    } else if (escolhaPc == 3){
      action.innerText = "desaprova o";
      itemPc.innerText = "SPOCK";
    } else if (escolhaPc == 4){
      action.innerText = "é comido pelo";
      itemPc.innerText = "LAGARTO" ;
    }  
  } else if (escolhaJog == 2){
    itemJog.innerText = "TESOURA";
    if (escolhaPc == 0){
      action.innerText = "é destruida pela";
      itemPc.innerText = "PEDRA";
    } else if (escolhaPc == 1){
      action.innerText = "corta o";
      itemPc.innerText = "PAPEL";
    } else if (escolhaPc == 2){
      action.innerText = "=";
      itemPc.innerText = "TESOURA";
    } else if (escolhaPc == 3){
      action.innerText = "é quebrada pelo";
      itemPc.innerText = "SPOCK";
    } else if (escolhaPc == 4){
      action.innerText = "decapita o";
      itemPc.innerText = "LAGARTO";      
    }  
  } else if (escolhaJog == 3){
    itemJog.innerText = "SPOCK";
    if (escolhaPc == 0){
      action.innerText = "vaporiza a";
      itemPc.innerText = "PEDRA";
    } else if (escolhaPc == 1){
      action.innerText = "é desaprovado pelo";
      itemPc.innerText = "PAPEL";
    } else if (escolhaPc == 2){
      action.innerText = "quebra a";
      itemPc.innerText = "TESOURA";
    } else if (escolhaPc == 3){
      action.innerText = "=";
      itemPc.innerText = "SPOCK";
    } else if (escolhaPc == 4){
      action.innerText = "é envenenado pelo";
      itemPc.innerText = "LAGARTO";
    }  
  } else if (escolhaJog == 4){
    itemJog.innerText = "LAGARTO";
    if (escolhaPc == 0){
      action.innerText = "é esmagado pela";
      itemPc.innerText = "PEDRA";
    } else if (escolhaPc == 1){
      action.innerText = "come o";
      itemPc.innerText = "PAPEL";
    } else if (escolhaPc == 2){
      action.innerText = "é decapitado pela";
      itemPc.innerText = "TESOURA";
    } else if (escolhaPc == 3){
      action.innerText = "envenena o";
      itemPc.innerText = "SPOCK";
    } else if (escolhaPc == 4){
      action.innerText = "=";
      itemPc.innerText = "LAGARTO";    
    }  
  }
  document.querySelector('.textoBatalha').classList.remove('some');
}  