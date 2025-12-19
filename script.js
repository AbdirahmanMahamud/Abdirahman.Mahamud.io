document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 1. Update underline on buttons
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');

            // 2. Hide ALL grids first
            grids.forEach(grid => {
                grid.classList.add('hidden');
            });
            
            // 3. Show ONLY the one clicked
            const target = tab.getAttribute('data-shelf');
            const targetGrid = document.getElementById(`${target}-grid`);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
            }

            // 4. Update the label text
            const labels = {
                'books': '131 BOOKS',
                'movies': '42 MOVIES',
                'travel': '12 LOCATIONS',
                'essays': '6 ESSAYS'
            };
            itemCount.innerText = labels[target] || "";
        });
    });
});
