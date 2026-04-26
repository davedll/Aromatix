document.addEventListener('DOMContentLoaded', () => {
    // 1. Rock-Solid Smooth Scrolling for internal links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId === '#' ? 'body' : targetId);
                if (targetElement) {
                    const navHeight = 80;
                    const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Bento Item Hover Effects (Dynamic tilt)
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Subtle 3D tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            item.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
        });
    });

    const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, revealOptions);

    const elementsToReveal = document.querySelectorAll('.hero-content, .bento-item, .trusted-worldwide, .product-card');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });
});
