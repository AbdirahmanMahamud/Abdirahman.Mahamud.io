document.addEventListener('DOMContentLoaded', () => {
    // 1. Element Selectors
    const tabs = document.querySelectorAll('.nav-tab');
    const grids = document.querySelectorAll('.shelf-content');
    const itemCount = document.getElementById('item-count');
    const searchInput = document.getElementById('shelf-search');
    const filterAllBtn = document.getElementById('filter-all');
    const filterCoreBtn = document.getElementById('filter-core');

    let currentMode = 'all'; // Track if we are in 'all' or 'core' mode

    // 2. The Unified Filter Engine (Search + Core)
    function runFilters() {
        const query = searchInput.value.toLowerCase();
        const activeTab = document.querySelector('.nav-tab-active').getAttribute('data-shelf');
        const activeGrid = document.getElementById(`${activeTab}-grid`);
        
        // Target items in the active grid OR the writing section if applicable
        const items = activeGrid ? activeGrid.querySelectorAll('.shelf-item') : document.querySelectorAll('#writing-section .shelf-item');

        let visibleCount = 0;

        items.forEach(item => {
            const title = (item.getAttribute('data-title') || "").toLowerCase();
            const desc = (item.getAttribute('data-description') || "").toLowerCase();
            
            // Check for core symbol div
            const isCore = item.querySelector('.absolute.top-2.right-2') !== null;

            const matchesSearch = title.includes(query) || desc.includes(query);
            const matchesCoreFilter = (currentMode === 'all') || (currentMode === 'core' && isCore);

            if (matchesSearch && matchesCoreFilter) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Update the count display
        if (itemCount) {
            itemCount.innerText = `${visibleCount} ${activeTab.toUpperCase()}`;
        }
    }

    // 3. Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('nav-tab-active'));
            tab.classList.add('nav-tab-active');
            grids.forEach(grid => grid.classList.add('hidden'));
            
            const target = tab.getAttribute('data-shelf');
            const targetGrid = document.getElementById(`${target}-grid`);
            if (targetGrid) targetGrid.classList.remove('hidden');

            // Reset search on tab change
            searchInput.value = "";
            runFilters();
        });
    });

    // 4. Search Input Listener
    searchInput.addEventListener('input', runFilters);

    // 5. Core Filter Button Logic
    filterAllBtn.addEventListener('click', () => {
        currentMode = 'all';
        filterAllBtn.classList.add('bg-[#2d5a27]', 'text-white');
        filterAllBtn.classList.remove('border');
        filterCoreBtn.classList.remove('bg-[#2d5a27]', 'text-white');
        filterCoreBtn.classList.add('border', 'border-[#2d5a27]');
        runFilters();
    });

    filterCoreBtn.addEventListener('click', () => {
        currentMode = 'core';
        filterCoreBtn.classList.add('bg-[#2d5a27]', 'text-white');
        filterCoreBtn.classList.remove('border');
        filterAllBtn.classList.remove('bg-[#2d5a27]', 'text-white');
        filterAllBtn.classList.add('border', 'border-[#2d5a27]');
        runFilters();
    });

    // 6. Modal (Pop-up) Logic
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

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    
    // Initial run to set count
    runFilters();
});
