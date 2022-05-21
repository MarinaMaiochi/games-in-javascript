const data = [
    { capa: 'a1.jpg', ator: 'a2.jpg', id:'1'}, { capa: 'b1.jpg', ator: 'b2.jpg', id:'11'},
    { capa: 'c1.jpg', ator: 'c2.jpg', id:'2'}, { capa: 'd1.jpg', ator: 'd2.jpg', id:'12'},
    { capa: 'e1.jpg', ator: 'e2.jpg', id:'3'}, { capa: 'f1.jpg', ator: 'f2.jpg', id:'13'},
    { capa: 'g1.jpg', ator: 'g2.jpg', id:'4'}, { capa: 'h1.jpg', ator: 'h2.jpg', id:'14'},
    { capa: 'i1.jpg', ator: 'i2.jpg', id:'5'}, { capa: 'j1.jpg', ator: 'j2.jpg', id:'15'},
    { capa: 'k1.jpg', ator: 'k2.jpg', id:'6'}, { capa: 'l1.jpg', ator: 'l2.jpg', id:'16'},
    { capa: 'm1.jpg', ator: 'm2.jpg', id:'7'}, { capa: 'n1.jpg', ator: 'n2.jpg', id:'17'},
    { capa: 'o1.jpg', ator: 'o2.jpg', id:'8'}, { capa: 'p1.jpg', ator: 'p2.jpg', id:'18'},
    { capa: 'q1.jpg', ator: 'q2.jpg', id:'9'}, { capa: 'r1.jpg', ator: 'r2.jpg', id:'19'},
    { capa: 's1.jpg', ator: 's2.jpg', id:'10'}, { capa: 't1.jpg', ator: 't2.jpg', id:'20'},
]
let segundos = 0;
let refContagem;
let clickHabilitado = false;

document.querySelector('.info').addEventListener('click', Info);
function Info(event){
    const infoBut = document.querySelector(".mostraInfos");
    if(infoBut.classList.contains('some')){
        infoBut.classList.remove('some');
    } else {
        infoBut.classList.add('some');
    }
}
function setUp() {
    document.querySelector('.play').addEventListener('click', mostraCartas);
    let escolhidos = [...data];
    for (let i = 0; i < 10; i++) {
        
        let x = Math.floor(Math.random() * escolhidos.length);
        escolhidos.splice(x, 1);
    }
    montaTabuleiro(escolhidos);
}
function criaCarta(caminhoImagem, dataId) {
    let carta1 = document.createElement('img');
    carta1.src=caminhoImagem;
    carta1.classList.add('carta');

    let box = document.createElement('div');
    box.classList.add('flip-box');
    box.setAttribute('data-id', dataId)
    let boxInner = document.createElement('div');
    boxInner.classList.add('flip-box-inner');
    let boxFront = document.createElement('div');
    boxFront.classList.add('flip-box-front');
    let boxBack = document.createElement('div');
    boxBack.classList.add('flip-box-back');

    boxInner.appendChild(boxFront);
    boxBack.appendChild(carta1);
    boxInner.appendChild(boxBack);
    box.appendChild(boxInner);
    return box;
}
function montaTabuleiro(escolhidos){
    const cartas = [];
    for (let i = 0; i < escolhidos.length; i++) {
        let carta1 = criaCarta(escolhidos[i].capa, escolhidos[i].id) ;
        let carta2 = criaCarta(escolhidos[i].ator, escolhidos[i].id) ;

        cartas.push(carta1,carta2);
    }
    shuffle(cartas);
    
    let x=0;
    for (let i = 0; i < 5; i++) {
        let divLinha = document.createElement('div');
        divLinha.classList.add('linha');

        for (let j = 0; j < 4; j++) {
            divLinha.appendChild(cartas[x]);
            x++;
        } 
        document.querySelector('.tabuleiro').appendChild(divLinha);
    }
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
document.querySelector('.play').addEventListener('click', mostraCartas);

function mostraCartas(){
    document.querySelector('.play').removeEventListener('click', mostraCartas);
    const clicaveis = document.querySelectorAll('.flip-box');
    for (let i = 0; i < clicaveis.length; i++) {
        clicaveis[i].classList.add('virado');
    }
    setTimeout(escondeCartas, 3000);
}
function escondeCartas(){
    const clicaveis = document.querySelectorAll('.virado');
    for (let i = 0; i < clicaveis.length; i++) {
        clicaveis[i].classList.remove('virado');
    }
    habilitaCartas();
}
function habilitaCartas(){
    const cartas = document.querySelectorAll('.flip-box');
    for (let i = 0; i < cartas.length; i++) {
        cartas[i].addEventListener('click',viraCarta);
    }
    clickHabilitado = true ;
}

function viraCarta(event){
    if(!clickHabilitado){
        return
    }
    const clicado = event.currentTarget; 
    clicado.classList.add('virado');
    const cartasViradas = document.querySelectorAll('.virado:not(.certo)');
    if (cartasViradas.length == 1){
        return
    } else if (cartasViradas.length == 2){
        clickHabilitado = false;
        setTimeout(function() {
            checaPar(cartasViradas)
        }, 1000);
    }
}
function checaPar(cartas){
    const idCarta1 = cartas[0].getAttribute('data-id');
    const idCarta2 = cartas[1].getAttribute('data-id');
    if(idCarta1 == idCarta2 ){
        cartas[0].classList.add('certo');
        cartas[1].classList.add('certo');
    } else {
        cartas[0].classList.remove('virado');
        cartas[1].classList.remove('virado');
    }
    clickHabilitado = true ;
    if ( document.querySelectorAll('.certo').length == document.querySelectorAll('.carta').length  ){
        clearInterval(refContagem);
    }
}

// __________________________________________________  TIMER  ___________

function zeraTimer(){
    segundos = 0;
    atualizaTimer();
}
const playBut = document.querySelector('.play');
function atualizaTimer(){
    const minutos = (Math.floor(segundos/60)+ '').padStart(2,0);
    const restoSegundos = ((segundos%60) + '').padStart(2,0);
    document.querySelector('.timer > p').innerText = minutos + ':' + restoSegundos;
}
function addSegundos(){
    segundos++;
    atualizaTimer();
}
function playTimer() {
   refContagem = setInterval(addSegundos,1000);
   document.querySelector('.play').setAttribute("disabled", true);
}
function novoJogo() {
    clearInterval(refContagem);
    zeraTimer();
    document.querySelector('.play').removeAttribute("disabled");
    document.querySelector('.tabuleiro').innerHTML = '';
    setUp();
}
playBut.addEventListener('click', playTimer);
const novoBut = document.querySelector('.novo');
novoBut.addEventListener('click', novoJogo);
setUp();