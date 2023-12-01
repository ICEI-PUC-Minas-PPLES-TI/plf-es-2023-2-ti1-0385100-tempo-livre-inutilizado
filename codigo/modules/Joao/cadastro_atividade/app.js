const apiUrl = 'https://backup-json.joaoantonio78.repl.co/atividades';

function displayMessage(mensagem) {
  msg = document.getElementById('msg');
  msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

function readAtividade(processaDados) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      processaDados(data);
    })
    .catch(error => {
      console.error('Erro ao ler atividades via API JSONServer:', error);
      displayMessage("Erro ao ler atividades");
    });
}

function createAtividade(atividade, refreshFunction) {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(atividade),
  })
    .then(response => response.json())
    .then(data => {
      displayMessage("Atividade inserida com sucesso");
      if (refreshFunction)
        refreshFunction();
    })
    .catch(error => {
      console.error('Erro ao inserir atividade via API JSONServer:', error);
      displayMessage("Erro ao inserir atividade");
    });
}

function updateAtividade(id, atividade, refreshFunction) {
  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(atividade),
  })
    .then(response => response.json())
    .then(data => {
      displayMessage("Atividade alterada com sucesso");
      if (refreshFunction)
        refreshFunction();
    })
    .catch(error => {
      console.error('Erro ao atualizar atividade via API JSONServer:', error);
      displayMessage("Erro ao atualizar atividade");
    });
}

function deleteAtividade(id, refreshFunction) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      displayMessage("Atividade removido com sucesso");
      if (refreshFunction)
        refreshFunction();
    })
    .catch(error => {
      console.error('Erro ao remover atividade via API JSONServer:', error);
      displayMessage("Erro ao remover atividade");
    });
}


