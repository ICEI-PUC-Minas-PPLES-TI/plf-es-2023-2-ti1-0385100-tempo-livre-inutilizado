function toggleAnswer(id) {
    const answer = document.getElementById(`answer${id}`);
    answer.style.display = (answer.style.display === 'none') ? 'block' : 'none';
}