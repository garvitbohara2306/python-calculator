const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Toggle navigation menu with dynamic label
const toggleMenu = () => {
    const isActive = navLinks.classList.toggle('active');
    burger.setAttribute('aria-expanded', isActive);

    // Update label based on state
    burger.setAttribute('aria-label', isActive ? 'Close navigation menu' : 'Open navigation menu');
};

burger.addEventListener('click', toggleMenu);

// Close menu with Esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
        burger.focus();
    }
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Handle window resize to clean up active class
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open navigation menu');
    }
});
