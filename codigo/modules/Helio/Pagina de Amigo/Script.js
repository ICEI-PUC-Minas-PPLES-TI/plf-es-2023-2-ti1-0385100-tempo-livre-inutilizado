document.addEventListener("DOMContentLoaded", function() {
    const Amigos = [];

    const amigosDatabase = [
        { id: 1, nome: 'HelioXXI', descrição: 'Membro desde: 21/02/2004<br>Última vez online: 5 dias', image: 'https://cdn.discordapp.com/attachments/1144268636027101247/1181717353801732206/IMG-20220609-WA0057.jpg?ex=6582130c&is=656f9e0c&hm=434db4f804bbfa2856e4e7f1d90b0d5f7a63ff8ca651c17e1f34b031a8c68e71&' },
        { id: 2, nome: 'jolonga', descrição: 'Membro desde: 15/06/2020<br>Última vez online: 2 meses', image: 'https://cdn.discordapp.com/attachments/1144268636027101247/1181720208101093426/euae.jpg?ex=658215b4&is=656fa0b4&hm=995ac554a16e4c86fdc06c2946ea53ec25f64eb35dda2b1ecfc15ef51dfb0ab2&' },
        { id: 3, nome: 'Mcts11', descrição: 'Membro desde: 05/07/2015<br>Última vez online: 1 ano', image: 'https://cdn.discordapp.com/attachments/1144268636027101247/1181723550835540110/IMG_1564.png?ex=658218d1&is=656fa3d1&hm=c96d5fbc7b58f5ba1c6113b347ddf5f0c31869eb40bb634ce57664b3b727a81c&' },
        { id: 4, nome: 'gabitolage', descrição: 'Membro desde: 30/09/2019<br>Última vez online: 26 minutos', image: 'https://cdn.discordapp.com/attachments/1144268636027101247/1181716163827347496/77554209-e4be-4362-a205-7aab334daa1d.jpg?ex=658211f0&is=656f9cf0&hm=7cae278d144d292ff0b7e549bfd189e4e1c36d5d5982d184791bc663d33c5c1c&' },
        { id: 5, nome: 'saulinhos', descrição: 'Membro desde: 17/01/2008<br>Última vez online: online', image: 'https://cdn.discordapp.com/attachments/1144268636027101247/1181720072222416957/image.png?ex=65821594&is=656fa094&hm=a89c28ba2d2a65fdd9d74f8be77acc347f549cf3198a997f9f5cea95176f99ea&' },
        { id: 6, nome: 'ihha', descrição: 'Membro desde: 24/08/2003<br>Última vez online: 47 segundos', image: 'https://cdn.discordapp.com/attachments/1144268636027101247/1181717472643129424/IMG_20231205_190309.jpg?ex=65821328&is=656f9e28&hm=0073b5730f89025f66973f483be7f2cf4aee95ded815b96a1cf4b4ca5b13d310&/250/250' },
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
                <div class="amigo-details">
                    <h2 contenteditable="true">${amigo.nome}</h2>
                    <p>${amigo.descrição}</p>
                </div>
            `;

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
