document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Move the active styling (the thick underline)
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');

            // Hide all categories
            grids.forEach(grid => grid.classList.add('hidden'));
            
            // Show only the one we clicked
            const target = tab.getAttribute('data-shelf');
            const targetGrid = document.getElementById(`${target}-grid`);
            if (targetGrid) {
                targetGrid.classList.remove('hidden');
            }

            // Update the text label for the count
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
