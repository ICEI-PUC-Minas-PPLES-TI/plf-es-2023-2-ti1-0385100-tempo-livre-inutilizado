document.addEventListener("DOMContentLoaded", function() {
  const amigosContainer = document.getElementById("amigos-container");
  const favoritosList = document.getElementById("favoritos");
  const favoritosScreenList = document.getElementById("favoritos-screen-list");
  const verFavoritosButton = document.getElementById("verFavoritos");
  const voltarButton = document.getElementById("voltar");
  const apiUrlUsuarios = "https://backup-json.joaoantonio78.repl.co/usuarios";
  const apiUrlAmigos = "https://jsonservertiaw.bebesads.repl.co/amigos";

  function carregarAmigosDoServidor() {
    fetch(apiUrlAmigos)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((amigo) => {
          adicionarAmigoNaTela(amigo);
        });
      });
  }

  function carregarUsuarios() {
    fetch(apiUrlUsuarios)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((usuario) => {
          const card = criarCard(usuario, false, true);
          amigosContainer.appendChild(card);
        });
      });
  }

  function criarCard(usuario, isAmigo, isInterativo) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${usuario.nome}</h3>
      <p>Gênero: ${usuario.genero}</p>
      <p>Orçamento: R$ ${usuario.orcamento}</p>
      <p>Endereço: ${usuario.endereco}</p>
      <p>Categoria: ${usuario.categoria}</p>
      <i id="amigo-${usuario.id}" class="far fa-star favorito ${isAmigo ? 'fas' : ''}"></i>
    `;

    if (isInterativo) {
      const amigoButton = card.querySelector(`#amigo-${usuario.id}`);
      amigoButton.addEventListener("click", () => toggleAmigo(usuario));
    }

    return card;
  }

  function toggleAmigo(usuario) {
    const iconeAmigo = document.querySelector(`#amigo-${usuario.id}`);
    iconeAmigo.classList.toggle("fas");

    if (iconeAmigo.classList.contains("fas")) {
      adicionarAmigo(usuario);
    } else {
      removerAmigo(usuario);
    }
  }

  function adicionarAmigo(usuario) {
    fetch(apiUrlAmigos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => response.json())
      .then((amigo) => {
        adicionarAmigoNaTela(amigo);
      });
  }

  function adicionarAmigoNaTela(amigo) {
    const card1 = criarCard(amigo, true, false);
    card1.id = `amigoList-${amigo.id}`; 
    favoritosList.appendChild(card1);

    const card2 = criarCard(amigo, true, false);
    card2.id = `amigoScreen-${amigo.id}`; 
    favoritosScreenList.appendChild(card2);
  }

  function removerAmigo(usuario) {
    fetch(`${apiUrlAmigos}/${usuario.id}`, {
      method: "DELETE",
    })
      .then(() => {
        const cardNaLista = document.querySelector(`#amigoList-${usuario.id}`);
        if (cardNaLista) {
          cardNaLista.remove();
        }

        const cardNaTela2 = document.querySelector(`#amigoScreen-${usuario.id}`);
        if (cardNaTela2) {
          cardNaTela2.remove();
        }
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

  carregarUsuarios();
  carregarAmigosDoServidor();
});
