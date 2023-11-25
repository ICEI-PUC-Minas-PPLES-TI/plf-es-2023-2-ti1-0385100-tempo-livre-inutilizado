function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h2').innerText.toLowerCase();
        const answer = item.querySelector('.answer').innerText.toLowerCase();
        const containsKeyword = question.includes(searchInput) || answer.includes(searchInput);

        if (containsKeyword) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}