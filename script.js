/**
 * Garvit Bohara Portfolio - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select Elements
    const burger = document.querySelector('.burger');
    const navContainer = document.querySelector('.navbar-container');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    /**
     * Mobile Navigation Toggle
     */
    const toggleMenu = () => {
        const isActive = navContainer.classList.toggle('nav-active');
        burger.setAttribute('aria-expanded', isActive);

        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    };

    burger.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer.classList.contains('nav-active')) {
                toggleMenu();
            }
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navContainer.classList.contains('nav-active')) {
            toggleMenu();
        }
    });

    /**
     * Intersection Observer for Scroll Reveal
     */
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once revealed
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-reveal').forEach(section => {
            revealObserver.observe(section);
        });
    } else {
        // Immediately activate all if reduced motion is preferred
        document.querySelectorAll('.section-reveal').forEach(section => {
            section.classList.add('active');
        });
    }

    /**
     * Handle Window Resize
     */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navContainer.classList.contains('nav-active')) {
            navContainer.classList.remove('nav-active');
            document.body.style.overflow = 'auto';
            burger.setAttribute('aria-expanded', 'false');
        }
    });
});
