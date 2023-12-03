function criarBotao() {
    fetch('db.json')
        .then(function (response) { return response.json(); })
        .then(function (db) {
            let textoHTML = '';
            let index=0
            db.interesses.map(e =>{
                textoHTML +=
                    `<div class="interesses">
                        <input type="checkbox" class="btn-check" id="btncheck${index}" autocomplete="off">
                        <label class="btn btn-outline-primary" for="btncheck${index}">${e.interesse}</label>
                    </div>`;
                    index++
            })
            document.getElementById('botoes').innerHTML = textoHTML;
        })
}

document.getElementById('botaoSeguir').addEventListener('click', function() {
    alert('Interesses cadastrados!');
    // Adicione outras ações que deseja executar ao clicar no botão aqui
  });