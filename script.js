// =====================================================
// SMOOTH SCROLL & NAVIGATION
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // =====================================================
    // NAVBAR SCROLL EFFECT
    // =====================================================
    
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(155, 143, 182, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    
    // =====================================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe case studies
    const caseStudies = document.querySelectorAll('.case-study');
    caseStudies.forEach((study, index) => {
        study.style.opacity = '0';
        study.style.transform = 'translateY(30px)';
        study.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        study.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(study);
    });
    
    // Observe approach steps
    const steps = document.querySelectorAll('.approach-step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        step.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(step);
    });
    
    
    // =====================================================
    // IMAGE LAZY LOADING WITH FADE-IN
    // =====================================================
    
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease-in';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    
    // =====================================================
    // MOBILE MENU TOGGLE
    // =====================================================
    
    // Create mobile menu button if needed
    if (window.innerWidth <= 768) {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navContainer && navMenu) {
            const menuButton = document.createElement('button');
            menuButton.className = 'mobile-menu-button';
            menuButton.innerHTML = '☰';
            menuButton.style.cssText = `
                background: none;
                border: none;
                font-size: 1.8rem;
                color: var(--color-primary-dark);
                cursor: pointer;
                padding: 0.5rem;
            `;
            
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
            
            // Close menu when clicking a link
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.style.display = 'none';
                    menuButton.innerHTML = '☰';
                });
            });
        }
    }
    
    
    // =====================================================
    // SMOOTH HOVER EFFECTS
    // =====================================================
    
    // Add hover effect to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    
    // =====================================================
    // CONSOLE MESSAGE
    // =====================================================
    
    console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #9B8FB6; font-weight: bold;');
    console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #7968A0;');
    
});


// =====================================================
// PAGE LOAD
// =====================================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});


// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}