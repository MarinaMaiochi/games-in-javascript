let estadoJogo = 'INICIO';
let resultado = '';
let jogJogou = 0 ;
let pcJogou = 0 ;
let dificuldade = 'FACIL' ;
let quemComeca = '';

celulas = document.querySelectorAll('.celula');
for (let i = 0; i < celulas.length; i++) {               
    celulas[i].addEventListener('click', jogadaJogador);
}

const casa0 = document.querySelector('[data-casa="0"]');
const casa1 = document.querySelector('[data-casa="1"]');
const casa2 = document.querySelector('[data-casa="2"]');
const casa3 = document.querySelector('[data-casa="3"]');
const casa4 = document.querySelector('[data-casa="4"]');
const casa5 = document.querySelector('[data-casa="5"]');
const casa6 = document.querySelector('[data-casa="6"]');
const casa7 = document.querySelector('[data-casa="7"]');
const casa8 = document.querySelector('[data-casa="8"]');


function addNivelEInicio(){
    const facil = document.querySelector('.butFacil');
    facil.addEventListener('click', escolheNivel);
    const medio = document.querySelector('.butMedio');
    medio.addEventListener('click', escolheNivel);
    const dificil = document.querySelector('.butDificil');
    dificil.addEventListener('click', escolheNivel);
    
    const simBut = document.querySelector('.butSim');
    simBut.addEventListener('click', jogadorInicia);
    const naoBut = document.querySelector('.butNao');
    naoBut.addEventListener('click', computadorInicia);
}
addNivelEInicio();

function escolheNivel(event){
    const escolha = event.target;
    if (escolha.classList.contains('butFacil')) {
        dificuldade = 'FACIL' ;
        document.querySelector('.butFacil').classList.remove('butEscuro');
        document.querySelector('.butMedio').classList.add('butEscuro');
        document.querySelector('.butDificil').classList.add('butEscuro');
    } else if (escolha.classList.contains('butMedio')) {
        dificuldade = 'MEDIO' ;
        document.querySelector('.butMedio').classList.remove('butEscuro');
        document.querySelector('.butFacil').classList.add('butEscuro');
        document.querySelector('.butDificil').classList.add('butEscuro');
    } else if (escolha.classList.contains('butDificil')) {
        dificuldade = 'DIFICIL' ;
        document.querySelector('.butDificil').classList.remove('butEscuro');
        document.querySelector('.butFacil').classList.add('butEscuro');
        document.querySelector('.butMedio').classList.add('butEscuro');
    } 
    const facil = document.querySelector('.butFacil');
    facil.removeEventListener('click', escolheNivel);
    const medio = document.querySelector('.butMedio');
    medio.removeEventListener('click', escolheNivel);
    const dificil = document.querySelector('.butDificil');
    dificil.removeEventListener('click', escolheNivel);    
}

const resetBut = document.querySelector('.reset');
resetBut.addEventListener('click', reset);

function jogadorInicia() {
    estadoJogo = 'JOGADOR'
    quemComeca = 'jog';
    document.querySelector('.butNao').classList.add('butEscuro');
    
    const simBut = document.querySelector('.butSim');
    simBut.removeEventListener('click', jogadorInicia);
    const naoBut = document.querySelector('.butNao');
    naoBut.removeEventListener('click', computadorInicia);
}
function computadorInicia() {
    estadoJogo = 'COMPUTADOR';
    quemComeca = 'pc';
    document.querySelector('.butSim').classList.add('butEscuro');

    const simBut = document.querySelector('.butSim');
    simBut.removeEventListener('click', jogadorInicia);
    const naoBut = document.querySelector('.butNao');
    naoBut.removeEventListener('click', computadorInicia);

    jogadaComputador();
}
function jogadaJogador(event){
    if (estadoJogo !== 'JOGADOR') {
        return;
    }
    const espacoClicado = event.target;
    if (espacoClicado.classList.contains('vazio')) {
        espacoClicado.innerText = 'X' ;
        espacoClicado.classList.add('X');
        espacoClicado.classList.remove('vazio');

        jogJogou++ ;
        console.info( jogJogou);
        checaProximoPasso();
    }
}
function jogadaComputador(){
    if(dificuldade == 'FACIL'){
        jogadaComputadorFacil();
    } else if(dificuldade == 'MEDIO'){
        jogadaComputadorMedio();
    } else {
        jogadaComputadorDificil();
    }
}
function jogadaComputadorFacil(){
    const vazios = document.querySelectorAll('.vazio');
    const aleatorio = Math.floor(Math.random() * vazios.length);
    jogaNaCasa(vazios[aleatorio] , 'O');
    checaProximoPasso();
}

function jogadaComputadorMedio(){
    if (somaTrio(casa0,casa1,casa2) == -2 ){
        jogaNoTrio(casa0,casa1,casa2);
    } else if (somaTrio(casa3,casa4,casa5) == -2 ){
        jogaNoTrio(casa3,casa4,casa5);
    } else if (somaTrio(casa6,casa7,casa8) == -2 ){
        jogaNoTrio(casa6,casa7,casa8);
    } else if (somaTrio(casa0,casa3,casa6) == -2 ){
        jogaNoTrio(casa0,casa3,casa6);
    } else if (somaTrio(casa1,casa4,casa7) == -2 ){
        jogaNoTrio(casa1,casa4,casa7);
    } else if (somaTrio(casa2,casa5,casa8) == -2 ){
        jogaNoTrio(casa2,casa5,casa8);
    } else  if (somaTrio(casa0,casa4,casa8) == -2 ){
        jogaNoTrio(casa0,casa4,casa8);
    } else if (somaTrio(casa2,casa4,casa6) == -2 ){
        jogaNoTrio(casa2,casa4,casa6);
    } else {
        const vazios = document.querySelectorAll('.vazio');
        console.info(vazios); 
        const aleatorio = Math.floor(Math.random() * vazios.length);
        jogaNaCasa(vazios[aleatorio] , 'O');
    }
    pcJogou++ ;
    console.info( 'jogada pc medio' + pcJogou);
    checaProximoPasso();
}
function jogadaComputadorDificil(){
    
    if (veSeOGanhou() == false){
        if (quemComeca == 'pc'){
            const aleatorio = Math.floor(Math.random() * 4);
    
            if(jogJogou == 0 && pcJogou == 0){
                const conjDeCasas = [casa0 , casa2 , casa6 , casa8];
                jogaNaCasa(conjDeCasas[aleatorio] , 'O');
    
            } else if (jogJogou == 1 && pcJogou == 1){
                if( (casa2.innerText == 'O' || casa6.innerText == 'O' )&& ( casa5.innerText == 'X' || casa8.innerText == 'X' || casa7.innerText == 'X' )){
                    jogaNaCasa(casa0 , 'O');
                } else if( (casa2.innerText == 'O'|| casa6.innerText == 'O' ) && ( casa1.innerText == 'X' || casa0.innerText == 'X' || casa3.innerText == 'X' )){
                    jogaNaCasa(casa8 , 'O');
                }else if( (casa0.innerText == 'O'|| casa8.innerText == 'O' ) && ( casa1.innerText == 'X' || casa2.innerText == 'X' || casa5.innerText == 'X' )){
                    jogaNaCasa(casa6 , 'O');
                }else if( (casa0.innerText == 'O'|| casa8.innerText == 'O' ) && ( casa3.innerText == 'X' || casa6.innerText == 'X' || casa7.innerText == 'X' )){
                    jogaNaCasa(casa2 , 'O');
                }else { 
                    let conjDeCasas;
                    const aleatorio = Math.floor(Math.random() * 2);
                
                    if (casa0.innerText == 'O' && casa8.innerText == 'X' ){
                        conjDeCasas = [casa2 , casa6];                  
                    } else if (casa8.innerText == 'O' && casa0.innerText == 'X' ){
                        conjDeCasas = [casa2 , casa6];                  
                    } else if (casa2.innerText == 'O' && casa6.innerText == 'X' ){
                        conjDeCasas = [casa0 , casa8];             
                    } else if (casa6.innerText == 'O' && casa2.innerText == 'X' ){
                        conjDeCasas = [casa0 , casa8];              
                    } else {
                        if( casa2.innerText == 'O'|| casa6.innerText == 'O'){
                            conjDeCasas = [casa0 , casa8];                     
                        }else if( casa0.innerText == 'O'|| casa8.innerText == 'O'){
                            conjDeCasas = [casa2 , casa6];                       
                        }
                    }
                    jogaNaCasa(conjDeCasas[aleatorio] , 'O');
                }
            } else if (jogJogou == 2 && pcJogou == 2){
                if (casa4.innerText == ''){
                    jogaNaCasa(casa4 , 'O');
                } else { 
                    console.info('entrou aqui 2 2'); 
                    jogadaComputadorMedio()
                    return
                }
            } else  { 
                console.info('entrou no medio'); 
                jogadaComputadorMedio();
                return
            }
        } else {
            if(jogJogou == 1 && pcJogou == 0){
                if(casa4.innerText == ''){
                    jogaNaCasa(casa4 , 'O'); 
                } else {
                    const conjDeCasas = [casa0 , casa2 , casa6 , casa8];
                    const aleatorio = Math.floor(Math.random() * conjDeCasas.length);
                    jogaNaCasa(conjDeCasas[aleatorio] , 'O'); 
                }
        
            } else {
                console.info('entrou aqui 2 2'); 
                jogadaComputadorMedio()
                return
            }
        }    
    }

    pcJogou++ ;
    console.info( 'jogada pc dificil' + pcJogou);
    checaProximoPasso();
}
function somaTrio(casa1,casa2,casa3){
    return daValor(casa1) + daValor(casa2) + daValor(casa3) ;
}
function daValor (casa1){
    if (casa1.innerText == ''){
        return 0 ;
    } else if (casa1.innerText == 'X'){
        return -1 ;
    } else if (casa1.innerText == 'O'){
        return 1 ;
    } 
}
function veSeOGanhou (){
    if (somaTrio(casa0,casa1,casa2) == 2 ){
        jogaNoTrio(casa0,casa1,casa2);
    } else if (somaTrio(casa3,casa4,casa5) == 2 ){
        jogaNoTrio(casa3,casa4,casa5);
    } else if (somaTrio(casa6,casa7,casa8) == 2 ){
        jogaNoTrio(casa6,casa7,casa8);
    } else if (somaTrio(casa0,casa3,casa6) == 2 ){
        jogaNoTrio(casa0,casa3,casa6);
    } else if (somaTrio(casa1,casa4,casa7) == 2 ){
        jogaNoTrio(casa1,casa4,casa7);
    } else if (somaTrio(casa2,casa5,casa8) == 2 ){
        jogaNoTrio(casa2,casa5,casa8);
    } else  if (somaTrio(casa0,casa4,casa8) == 2 ){
        jogaNoTrio(casa0,casa4,casa8);
    } else if (somaTrio(casa2,casa4,casa6) == 2 ){
        jogaNoTrio(casa2,casa4,casa6);
    } else {return false; }
    return true;
}
function jogaNoTrio (casa1,casa2,casa3){
    if(casa1.classList.contains('vazio')){
        jogaNaCasa(casa1 , 'O');
    } else if(casa2.classList.contains('vazio')){
        jogaNaCasa(casa2 , 'O');
    } else if(casa3.classList.contains('vazio')){
        jogaNaCasa(casa3 , 'O');
    } 
    
}
function jogaNaCasa(casa, jogada) {
    casa.innerText = jogada;
    casa.classList.add(jogada); 
    casa.classList.remove('vazio');
}
function checaProximoPasso() {
  
    if (verificaIguais(casa0, casa1, casa2)) {  marcaResultado(casa0);  } else
    if (verificaIguais(casa3, casa4, casa5)) {  marcaResultado(casa3);  } else
    if (verificaIguais(casa6, casa7, casa8)) {  marcaResultado(casa6);  } else

    if (verificaIguais(casa0, casa3, casa6)) {  marcaResultado(casa0);  } else
    if (verificaIguais(casa1, casa4, casa7)) {  marcaResultado(casa1);  } else
    if (verificaIguais(casa2, casa5, casa8)) {  marcaResultado(casa2);  } else
   
    if (verificaIguais(casa0, casa4, casa8)) {  marcaResultado(casa0);  } else
    if (verificaIguais(casa2, casa4, casa6)) {  marcaResultado(casa2);  }
    else { resultado = 'VELHA'; }
    
    const vazios = document.querySelectorAll('.vazio');
    if (estadoJogo != 'FINAL' && vazios.length == 0){
        console.info( 'oentrou aqui');
        estadoJogo = 'FINAL';
        resultado = 'VELHA';
    }
    if (estadoJogo == 'COMPUTADOR') {
        estadoJogo = 'JOGADOR';
    } else  if (estadoJogo == 'JOGADOR') {
        estadoJogo = 'COMPUTADOR';
        jogadaComputador();
    } else  if (estadoJogo == 'FINAL') {
        document.querySelector('.resultado').innerText = resultado ;
        document.querySelector('.textoResultado').classList.remove('some');
    }
}
function verificaIguais(casa1, casa2, casa3) {
    return casa1.innerText == casa2.innerText && casa2.innerText == casa3.innerText && casa1.innerText !='';
}
function marcaResultado(casa1) {
    if (casa1.innerText == 'X'){
        resultado = 'Você Ganhou.';
        estadoJogo = 'FINAL'
    }
    if (casa1.innerText == 'O'){
        resultado = 'Você Perdeu.';
        estadoJogo = 'FINAL'
    }
}
function reset(){
    const casas = document.querySelectorAll('[data-casa]');
    for (let i = 0; i < casas.length; i++) {
        casas[i].innerText = '';
        casas[i].classList.add('vazio');
        casas[i].classList.remove('X');
        casas[i].classList.remove('O');
    }
    estadoJogo = 'INICIO';
    resultado = '';
    jogJogou = 0 ;
    pcJogou = 0 ;
    quemComeca = '';
    
    document.querySelector('.textoResultado').classList.add('some');
    document.querySelector('.butSim').classList.remove('butEscuro');
    document.querySelector('.butNao').classList.remove('butEscuro');
    if (dificuldade != 'FACIL'){
        document.querySelector('.butFacil').classList.add('butEscuro');
    }
    if (dificuldade != 'MEDIO'){
        document.querySelector('.butMedio').classList.add('butEscuro');
    }
    if (dificuldade != 'DIFICIL'){
        document.querySelector('.butDificil').classList.add('butEscuro');
    }
    
    addNivelEInicio();
}
