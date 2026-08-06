//script.js

const botoes =
  document.querySelectorAll(".botao");

const secoes =
  document.querySelectorAll(".secao");

const themeToggle =
  document.getElementById("themeToggle");

const menuBtn =
  document.getElementById("menuBtn");

const sidebar =
  document.getElementById("sidebar");

const overlay =
  document.getElementById("overlay");

/* ESCONDE O PAINEL NO INÍCIO */

document.querySelector(".painel").style.display =
  "none";

/* TROCAR SEÇÕES */

botoes.forEach((botao) => {

  botao.addEventListener("click", () => {

    // REMOVE CLASSES
    botoes.forEach((b) => {
      b.classList.remove("ativo");
    });

    secoes.forEach((s) => {
      s.classList.remove("ativa");
    });

    // ATIVA BOTÃO
    botao.classList.add("ativo");

    // ABRE SEÇÃO
    const alvo =
      document.getElementById(
        botao.dataset.target
      );

    if (alvo) {

      alvo.classList.add("ativa");

    }

    // FECHA MENU
    sidebar.classList.remove("abrir");

    overlay.classList.remove("ativo");

  });

});

/* DARK MODE */

themeToggle.addEventListener(
  "click",
  () => {
    document.body.classList.toggle(
      "dark"
    );

  }
);

/* MENU */

if(menuBtn){
  menuBtn.addEventListener(
    "click",
    () => {
      sidebar.classList.toggle(
        "abrir"
      );
      if(overlay){
        overlay.classList.toggle(
          "ativo"
        );
      }

    }
  );

}

/* FECHAR MENU */

if(overlay){

  overlay.addEventListener(
    "click",
    () => {

      sidebar.classList.remove(
        "abrir"
      );

      overlay.classList.remove(
        "ativo"
      );

    }
  );

}

/* ABRIR PAINEL */

function abrirPainel(){

  setTimeout(() => {

    document.getElementById("home").style.display = "none";

    document.querySelector(".painel").style.display = "block";

  }, 3000);

}

setTimeout(() => {

  document.getElementById("home").style.display =
    "none";

  document.querySelector(".painel").style.display =
    "block";

}, 3000);


setInterval(() => {

fetch("http://192.168.0.112/valor")

.then(res => res.text())

.then(dados => {

let partes = dados.split("|");


document.getElementById("mq2Valor").innerHTML = partes[0];

document.getElementById("mq2Status").innerHTML = partes[1];

document.getElementById("mq2Hora").innerHTML =
new Date().toLocaleTimeString();


});


},1000);