document.addEventListener("DOMContentLoaded", function() {
    const Amigos = [];

    const amigosDatabase = [
        { id: 1, nome: 'HelioXXI', descrição: 'Membro desde: 21/02/2004 Última vez online: 5 dias', image: 'https://picsum.photos/250/250' },
        { id: 2, nome: 'jolonga', descrição: 'Membro desde: 15/06/2020 Última vez online: 2 meses', image: 'https://picsum.photos/250/250' },
        { id: 3, nome: 'Mcts11', descrição: 'Membro desde: 05/07/2015 Última vez online: 1 ano', image: 'https://picsum.photos/250/250' },
        { id: 4, nome: 'gabitolage', descrição: 'Membro desde: 30/09/2019 Última vez online: 26 minutos', image: 'https://picsum.photos/250/250' },
        { id: 5, nome: 'saulinhos', descrição: 'Membro desde: 17/01/2008 Última vez online: online', image: 'https://picsum.photos/250/250' },
        { id: 6, nome: 'ihha', descrição: 'Membro desde: 24/08/2003 Última vez online: 47 segundos', image: 'https://picsum.photos/250/250' },
    ];
    Amigos.push(...amigosDatabase);

    function renderAmigos() {
        const AmigosContainer = document.getElementById('Amigos');
        AmigosContainer.innerHTML = '';

        Amigos.forEach((amigo, index) => {

            const amigoDiv = document.createElement('div');
            amigoDiv.classList.add('amigo-activity');
            amigoDiv.setAttribute('data-id', amigo.id);

            amigoDiv.innerHTML = `
                <input type="checkbox">
                <img src="${amigo.image}" alt="Imagem do amigo">
                <h2 contenteditable="true">${amigo.nome}</h2>
                <p>${amigo.descrição}</p>
                <button class="edit-button">Editar</button>
            `;

            const editButton = amigoDiv.querySelector('.edit-button');
            editButton.addEventListener('click', () => editAmigo(amigo.id));

            AmigosContainer.appendChild(amigoDiv);
        });
    }

    function addAmigo(nome, descrição, image) {
        const newId = Amigos.length + 1;
        const newAmigo = {
            id: newId,
            nome,
            descrição,
            image
        };

        Amigos.push(newAmigo);
        renderAmigos();
    }

    function editAmigo(id) {
        const nomeElement = document.querySelector(`[data-id="${id}"] h2`);
        const editButton = document.querySelector(`[data-id="${id}"] .edit-button`);

        if (nomeElement.getAttribute('contenteditable') === 'true') {
            nomeElement.setAttribute('contenteditable', 'false');
            nomeElement.style.border = 'none';
            editButton.textContent = 'Editar';
        } else {
            nomeElement.setAttribute('contenteditable', 'true');
            nomeElement.style.border = '1px solid #007BFF';
            nomeElement.focus();
            editButton.textContent = 'Salvar';
        }
    }

    function removeSelectedAmigos() {
        Amigos.forEach((amigo, index) => {
            const checkbox = document.querySelector(`[data-id="${amigo.id}"] input[type="checkbox"]`);
            if (checkbox.checked) {
                Amigos.splice(index, 1);
            }
        });

        renderAmigos();
    }

    const removeButton = document.querySelector('.remove-selected-button');
    removeButton.addEventListener('click', removeSelectedAmigos);

    renderAmigos();
});

