let seuVoto = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.di-2');
let lateral = document.querySelector('.di-1-rigt');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];


function comecaEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

   for (let i=0; i<etapa.numeros; i++){
      if(i === 0){
        numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }

    }


    seuVoto.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
         if(item.numero === numero) {
             return true;
         }else {
             return false;
         }
    });
     if(candidato.length > 0) {
         candidato = candidato[0];
         seuVoto.style.display = 'block';
         aviso.style.display = 'block';
         descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
 
         let fotosHtml = '';
         for(let i in candidato.fotos){
             if(candidato.fotos[i].small){
                fotosHtml +=`<div class="d-1-image small"> <img src="imagens/${candidato.fotos[i].url}" alt="0">${candidato.fotos[i].legenda}</div>`;

             }else{
                fotosHtml +=`<div class="d-1-image"> <img src="imagens/${candidato.fotos[i].url}" alt="0">${candidato.fotos[i].legenda}</div>`;
             }
            }
         lateral.innerHTML = fotosHtml;
     } else {
         seuVoto.style.display = 'block';
         aviso.style.display = 'block';
         descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO NULO</div>';
     }
 
}

function clicou(n) {
   let elNumero = document.querySelector('.numero.pisca');
   if(elNumero !== null) {
       elNumero.innerHTML = n;
       numero = `${numero}${n}`;

         elNumero.classList.remove('pisca');
      if(elNumero.nextElementSibling !== null){
         elNumero.nextElementSibling.classList.add('pisca');
       } else {
           atualizaInterface();
       }
     
   }
}

function branco() {
   if(numero === ''){
        votoBranco = true;
        seuVoto.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca"> VOTO EM BRANCO</div>';
   }else{
       alert("Para votar em BRANCO, não pode ter Digitado nenhum número!");
   }
}

function corrige() {
    comecaEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
           etapa: etapas[etapaAtual].titulo,
           voto: 'branco'
        });
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
         });
    }

    if(votoConfirmado) {
       etapaAtual++;
       if(etapas[etapaAtual] !== undefined){
           comecaEtapa();
       }else{
          document.querySelector('.tela').innerHTML =  '<div class="aviso--gigante pisca">FIM</div>';
          console.log(votos);
       }
    }

}

comecaEtapa();

