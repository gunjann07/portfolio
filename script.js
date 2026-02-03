document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarElement = document.querySelector('.navbar');
                const navHeight = navbarElement ? navbarElement.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(155, 143, 182, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    const SCROLL_REVEAL_OPTIONS = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, SCROLL_REVEAL_OPTIONS);
    
    const elementsToAnimate = document.querySelectorAll('.project-card, .service-card, .process-step, .campaign-block');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Image lazy loading
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('lazy-loading');
                img.onload = () => {
                    img.classList.remove('lazy-loading');
                    img.classList.add('lazy-loaded');
                };
                if (img.complete) {
                    img.classList.remove('lazy-loading');
                    img.classList.add('lazy-loaded');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    function handleMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        const existingButton = document.querySelector('.mobile-menu-button');

        if (window.innerWidth <= 768) {
            if (navContainer && navMenu && !existingButton) {
                const menuButton = document.createElement('button');
                menuButton.className = 'mobile-menu-button';
                menuButton.innerHTML = '☰';
                menuButton.style.cssText = 'background: none; border: none; font-size: 1.8rem; color: var(--color-primary-dark); cursor: pointer; padding: 0.5rem;';
                navContainer.appendChild(menuButton);
            menuButton.addEventListener('click', () => {
                if (navMenu.style.display === 'flex') {
                    navMenu.style.display = 'none';
                    menuButton.innerHTML = '☰';
                } else {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.right = '0';
                    navMenu.style.background = 'white';
                    navMenu.style.padding = '2rem';
                    navMenu.style.boxShadow = '0 4px 20px rgba(155, 143, 182, 0.15)';
                    menuButton.innerHTML = '✕';
                }
            });

            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.style.display = 'none';
                    menuButton.innerHTML = '☰';
                });
            });
        }
    } else if (existingButton) {
        existingButton.remove();
        navMenu.style.display = '';
    }
}

handleMobileMenu();
window.addEventListener('resize', handleMobileMenu);

if (document.body) {
    document.body.classList.add('loaded');
}
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #9B8FB6; font-weight: bold;');
});