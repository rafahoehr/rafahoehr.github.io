function getParametro(nome) {
  return new URLSearchParams(window.location.search).get(nome);
}

function mostrarErro(msg) {
  document.getElementById("conteudo").innerHTML =
    `<div class="erro">❌ ${msg}</div>`;
}

const tagId = getParametro("id");
const jogoAtivo = localStorage.getItem("jogoAtivo");

if (!jogoAtivo) {
  mostrarErro("Escolha um jogo usando a tag inicial.");
} else if (!tagId) {
  mostrarErro("Nenhuma tag detectada.");
} else {
  fetch(`jogos/${jogoAtivo}.json`)
    .then(r => r.json())
    .then(dados => {
      const pista = dados[tagId];
      if (!pista) {
        mostrarErro("Esta tag não faz parte deste jogo.");
      } else {
        document.getElementById("conteudo").innerHTML =
          `<div class="pista">${pista.texto}</div>`;
      }
    })
    .catch(() => mostrarErro("Erro ao carregar o jogo."));
}
