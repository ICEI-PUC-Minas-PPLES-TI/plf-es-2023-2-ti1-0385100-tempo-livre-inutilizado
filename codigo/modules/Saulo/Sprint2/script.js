document.addEventListener("DOMContentLoaded", function () {
    const nextPageButton = document.getElementById('nextPageButton');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    nextPageButton.addEventListener('click', function () {
        const selectedActivities = Array.from(checkboxes).filter(checkbox => checkbox.checked);

        if (selectedActivities.length > 0) {
            localStorage.setItem('selectedActivities', JSON.stringify(selectedActivities.map(activity => activity.id)));
            window.location.href = 'segunda.html';
        } else {
            alert('Selecione pelo menos uma atividade antes de prosseguir.');
        }
    });
});
