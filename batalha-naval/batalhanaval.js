const estados = {
    INICIO:'inicio',
    JOGADOR:'jogador',
    PC: 'pc',
    FINAL: 'final'
}
let estadoJogo = estados.INICIO;
let sentido = 'HORI';
let navio;
let qtd1 = 4;
let qtd2 = 3;
let qtd3 = 2;
let qtd4 = 1;
let nDoNavio = 0;
let nDaJogada = 0 ;
let acertoJog = 0 ;
let acertoPc = 0 ;
let navioJog = 0; 
let jogadasPc = [];

document.querySelector('.info').addEventListener('click', info);
document.querySelector('.limpa').addEventListener('click', limpar);
document.querySelector('.comeca').addEventListener('click', comecar);
document.querySelector('.sentido').addEventListener('click', seta);
document.querySelector('.geradoraleatorio').addEventListener('click', navAleatJog);

function info(){
    const infoBut = document.querySelector(".mostraInfos");
    if(infoBut.classList.contains('some')){
        infoBut.classList.remove('some');
    } else {
        infoBut.classList.add('some');
    }
}
function limpar(){
    const naviosColocados = document.querySelectorAll('.tabuleiroJog .navio'); 
    for (let i = 0; i < naviosColocados.length; i++) {
        naviosColocados[i].classList.remove('navio' , 'navio1' , 'vertical','navioPonta' , 'traz', 'navioMeio'); 
    }
    qtd1 = 4; document.querySelector('.qtdTam1').innerText = qtd1 ;
    qtd2 = 3; document.querySelector('.qtdTam2').innerText = qtd2 ;
    qtd3 = 2; document.querySelector('.qtdTam3').innerText = qtd3 ;
    qtd4 = 1; document.querySelector('.qtdTam4').innerText = qtd4 ;
}
function comecar(){
    if (qtd1 == 0 && qtd2 == 0 && qtd3 == 0 && qtd4 == 0){
        jogadasPc = [];
        deixaEscuro();
        trocaEstado(estados.JOGADOR); 
    }
}
function deixaEscuro(){
    document.querySelector(".sentido").classList.add('escuro');
    document.querySelector(".limpa").classList.add('escuro');
    document.querySelector(".qtdTam1").classList.add('escuro');
    document.querySelector(".qtdTam2").classList.add('escuro');
    document.querySelector(".qtdTam3").classList.add('escuro');
    document.querySelector(".qtdTam4").classList.add('escuro');
    document.querySelector(".nav1").classList.add('escuro');
    document.querySelector(".nav2").classList.add('escuro');
    document.querySelector(".nav3").classList.add('escuro');
    document.querySelector(".nav4").classList.add('escuro');
    document.querySelector(".nav1").classList.remove('highlight');
    document.querySelector(".nav2").classList.remove('highlight');
    document.querySelector(".nav3").classList.remove('highlight');
    document.querySelector(".nav4").classList.remove('highlight');
}
function seta(event){
    if(event.target.classList.contains('vert')){
        event.target.classList.remove('vert');
        sentido = 'HORI';
    } else {
        event.target.classList.add('vert');
        sentido = 'VERT';
    }
}

function navAleatJog(){
    limpar();
    colocaNavioAleatorio('.tabuleiroJog');
    qtd1 = 0; document.querySelector('.qtdTam1').innerText = qtd1 ;
    qtd2 = 0; document.querySelector('.qtdTam2').innerText = qtd2 ;
    qtd3 = 0; document.querySelector('.qtdTam3').innerText = qtd3 ;
    qtd4 = 0; document.querySelector('.qtdTam4').innerText = qtd4 ;
}
   
function setTabuleiroJog (){
    const tabuleiro = document.querySelector(".tabuleiroJog");         
    for (let j = 0; j < 10; j++) {             
        const divColuna = document.createElement('div');
        for (let i = 0; i < 10; i++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            celula.classList.add('agua');
            celula.setAttribute("data-coluna" , j);
            celula.setAttribute("data-linha" , i);
            celula.addEventListener('click', colocaNavioJog, false);
            divColuna.appendChild(celula);
        }  
        tabuleiro.appendChild(divColuna);
    }
}
document.querySelector('.nav1').addEventListener('click', selecionaNavio);
document.querySelector('.nav2').addEventListener('click', selecionaNavio);
document.querySelector('.nav3').addEventListener('click', selecionaNavio);
document.querySelector('.nav4').addEventListener('click', selecionaNavio);

function selecionaNavio(event) {
   
    if (event.target.classList.contains('nav1')) {
        navio = 1;    
    } else if (event.target.classList.contains('nav2')) {
        navio = 2;      
    }else if (event.target.classList.contains('nav3')) {
        navio = 3;       
    }else { (event.target.classList.contains('nav4')) 
        navio = 4;       
    }
    document.querySelector('.nav1').classList.remove('highlight');
    document.querySelector('.nav2').classList.remove('highlight');
    document.querySelector('.nav3').classList.remove('highlight');
    document.querySelector('.nav4').classList.remove('highlight');
    event.target.classList.add('highlight'); 
}
function colocaNavioJog(event) {
    if (estadoJogo !== estados.INICIO){
        return;
    }
    const celula = event.target;
    const colI = parseInt(celula.getAttribute('data-coluna'),10);
    const linI = parseInt(celula.getAttribute('data-linha'),10); 
    const coord = normalizaEspaco(colI,linI,navio, sentido);
    const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');
    if (!disp){  return;   }
    
    if (navio == 1 && qtd1 > 0){
        
        qtd1--;
        document.querySelector('.qtdTam1').innerText = qtd1 ;
        celula.classList.add('navio', 'navio1');
        celula.setAttribute("data-n" , nDoNavio);
        nDoNavio++;
        if (sentido == 'VERT'){
            celula.classList.add('vertical');
        }
           
    } else if (navio == 2 && qtd2 > 0){   
        if (sentido == 'HORI'){ 
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroJog');
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');
        }
        qtd2--;
        document.querySelector('.qtdTam2').innerText = qtd2 ;
        
    } else if (navio == 3 && qtd3 > 0){
        if (sentido == 'HORI'){
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroJog');             
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');               
        } 
        qtd3--;
        document.querySelector('.qtdTam3').innerText = qtd3 ;  

    } else if (navio == 4 && qtd4 > 0){
        if (sentido == 'HORI'){
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, '.tabuleiroJog');               
        } else if (sentido == 'VERT'){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, '.tabuleiroJog');                
        }
        qtd4--;
        document.querySelector('.qtdTam4').innerText = qtd4 ;
    }
}
function aplicaNavioHori(colI, colF, linI, parent){
   document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta');
   document.querySelector(`${parent} [data-coluna="${colF}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta', 'traz');
   document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).setAttribute("data-n" , nDoNavio);
   document.querySelector(`${parent} [data-coluna="${colF}"][data-linha="${linI}"]`).setAttribute("data-n" , nDoNavio);
   if (colF-colI>1){
        for (let j = colI+1; j < colF; j++) {
            document.querySelector(`${parent} [data-coluna="${j}"][data-linha="${linI}"]`).classList.add('navio', 'navioMeio');
            document.querySelector(`${parent} [data-coluna="${j}"][data-linha="${linI}"]`).setAttribute("data-n" , nDoNavio);
        } 
    } 
    nDoNavio++;          
}
function aplicaNavioVert(colI, linI, linF, parent){
    document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navioPonta', 'vertical');
    document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linF}"]`).classList.add('navio', 'navioPonta', 'traz', 'vertical');
    document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).setAttribute("data-n" , nDoNavio);
    document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linF}"]`).setAttribute("data-n" , nDoNavio);
    if (linF-linI>1){
         for (let i = linI+1; i < linF; i++) {
             document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${i}"]`).classList.add('navio', 'navioMeio', 'vertical');
             document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${i}"]`).setAttribute("data-n" , nDoNavio);
         } 
    }
    nDoNavio++;              
}
function checaEspacosDisponiveis(colI, colF, linI, linF, parent){
    let disponivel = true;
    for (let j = colI; j <= colF; j++) {
        for (let i = linI; i <= linF; i++) {
            const celula = !document.querySelector(`${parent} [data-coluna="${j}"][data-linha="${i}"]`).classList.contains('navio');
            disponivel = disponivel && celula;
        }
    }
    return disponivel;
}
function normalizaEspaco(colI,linI,tamanho, orientacao){
    let colF ;
    let linF;
    if (orientacao == 'HORI'){
        if (10-colI >= tamanho){
            colF = colI + tamanho -1;
            linF = linI ;
        } else {
            colF = 9 ;
            colI = colF - tamanho + 1;
            linF = linI ;
        }
    } else  if (orientacao == 'VERT'){
        if (10-linI >= tamanho){
            linF = linI + tamanho -1;
            colF = colI ;
        } else {
            linF = 9 ;
            linI = linF - tamanho + 1;
            colF = colI ;
        }
    }
    return {
        colunaInicial: colI ,
        colunaFinal: colF,
        linhaInicial: linI,
        linhaFinal: linF
    };
}
function setTabuleiroPc(){
    const tabuleiro = document.querySelector(".tabuleiroPc");         
    for (let j = 0; j < 10; j++) {             
        const divColuna = document.createElement('div');
        for (let i = 0; i < 10; i++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            celula.classList.add('agua');
            celula.setAttribute("data-coluna" , j);
            celula.setAttribute("data-linha" , i);
            celula.addEventListener('click', jogadaJog, false);
            divColuna.appendChild(celula);
        }  
        tabuleiro.appendChild(divColuna);
    }
    colocaNavioAleatorio('.tabuleiroPc');
    trocaImgPc();
}
function colocaNavioAleatorio(parent){  
    let qtd1Pc = 4;
    let qtd2Pc = 3;
    let qtd3Pc = 2;
    let qtd4Pc = 1;

    while (qtd4Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,4,sentidoStr);
        if (sentidoAleat == 0){
            aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial , parent);             
        } else if (sentidoAleat == 1){
            aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, parent);               
        } 
        qtd4Pc--;   
    }
    while (qtd3Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,3,sentidoStr);
        const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, parent);
        if (disp){   
            if (sentidoAleat == 0){
                aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, parent);             
            } else if (sentidoAleat == 1){
                aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, parent);               
            } 
            qtd3Pc--;   
        }
    }
    while (qtd2Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,2,sentidoStr);
        const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, parent);
        if (disp){  
            if (sentidoAleat == 0){
                aplicaNavioHori(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, parent);             
            } else if (sentidoAleat == 1){
                aplicaNavioVert(coord.colunaInicial,coord.linhaInicial, coord.linhaFinal, parent);               
            } 
            qtd2Pc--; 
        }
    }
    while (qtd1Pc > 0) {
        let sentidoAleat = Math.floor(Math.random() *2);
        const sentidoStr = sentidoAleat==0?'HORI':'VERT';
        let colI = Math.floor(Math.random() *10);
        let linI = Math.floor(Math.random() *10);
        
        const coord = normalizaEspaco(colI,linI,1,sentidoStr);
        const disp = checaEspacosDisponiveis(coord.colunaInicial, coord.colunaFinal, coord.linhaInicial, coord.linhaFinal, parent);
        if (disp){            
            document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('navio', 'navio1');
            document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).setAttribute("data-n" , nDoNavio);
            nDoNavio++;
            if (sentidoAleat == 1){
                document.querySelector(`${parent} [data-coluna="${colI}"][data-linha="${linI}"]`).classList.add('vertical');
            }
            qtd1Pc--; 
        }   
    }
}
function trocaImgPc(){
    const temNavio1 = document.querySelectorAll(`.tabuleiroPc .navio1`)
    for (let i = 0; i < temNavio1.length ; i++) { 
        temNavio1[i].classList.add('n1');
        temNavio1[i].classList.remove('navio1');
    }
    const temNavioP = document.querySelectorAll(`.tabuleiroPc .navioPonta`)
    for (let i = 0; i < temNavioP.length ; i++) { 
        temNavioP[i].classList.add('nP');
        temNavioP[i].classList.remove('navioPonta');
    }
    const temNavioM = document.querySelectorAll(`.tabuleiroPc .navioMeio`)
    for (let i = 0; i < temNavioM.length ; i++) { 
        temNavioM[i].classList.add('nM');
        temNavioM[i].classList.remove('navioMeio');
    }
    const temVert = document.querySelectorAll(`.tabuleiroPc .vertical `)
    for (let i = 0; i < temVert .length ; i++) { 
        temVert [i].classList.add('v');
        temVert [i].classList.remove('vertical');
    }
}
function destrocaImgPc(navio){
    if (navio.classList.contains('n1')){ 
        navio.classList.add('navio1');
        navio.classList.remove('n1');
    }
    if (navio.classList.contains('nP')){ 
        navio.classList.add('navioPonta');
        navio.classList.remove('nP');
    }
    if (navio.classList.contains('nM')){     
        navio.classList.add('navioMeio');
        navio.classList.remove('nM');
    }
    if (navio.classList.contains('v')){ 
        navio.classList.add('vertical');
        navio.classList.remove('v');
    }
}
function jogadaJog(event){
    if (estadoJogo !== estados.JOGADOR){
        return;
    }
    acertoJog += atiraNaCelula(event.target);
    nDaJogada++;
    mostraNavioBombardeado();
    setTimeout(function() {
        trocaEstado(estados.PC);
        setTimeout(jogadaPc, 700);
    }, 1000)
}
function atiraNaCelula(celula){
    if (celula.classList.contains('navio')){
        celula.classList.add('bomba');
        return 1;
    } else {
        celula.classList.add('bombaagua');
        return 0;
    }
}
function mostraNavioBombardeado(){
    const nav4pontas = document.querySelectorAll(`[data-n="0"].navio.bomba.nP:not(.navioPonta)`)
    const nav4 = document.querySelectorAll(`[data-n="0"].navio.bomba.nM:not(.navioMeio)`);
    if( nav4.length + nav4pontas.length == 4){
        navioJog++;
        for (let i = 0; i < nav4.length; i++) {
            destrocaImgPc(nav4[i]); 
        }
        for (let i = 0; i < nav4pontas.length; i++) {
            destrocaImgPc(nav4pontas[i]); 
        }
    }
    for (let n = 1; n < 3; n++) {  
        const nav3pontas = document.querySelectorAll(`[data-n="${n}"].navio.bomba.nP:not(.navioPonta)`)
        const nav3 = document.querySelectorAll(`[data-n="${n}"].navio.bomba.nM:not(.navioMeio)`);
        if( nav3.length + nav3pontas.length == 3){
            navioJog++;
            for (let i = 0; i < nav3.length; i++) {
                destrocaImgPc(nav3[i]);
            }  
            for (let i = 0; i < nav3pontas.length; i++) {
                destrocaImgPc(nav3pontas[i]);
            }      
        }
    }
    for (let n = 3; n < 6; n++) {  
        const nav2 = document.querySelectorAll(`[data-n="${n}"].navio.bomba:not(.navioPonta)`)
        if( nav2.length == 2){
            navioJog++;
            for (let i = 0; i < nav2.length; i++) {
                destrocaImgPc(nav2[i]);
            }         
        }
    }
    for (let n = 6; n < 10; n++) { 
        const nav1 = document.querySelector(`[data-n="${n}"].navio.bomba:not(.navio1)`)
        if(nav1){
            navioJog++;
            destrocaImgPc(nav1);
        }       
    }
   
}
function jogadaPc(){
    if (estadoJogo !== estados.PC){
        return;
    } 
    const ultimosAcertos = [];
    let ultimoAcertoPc;
    for (let i = 0; i < jogadasPc.length; i++) {
        if (jogadasPc[i].classList.contains('bomba')){
            ultimoAcertoPc = jogadasPc[i];
            ultimosAcertos.push(ultimoAcertoPc);
        }
    }
    let celulaPraJogar;
    if (!ultimoAcertoPc || verificaUltimoNavioBomb(ultimoAcertoPc)){
        console.info('nao acertei nada ou ultimo navio bomb jogando aleatorio');
        celulaPraJogar = escolheCelulaAleat();
    } else {
        // teve ultimo acerto e nao destruiu o navio
        console.info('teve ultimo acerto e nao destruiu o navio , escolhendo direcao para jogar');
        if (ultimosAcertos.length == 1){
            console.info('só acertei 1, procurando adjacente');
            celulaPraJogar = adjacenteAleat(ultimoAcertoPc);
        } else {
            console.info('teve + de 1 acerto');
            const celUltAcerto = ultimosAcertos[ultimosAcertos.length-1];
            const ultN = celUltAcerto.getAttribute('data-n');
            const primeiroAcertoNavio = ultimosAcertos.find(function(acerto){
                return acerto.getAttribute('data-n') == ultN;
            })
            if (celUltAcerto == primeiroAcertoNavio){
                console.info('só acertou uma vez o navio, jogando adjacente do ultimo');
                celulaPraJogar = adjacenteAleat(ultimoAcertoPc);
            } else {
                console.info('navios iguais');
                const colultN = parseInt(celUltAcerto.getAttribute('data-coluna'));
                const colPrimN = parseInt(primeiroAcertoNavio.getAttribute('data-coluna'));
                const linultN = parseInt(celUltAcerto.getAttribute('data-linha'));
                const linPrimN = parseInt(primeiroAcertoNavio.getAttribute('data-linha'));
                const difLinha = Math.sign(linultN - linPrimN);   
                const difColuna = Math.sign(colultN - colPrimN);  
                console.info(`difLinha:${difLinha} difColuna${difColuna}`);
                if(colultN == colPrimN){
                    if (linultN < 9 && linultN > 0) {
                        console.info('nao esta nas bordas da linha, jogando na segqieuncia');
                        celulaPraJogar = pegaCelTabJog(linultN+difLinha,colultN);
                        if(celulaPraJogar.classList.contains('bombaagua') || celulaPraJogar.classList.contains('bomba')){
                            console.info('seq de jogada ja tem bomba, jogandoparaouyro lado');
                            celulaPraJogar = pegaCelTabJog(linPrimN-difLinha,colultN);
                        }
                    } else {
                        console.info('estou na borda da linha, jogando pro oiutro lado');
                        celulaPraJogar = pegaCelTabJog(linPrimN-difLinha,colultN);
                    }
                } else {
                    if (colultN < 9 && colultN > 0) {
                        console.info('nao esta nas bordas da coluna, jogando na segqieuncia');
                        celulaPraJogar = pegaCelTabJog(linultN,colultN+difColuna);
                        if(celulaPraJogar.classList.contains('bombaagua') || celulaPraJogar.classList.contains('bomba')){
                            console.info('seq de jogada ja tem bomba, jogandoparaouyro lado');
                            celulaPraJogar = pegaCelTabJog(linultN,colPrimN-difColuna);
                        }
                    } else {
                        console.info('estou na borda da coluna, jogando pro oiutro lado');
                        celulaPraJogar = pegaCelTabJog(linultN,colPrimN-difColuna);
                    }
                }
            }
        }    
    }
    acertoPc += atiraNaCelula(celulaPraJogar);
    jogadasPc.push(celulaPraJogar);
   

    setTimeout(function() {
        trocaEstado(estados.JOGADOR)
    },1000);
}
function pegaCelTabJog(linha,coluna){
    return document.querySelector(`.tabuleiroJog [data-coluna="${coluna}"][data-linha="${linha}"]`)
}
function escolheCelulaAleat(){
    const jogaveis = document.querySelectorAll(`.tabuleiroJog .celula:not(.bomba):not(.bombaagua)`);
    const indiceRandom = Math.floor(Math.random()*jogaveis.length);
    return jogaveis[indiceRandom];
}
function verificaUltimoNavioBomb(ultimoAcerto){
    const nDoNavio = ultimoAcerto.getAttribute('data-n');
    const nPecasNavio = document.querySelectorAll(`[data-n="${nDoNavio}"]`);
    const pecasComBomba = document.querySelectorAll(`[data-n="${nDoNavio}"].bomba`);
    return nPecasNavio.length == pecasComBomba.length;
}
function adjacenteAleat(celula){
    const col = parseInt(celula.getAttribute('data-coluna'),10);
    const lin = parseInt(celula.getAttribute('data-linha'),10); 
    const adjPossiveis = [];
    if(col > 0){
        const celOeste = pegaCelTabJog(lin,col-1);
        if (!celOeste.classList.contains('bomba') && !celOeste.classList.contains('bombaagua')){
            adjPossiveis.push(celOeste);
        }
    }
    if(col < 9){
        const celLeste = pegaCelTabJog(lin,col+1);
        if (!celLeste.classList.contains('bomba') && !celLeste.classList.contains('bombaagua')){
            adjPossiveis.push(celLeste);
        }
    }
    if(lin > 0){
        const celNorte = pegaCelTabJog(lin-1,col);
        if (!celNorte.classList.contains('bomba') && !celNorte.classList.contains('bombaagua')){
            adjPossiveis.push(celNorte);
        }
    }
    if(lin < 9){
        const celSul = pegaCelTabJog(lin+1,col);
        if (!celSul.classList.contains('bomba') && !celSul.classList.contains('bombaagua')){
            adjPossiveis.push(celSul);
        }
    }
    const indiceRandom = Math.floor(Math.random()*adjPossiveis.length);
    return adjPossiveis[indiceRandom];
}

function trocaEstado(estadoDestino){
    verificaFinaldeJogo();
    estadoJogo = estadoDestino;
    if (estadoDestino === estados.PC) {
        document.querySelector('.box-inner').classList.remove('vaiparaesquerda');
        
    } else if (estadoDestino === estados.JOGADOR) {
        document.querySelector('.box-inner').classList.add('vaiparaesquerda');
        
    }
}
function verificaFinaldeJogo(){
    
    if (acertoJog == 20){
        estadoJogo = estados.FINAL;
        document.querySelector('.finalDeJogo').classList.remove('some');
        document.querySelector('.finalDeJogo div').innerText = 'Você Ganhou';
    }
    if (acertoPc == 20){
        estadoJogo = estados.FINAL;
        document.querySelector('.finalDeJogo').classList.remove('some');
        document.querySelector('.finalDeJogo div').innerText = 'Você Perdeu';
    }
    atualizaPlacar();
}
function atualizaPlacar(){
    document.querySelector('.acertoJog').innerText = acertoJog + '/' + nDaJogada;
    document.querySelector('.acertoPc').innerText = acertoPc + '/' + nDaJogada;
    document.querySelector('.navioJog').innerText = navioJog;
    document.querySelector('.navioPc').innerText = contaNavioBombardeadoJog();
}
function contaNavioBombardeadoJog(){
    let navioPc = 0;
    for (let i = 10; i < 20; i++){
        const navios = document.querySelectorAll(`[data-n="${i}"]`).length;
        const navioBomba = document.querySelectorAll(`[data-n="${i}"].bomba`).length;
        if (navios == navioBomba) {
            navioPc++;
        }
    }
    return navioPc;
}


setTabuleiroPc();
setTabuleiroJog();