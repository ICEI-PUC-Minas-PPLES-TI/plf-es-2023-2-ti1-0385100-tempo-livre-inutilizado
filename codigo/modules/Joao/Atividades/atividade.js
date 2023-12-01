document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const atividadeId = urlParams.get('id');
  
    fetch(`https://backup-json.joaoantonio78.repl.co/atividades/${atividadeId}`)
      
        .then((response) => response.json())
        .then((atividade) => {
            document.getElementById("nomeAtividade").textContent = atividade.nome;
            document.getElementById("generoAtividade").textContent = atividade.genero;
            document.getElementById("orcamentoAtividade").textContent = `R$ ${atividade.orcamento}`;
            document.getElementById("enderecoAtividade").textContent = atividade.endereco;
            document.getElementById("categoriaAtividade").textContent = atividade.categoria;
        });
});
