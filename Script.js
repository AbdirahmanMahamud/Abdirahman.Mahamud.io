document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('book-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('close-modal');
    const bookCards = document.querySelectorAll('.book-card');

    bookCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');
            
            modalBody.innerHTML = `
                <h2 class="text-xl font-bold uppercase mb-4">${title}</h2>
                <p class="text-sm leading-relaxed">${desc}</p>
            `;
            modal.classList.remove('hidden');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close modal on background click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});
