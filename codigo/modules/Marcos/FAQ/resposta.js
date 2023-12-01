function toggleAnswer(id) {
    const answer = document.getElementById(`answer${id}`);
    const icon = document.getElementById(`icon${id}`);

    if (answer.style.display === 'none') {
        answer.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        document.getElementById(`question${id}`).classList.add('icon-visible');
    } else {
        answer.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        document.getElementById(`question${id}`).classList.remove('icon-visible');
    }
}