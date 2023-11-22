document.addEventListener("DOMContentLoaded", function() {
  const atividadesContainer = document.getElementById("atividades");
  const favoritosList = document.getElementById("favoritos");
  const favoritosScreenList = document.getElementById("favoritos-screen-list");
  const verFavoritosButton = document.getElementById("verFavoritos");
  const voltarButton = document.getElementById("voltar");
  const apiUrlAtividades = "https://backup-json.joaoantonio78.repl.co/atividades";
  const apiUrlFavoritos = "https://jsonservertiaw.bebesads.repl.co/personagens";

  function carregarFavoritosDoServidor() {
    fetch(apiUrlFavoritos)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((favorito) => {
          adicionarFavoritoNaTela(favorito, true, false);
        });
      });
  }

  function carregarAtividades() {
    fetch(apiUrlAtividades)
      .then((response) => response.json())
      .then((data) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        data.forEach((atividade) => {
          const isFavorito = favoritos.some(favorito => favorito.id === atividade.id);
          const card = criarCard(atividade, isFavorito, true);
          atividadesContainer.appendChild(card);
        });
      });
  }

  function criarCard(atividade, isFavorito, isInterativo) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${atividade.nome}</h3>
      <p>Gênero: ${atividade.genero}</p>
      <p>Orçamento: R$ ${atividade.orcamento}</p>
      <p>Categoria: ${atividade.categoria}</p>
      <i id="favorito-${atividade.id}" class="far fa-star favorito ${isFavorito ? 'fas' : ''}"></i>
    `;

    if (isInterativo) {
      const favoritoButton = card.querySelector(`#favorito-${atividade.id}`);
      favoritoButton.addEventListener("click", () => toggleFavorito(atividade));
    }

    return card;
  }

  function toggleFavorito(atividade) {
    const iconeFavorito = document.querySelector(`#favorito-${atividade.id}`);
    iconeFavorito.classList.toggle("fas");

    if (iconeFavorito.classList.contains("fas")) {
      adicionarFavorito(atividade);
    } else {
      removerFavorito(atividade);
    }
  }

  function adicionarFavorito(atividade) {
    fetch(apiUrlFavoritos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atividade),
    })
      .then((response) => response.json())
      .then((favorito) => {
        adicionarFavoritoNaTela(favorito, true, false);
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos.push(favorito);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      });
  }

  function adicionarFavoritoNaTela(favorito, isFavorito, isInterativo) {
    const card = criarCard(favorito, isFavorito, isInterativo);
    card.id = `favoritoList-${favorito.id}`;
    favoritosList.appendChild(card);

    const cardScreen = criarCard(favorito, isFavorito, isInterativo);
    cardScreen.id = `favoritoScreen-${favorito.id}`;
    favoritosScreenList.appendChild(cardScreen);
  }

  function removerFavorito(atividade) {
    fetch(`${apiUrlFavoritos}/${atividade.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const cardNaLista = document.querySelector(`#favoritoList-${atividade.id}`);
        if (cardNaLista) {
          cardNaLista.remove();
        }

        const cardNaTela2 = document.querySelector(`#favoritoScreen-${atividade.id}`);
        if (cardNaTela2) {
          cardNaTela2.remove();
        }

        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos = favoritos.filter(favorito => favorito.id !== atividade.id);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
      });
  }

  verFavoritosButton.addEventListener("click", function() {
    document.getElementById("favoritos-list").style.display = "block";
    document.getElementById("atividades").style.display = "none";
  });

  voltarButton.addEventListener("click", function() {
    document.getElementById("favoritos-screen").style.display = "none";
    document.getElementById("favoritos-list").style.display = "none";
    document.getElementById("atividades").style.display = "block";
  });

  carregarAtividades();
  carregarFavoritosDoServidor();
});
