// Get references to the hamburger icon and the navigation links
const hamburger = document.getElementById('hamburger-icon');
const navLinks = document.getElementById('main-nav-links');
const header = document.querySelector('header'); // Get the header element

// Function to toggle the mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active'); // Add or remove the 'active' class on the navigation links
    header.classList.toggle('menu-open'); // Add or remove 'menu-open' class on the header
    document.body.classList.toggle('no-scroll'); // Optional: Prevent scrolling when menu is open
}

// Add a click listener to the hamburger icon
hamburger.addEventListener('click', toggleMobileMenu);

// Optional: Close menu when a link is clicked (useful for single-page sites or if you want it to close after navigation)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu(); // Close the menu if it's open
        }
    });
});

// Optional: Close menu if the user clicks outside of it (for larger screens or desktop views when menu is open)
document.addEventListener('click', (event) => {
    // Check if the clicked element is not inside the navLinks or hamburger
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// Remove 'active' and 'menu-open' classes if screen size changes (e.g., user resizes desktop browser)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        header.classList.remove('menu-open');
        document.body.classList.remove('no-scroll');
    }
});