document.addEventListener("DOMContentLoaded", function() {
  const favoritosScreenList = document.getElementById("favoritos-screen-list");
  const voltarButton = document.getElementById("voltar");
  const apiUrlFavoritos = "https://jsonservertiaw.bebesads.repl.co/personagens";

  function carregarFavoritosNaTela() {
    fetch(apiUrlFavoritos)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((favorito) => {
          adicionarFavoritoNaTelaScreen(favorito);
        });
      });
  }

  function adicionarFavoritoNaTelaScreen(favorito) {
    const favoritoItem = document.createElement("li");
    favoritoItem.textContent = `Nome: ${favorito.nome}`;
    favoritoItem.id = `favoritoItemScreen-${favorito.id}`;
    favoritoItem.classList.add("favorito-tela2");
    favoritosScreenList.appendChild(favoritoItem);
  }

  function voltarParaAtividades() {
    document.getElementById("favoritos-screen").style.display = "none";
    document.getElementById("favoritos-list").style.display = "none";
    document.getElementById("atividades").style.display = "block";


    const favoritosTela2 = document.querySelectorAll(".favorito-tela2");
    favoritosTela2.forEach((favoritoTela2) => {
      favoritoTela2.remove();
    });
  }

  voltarButton.addEventListener("click", voltarParaAtividades);

  carregarFavoritosNaTela();
});
