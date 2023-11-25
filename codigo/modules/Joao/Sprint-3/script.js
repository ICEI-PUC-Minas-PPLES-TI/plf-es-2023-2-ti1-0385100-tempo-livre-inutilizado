let divAtividades = document.querySelector(".row-cols-1");

fetch("https://backup-json.joaoantonio78.repl.co/atividades").then((response) => {
    response.json().then((atividades) => {
        atividades.forEach((atividade) => {

            let card = document.createElement("div");
            card.className = "col mb-4";

            let cor = atividade.categoria === "Virtual" ? "bg-success" : "bg-primary";
            card.innerHTML = `
                <div class="card h-100 ${cor}">
                    <h3 class="card-title text-light">${atividade.genero} - ${atividade.nome}</h3>
                    <div class="card-body">
                        <p class="card-text text-light"><strong>Orçamento:</strong> R$ ${atividade.orcamento}</p>
                        <p class="card-text text-light"><strong>Categoria:</strong> ${atividade.categoria}</p>
                    </div>
                </div>
            `;


            card.addEventListener("click", () => {
                window.location.href = `pagina_atividade.html?id=${atividade.id}`;
            });

             
            divAtividades.appendChild(card);
        });
    });
});
