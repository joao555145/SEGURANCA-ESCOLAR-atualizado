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

menuBtn.addEventListener(
  "click",
  () => {

    sidebar.classList.toggle(
      "abrir"
    );

    overlay.classList.toggle(
      "ativo"
    );

  }
);

/* FECHAR MENU */

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