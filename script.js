document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const dynamicContent = document.getElementById('dynamic-content');

    const collapseBtn = document.createElement('button');
    collapseBtn.className = 'collapse-btn';
    collapseBtn.innerHTML = '←';
    document.querySelector('.logo').appendChild(collapseBtn);

    collapseBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', async (event) => {
            const contentId = item.getAttribute('data-content');
            const parent = item.parentElement;
            const hasSubmenu = parent.querySelector('ul');

            if (hasSubmenu) {
                event.preventDefault();
                parent.classList.toggle('active');
            } else {
                event.preventDefault();
                try {
                    dynamicContent.innerHTML = contentData[contentId] || '<p>Contenido no encontrado.</p>';
                } catch (error) {
                    console.error('Error al cargar el contenido:', error);
                    dynamicContent.innerHTML = '<p>Error al cargar el contenido.</p>';
                }

                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target) &&
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});