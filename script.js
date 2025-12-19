document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Logic
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');
            grids.forEach(grid => grid.classList.add('hidden'));
            
            const target = tab.getAttribute('data-shelf');
            const targetGrid = document.getElementById(`${target}-grid`);
            if (targetGrid) targetGrid.classList.remove('hidden');

            const labels = {
                'books': '131 BOOKS',
                'movies': '42 MOVIES',
                'travel': '12 LOCATIONS',
                'essays': '6 ESSAYS'
            };
            itemCount.innerText = labels[target] || "";
            
            // Clear search when switching tabs
            document.getElementById('shelf-search').value = "";
            applySearch(""); 
        });
    });

    // 2. Search Logic (The Fix)
    const searchInput = document.getElementById('shelf-search');

    function applySearch(query) {
        const searchTerm = query.toLowerCase();
        // Look at all items across all grids
        const items = document.querySelectorAll('.shelf-item');

        items.forEach(item => {
            // Get text from data attributes (Title and Description)
            const title = (item.getAttribute('data-title') || "").toLowerCase();
            const desc = (item.getAttribute('data-description') || "").toLowerCase();

            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                item.style.display = ""; // Show item
            } else {
                item.style.display = "none"; // Hide item
            }
        });
    }

    // Listen for every keystroke
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            applySearch(e.target.value);
        });
    }

    // 3. Modal (Pop-up) Logic
    const modal = document.getElementById('details-modal');
    const modalImg = document.getElementById('modal-img');
    const modalImgContainer = document.getElementById('modal-img-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeBtn = document.getElementById('close-modal');

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.shelf-item');
        if (item) {
            const img = item.querySelector('img');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-description');

            if (img) {
                modalImg.src = img.src;
                modalImgContainer.style.display = 'block';
            } else {
                modalImgContainer.style.display = 'none'; 
            }

            modalTitle.innerText = title || "Untitled";
            modalDesc.innerText = desc || "No description available.";
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; 
        }
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});
