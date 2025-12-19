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
            
            // Reset filters when switching tabs so all items in that category show up
            applyFilter('all'); 
        });
    });

    // 2. Modal (Pop-up) Logic
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
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // 3. Updated Filtering Logic (Fixed Core Selection)
    const filterAllBtn = document.getElementById('filter-all');
    const filterCoreBtn = document.getElementById('filter-core');

    function applyFilter(filterType) {
        const allItems = document.querySelectorAll('.shelf-item');
        
        allItems.forEach(item => {
            // FIX: Check for the specific DIV that holds the symbol
            const coreIndicator = item.querySelector('.absolute.top-2.right-2');
            const isCore = coreIndicator !== null;

            if (filterType === 'core') {
                if (isCore) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            } else {
                item.style.display = 'block';
            }
        });

        // Update button UI states
        if (filterType === 'core') {
            filterCoreBtn.classList.add('bg-[#2d5a27]', 'text-white');
            filterCoreBtn.classList.remove('border');
            filterAllBtn.classList.remove('bg-[#2d5a27]', 'text-white');
            filterAllBtn.classList.add('border', 'border-[#2d5a27]');
        } else {
            filterAllBtn.classList.add('bg-[#2d5a27]', 'text-white');
            filterAllBtn.classList.remove('border');
            filterCoreBtn.classList.remove('bg-[#2d5a27]', 'text-white');
            filterCoreBtn.classList.add('border', 'border-[#2d5a27]');
        }
    }

    if(filterAllBtn) filterAllBtn.addEventListener('click', () => applyFilter('all'));
    if(filterCoreBtn) filterCoreBtn.addEventListener('click', () => applyFilter('core'));
});
