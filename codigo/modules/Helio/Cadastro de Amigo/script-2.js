document.addEventListener("DOMContentLoaded", function() {
  const favoritosScreenList = document.getElementById("favoritos-screen-list");
  const voltarButton = document.getElementById("voltar");
  const apiUrlFavoritos = "https://jsonservertiaw.bebesads.repl.co/personagens";

  function carregarFavoritosNaTela() {
    fetch(apiUrlFavoritos)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((favorito) => {
          const card = criarCard(favorito, true);
          favoritosScreenList.appendChild(card);
        });
      });
  }

  function criarCard(favorito, isFavorito) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${favorito.nome}</h3>
      <p>Gênero: ${favorito.genero}</p>
      <p>Orçamento: R$ ${favorito.orcamento}</p>
      <p>Endereço: ${favorito.endereco}</p>
      <p>Categoria: ${favorito.categoria}</p>
      <i id="favorito-${favorito.id}" class="far fa-star favorito ${isFavorito ? 'fas' : ''}"></i>
    `;

    return card;
  }

  function voltarParaAtividades() {
    document.getElementById("favoritos-screen").style.display = "none";
    document.getElementById("favoritos-list").style.display = "none";
    document.getElementById("amigos-container").style.display = "block"; 
  }

  voltarButton.addEventListener("click", voltarParaAtividades);

  carregarFavoritosNaTela();
});
