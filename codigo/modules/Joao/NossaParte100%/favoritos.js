document.addEventListener("DOMContentLoaded", function () {
    const favoritosList = document.getElementById("favoritos-list");
    const personagensApiUrl = "https://sauloso.bebesads.repl.co/atividades";
    const termoPesquisa = document.getElementById("termo_pesquisa_favoritos");

    carregarFavoritosDoServidor("");

    termoPesquisa.addEventListener("input", function () {
        const termo = termoPesquisa.value;
        carregarFavoritosDoServidor(termo);
    });

    function carregarFavoritosDoServidor(termo) {
        fetch(personagensApiUrl)
            .then((response) => response.json())
            .then((data) => {
                const favoritosFiltrados = termo
                    ? data.filter((favorito) => favorito.nome.toLowerCase().includes(termo.toLowerCase()))
                    : data;

                favoritosList.innerHTML = "";
                favoritosFiltrados.forEach((favorito) => {
                    adicionarFavoritoNaTela(favorito);
                });
            })
            .catch((error) => {
                console.error("Erro ao carregar favoritos do servidor:", error);
            });
    }

    function adicionarFavoritoNaTela(favorito) {
        const card = criarCard(favorito);
        favoritosList.appendChild(card);
    }

    function criarCard(atividade) {
        const generoEmojis = {
            Lazer: "⚽️",
            Estudo: "📚",
            Show: "🎤",
            Música: "🎶",
            Filmes: "🍿",
        };

        const generoEmoji = generoEmojis[atividade.genero] || "🧾";
        const orcamento = parseFloat(atividade.orcamento);

        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        cardElement.innerHTML = `
            <div class="card-body">
                <p class="card-genero">${generoEmoji} ${atividade.genero}${orcamento === 0 ? "⠀⠀🎫 Gratuita" : ""}</p>
                <div class="card-header">
                    <p class="card-title">${atividade.nome}</p>
                    <i id="favorito-${atividade.atividadeId}" class="far fa-star favorito" onclick="removerFavorito(${atividade.atividadeId})"></i>
                </div>
                <p class="card-text">Orçamento: R$${atividade.orcamento}</p>
                <p class="card-text">Categoria: ${atividade.categoria}</p>
                <p class="card-entrar" id="acesse-atividade">Acesse a atividade ➔</p>
            </div>`;

        const acesseAtividadeElement = cardElement.querySelector("#acesse-atividade");
        acesseAtividadeElement.addEventListener("click", function () {
            window.location.href = `pagina_atividade.html?id=${atividade.atividadeId}`;
        });

        return cardElement;
    }

    function removerFavorito(atividadeId) {
        fetch(`${personagensApiUrl}/${atividadeId}`, {
            method: "DELETE"
        })
            .then(() => {
                const cardNaLista = document.querySelector(`#favoritoList-${atividadeId}`);
                if (cardNaLista) {
                    cardNaLista.remove();
                }

                const cardNaTela2 = document.querySelector(`#favoritoScreen-${atividadeId}`);
                if (cardNaTela2) {
                    cardNaTela2.remove();
                }
            })
            .catch(error => console.error("Erro ao remover favorito do servidor:", error));
    }
});
