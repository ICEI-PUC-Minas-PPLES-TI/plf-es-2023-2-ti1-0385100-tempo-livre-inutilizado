document.addEventListener("DOMContentLoaded", function () {
    const selectedActivitiesContainer = document.getElementById('selected-activities');
    const activityDescriptionsContainer = document.getElementById('activity-descriptions');

    let selectedActivities = JSON.parse(localStorage.getItem('selectedActivities')) || [];

    const activitiesDatabase = {
        activity1: {
            nome: 'Yoga',
            descrição: 'Uma atividade relaxante que melhora a flexibilidade e o equilíbrio.',
            image: 'https://cdn.discordapp.com/attachments/1148393338404356126/1165694166873940028/pexels-editor-belal-3150250_1.jpg?ex=6547c84a&is=6535534a&hm=f4746269ad1e05a2d1d4c48775294d437124b41fdc7e0bc4342e7ae7d6956730&/',
        },
        activity2: {
            nome: 'Correr',
            descrição: 'Uma atividade aeróbica que queima calorias e fortalece os músculos.',
            image: 'https://cdn.discordapp.com/attachments/1148393338404356126/1165694514208440320/pexels-cottonbro-studio-7026522_1.jpg?ex=6547c89d&is=6535539d&hm=01d929a600573218f4cbf7f8e312f3c1d0330f7074195548848d5b13acaab20d&/',
        },
        activity3: {
            nome: 'Passear',
            descrição: 'Uma maneira agradável de explorar a natureza, se acalmar e relaxar.',
            image: 'https://cdn.discordapp.com/attachments/1148393338404356126/1165698566342320208/pexels-sebastian-voortman-214574_1.jpg?ex=6547cc63&is=65355763&hm=35473418c2c4497120d2afa720006e4128eac39f4c181ce39c64362c6fded95e&',
        },
        activity4: {
            nome: 'Nadar',
            descrição: 'Um esporte que trabalha todos os grupos musculares e melhora a resistência.',
            image: 'https://cdn.discordapp.com/attachments/1148393338404356126/1165701182614941827/pexels-mali-maeder-87831_1.jpg?ex=6547ced3&is=653559d3&hm=2e1319c45d30177a867ab2fd02f3a584b72dc0feeffe277071a76f7944fb753d&',
        },
        activity5: {
            nome: 'Pintura',
            descrição: 'Uma forma criativa de se expressar, relaxar a mente e liberar o estresse.',
            image: 'https://cdn.discordapp.com/attachments/1148393338404356126/1165699684438913245/pexels-steve-johnson-1047540_1.jpg?ex=6547cd6e&is=6535586e&hm=5b0a6a7ce653091635f899b337f01a07d286b8df484a07df7f976ea38d9cc5eb&',
        },
        activity6: {
            nome: 'Cozinhar',
            descrição: 'Uma habilidade culinária que permite preparar deliciosas refeições em casa.',
            image: 'https://cdn.discordapp.com/attachments/1148393338404356126/1165700347864555532/pexels-vaibhav-jadhav-3218467_1.jpg?ex=6547ce0c&is=6535590c&hm=4a9cec194f519076f0acd0ffe3df7b4450e8a75a5eb09dd9677d31910767f5f0&',
        }
    };

    function renderSelectedActivities() {
        selectedActivitiesContainer.innerHTML = '';

        selectedActivities.forEach(activityId => {
            const activity = activitiesDatabase[activityId];

            if (activity) {
                const activityDiv = document.createElement('div');
                activityDiv.classList.add('selected-activity');
                activityDiv.innerHTML = `
                    <img src="${activity.image}" alt="Imagem da atividade">
                    <h2>${activity.nome}</h2>
                    <p>${activity.descrição}</p>
                    <button class="remove-button" data-id="${activityId}">Remover</button>
                    <button class="edit-button" data-id="${activityId}">Editar</button>
                `;

                activityDiv.querySelector('.remove-button').addEventListener('click', (e) => {
                    const activityIdToRemove = e.target.getAttribute('data-id');
                    removeActivity(activityIdToRemove);
                });

                activityDiv.querySelector('.edit-button').addEventListener('click', (e) => {
                    const activityIdToEdit = e.target.getAttribute('data-id');
                    editActivity(activityIdToEdit);
                });

                selectedActivitiesContainer.appendChild(activityDiv);
            }
        });
    }

    function removeActivity(activityId) {
        const index = selectedActivities.indexOf(activityId);
        if (index !== -1) {
            selectedActivities.splice(index, 1);
            saveSelectedActivitiesToLocalStorage();
            renderSelectedActivities();
        }
    }

    function editActivity(activityId) {
        const newActivityName = prompt('Digite o novo nome da atividade:');
        if (newActivityName) {
            const activity = activitiesDatabase[activityId];
            if (activity) {
                activity.nome = newActivityName;
                saveSelectedActivitiesToLocalStorage();
                renderSelectedActivities();
            }
        }
    }

    function saveSelectedActivitiesToLocalStorage() {
        localStorage.setItem('selectedActivities', JSON.stringify(selectedActivities));
    }

    renderSelectedActivities();
});
