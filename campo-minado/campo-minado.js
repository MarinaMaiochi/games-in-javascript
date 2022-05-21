let linhasCampo;
let colunasCampo;
let dificuldade;
let valorDificuldade = 10;
let qtdBombas;

function recebeValorLinhaColuna(){
  const inputLinha = document.querySelector('.linhasTab');
  linhasCampo = inputLinha.value;
  const inputColuna = document.querySelector('.colunasTab');
  colunasCampo = inputColuna.value;
}
function addNivel(){
  document.querySelector('.facil').addEventListener('click', escolheNivel);
  document.querySelector('.medio').addEventListener('click', escolheNivel);
  document.querySelector('.dificil').addEventListener('click', escolheNivel);
}
function escolheNivel(event){
  const escolha = event.target;
  if (escolha.classList.contains('facil')) {
      dificuldade = 'FACIL' ;
      valorDificuldade = 10;
      document.querySelector('.facil').classList.remove('butEscuro');
      document.querySelector('.medio').classList.add('butEscuro');
      document.querySelector('.dificil').classList.add('butEscuro');
  } else if (escolha.classList.contains('medio')) {
      dificuldade = 'MEDIO' ;
      valorDificuldade = 8;
      document.querySelector('.medio').classList.remove('butEscuro');
      document.querySelector('.facil').classList.add('butEscuro');
      document.querySelector('.dificil').classList.add('butEscuro');
  } else if (escolha.classList.contains('dificil')) {
      dificuldade = 'DIFICIL' ;
      valorDificuldade = 5;
      document.querySelector('.dificil').classList.remove('butEscuro');
      document.querySelector('.facil').classList.add('butEscuro');
      document.querySelector('.medio').classList.add('butEscuro');
  } 
  const facil = document.querySelector('.facil');
  facil.removeEventListener('click', escolheNivel);
  const medio = document.querySelector('.medio');
  medio.removeEventListener('click', escolheNivel);
  const dificil = document.querySelector('.dificil');
  dificil.removeEventListener('click', escolheNivel);
  recebeValorLinhaColuna();
  montaCampo(linhasCampo,colunasCampo);    
}
function montaCampo(linha,coluna){
  const tabuleiro = document.querySelector(".tabuleiro");
  for (let i = 0; i < coluna; i++) {                     
    const divLinha = document.createElement('div');
    for (let j = 0; j < linha; j++) {
      const celula = document.createElement('div');
      celula.setAttribute("data-linha" , j);
      celula.setAttribute("data-coluna" , i);
      celula.classList.add('celula');
      celula.classList.add('grama');
      celula.classList.add('vazio');
      celula.addEventListener('click', jogada);
      divLinha.appendChild(celula);
    }
    tabuleiro.appendChild(divLinha);
  }
  colocaBomba();
}
function colocaBomba(){
  qtdBombas = Math.floor((linhasCampo * colunasCampo) / valorDificuldade);
  for (let i = 0; i < qtdBombas; i++) {
    const vazios = document.querySelectorAll('.vazio');
    const aleatorio = Math.floor(Math.random() * vazios.length);
    vazios[aleatorio].classList.add('bomba');
    vazios[aleatorio].classList.remove('vazio');
  }
  contadorDeBomba(linhasCampo,colunasCampo);
}
function contadorDeBomba(linhas,colunas){
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      const celula = document.querySelector(`[data-linha="${i}"][data-coluna="${j}"]`);
      let valorDaCelula = 0;
      if(i==0 && j==0){
        if (document.querySelector(`[data-linha="${0}"][data-coluna="${1}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${1}"][data-coluna="${1}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${1}"][data-coluna="${0}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
      } else if(i==0 && j==colunas-1){
        if (document.querySelector(`[data-linha="${0}"][data-coluna="${colunas-2}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${1}"][data-coluna="${colunas-2}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${1}"][data-coluna="${colunas-1}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
      } else if(i==linhas-1 && j==0){
        if (document.querySelector(`[data-linha="${linhas-2}"][data-coluna="${0}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${linhas-2}"][data-coluna="${1}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${linhas-1}"][data-coluna="${1}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
      } else if(i==linhas-1 && j==colunas-1){
        if (document.querySelector(`[data-linha="${linhas-2}"][data-coluna="${colunas-2}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${linhas-2}"][data-coluna="${colunas-1}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
        if (document.querySelector(`[data-linha="${linhas-1}"][data-coluna="${colunas-2}"]`).classList.contains('bomba')){
          valorDaCelula++;
        }
      } else if(i>0 && i<linhas-1 && j==0){
        for (let m = -1; m < 2; m++) {
          for (let n = 0; n < 2; n++) {
            if (document.querySelector(`[data-linha="${i+m}"][data-coluna="${j+n}"]`).classList.contains('bomba')){
              valorDaCelula++;
            }
          } 
        }
      } else if(i>0 && i<linhas-1 && j==colunas-1){
        for (let m = -1; m < 2; m++) {
          for (let n = -1; n < 1; n++) {
            if (document.querySelector(`[data-linha="${i+m}"][data-coluna="${j+n}"]`).classList.contains('bomba')){
              valorDaCelula++;
            }
          } 
        }
      } else if(i==0 && j>0 && j<colunas-1){
        for (let m = 0; m < 2; m++) {
          for (let n = -1; n < 2; n++) {
            if (document.querySelector(`[data-linha="${i+m}"][data-coluna="${j+n}"]`).classList.contains('bomba')){
              valorDaCelula++;
            }
          } 
        }
      } else if(i==linhas-1 && j>0 && j<colunas-1){
        for (let m = -1; m < 1; m++) {
          for (let n = -1; n < 2; n++) {
            if (document.querySelector(`[data-linha="${i+m}"][data-coluna="${j+n}"]`).classList.contains('bomba')){
              valorDaCelula++;
            }
          } 
        }
      } else {
        for (let m = -1; m < 2; m++) {
          for (let n = -1; n < 2; n++) {
            if (document.querySelector(`[data-linha="${i+m}"][data-coluna="${j+n}"]`).classList.contains('bomba')){
              valorDaCelula++;
            }
          } 
        }
      }
      if (celula.classList.contains('bomba')){
        valorDaCelula = 0;
      }
      if(valorDaCelula > 0){
        celula.setAttribute("data-n" , valorDaCelula);
        celula.classList.add('numero');
        celula.classList.remove('vazio');
      }
    }    
  }
}

function jogada(event){
  const celula = event.target;
  if (celula.classList.contains('bomba')){
    celula.classList.add('bombaestourada');
    celula.classList.remove('bomba');
  } else if (celula.classList.contains('numero')){
    celula.classList.add('cavado');
    celula.classList.remove('grama');
    let num = celula.getAttribute("data-n");
    celula.innerText = num;
  } else if (celula.classList.contains('vazio')){
    celula.classList.add('cavado');
    celula.classList.remove('grama');
    celula.classList.remove('vazio');
    mostraArredor(celula);
  }
  verificaResultadoDoJogo();
}
function mostraArredor(celula){
  let linhas = parseInt(celula.getAttribute("data-linha"),10);
  let colunas = parseInt(celula.getAttribute("data-coluna"),10);
 
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      
      const adjacente = document.querySelector(`[data-linha="${linhas+i}"][data-coluna="${colunas+j}"]`);
      if (adjacente) {
        if (adjacente.classList.contains('numero')){
          adjacente.classList.add('cavado');
          adjacente.classList.remove('grama');
          let num = adjacente.getAttribute("data-n");
          adjacente.innerText = num;
        } else if (adjacente.classList.contains('vazio')){
          celula.classList.add('cavado');
          adjacente.classList.remove('grama');
          celula.classList.remove('vazio');
          mostraArredor(adjacente);
        }
      }
    }    
  }
}
function verificaResultadoDoJogo(){
  
  if (document.querySelectorAll('.bombaestourada').length >= 1){
    document.querySelector('.resultado').innerText = 'Perdeu';
    
    for (let i = 0; i < linhasCampo; i++) {
      for (let j = 0; j < colunasCampo; j++) {
        let celula = document.querySelector(`[data-linha="${i}"][data-coluna="${j}"]`);

        if (celula.classList.contains('bomba')){
          celula.classList.add('bombanaoestourada');
          celula.classList.remove('bomba');
        } else if (celula.classList.contains('numero')){
          celula.classList.add('cavado');
          celula.classList.remove('grama');
          let num = celula.getAttribute("data-n");
          celula.innerText = num;
        } else if (celula.classList.contains('vazio')){
          celula.classList.add('cavado');
          celula.classList.remove('grama');
          celula.classList.remove('vazio');
        }
      }
    }
  }

  let nGrama = document.querySelectorAll('.grama');
  let nBomba = document.querySelectorAll('.bomba');
  if ( nBomba.length == nGrama.length){
    document.querySelector('.resultado').innerText = 'Ganhou';
    nBomba.forEach(element => {
      element.classList.add('bandeira');
      element.classList.remove('bomba');
    });
  }
}


addNivel();

document.querySelector('.novojogo').addEventListener('click', chamaNovoJogo);
function chamaNovoJogo(){
  
  document.querySelector('.facil').classList.remove('butEscuro');
  document.querySelector('.medio').classList.remove('butEscuro');
  document.querySelector('.dificil').classList.remove('butEscuro');
  document.querySelector(".tabuleiro").innerHTML = '';
  document.querySelector('.resultado').innerText = '';
  
  addNivel();
}