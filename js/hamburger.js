// Handler for Hamburger

const navLinks = document.querySelector('.nav-links');

function onToggleMenu(e) {
  e.name = e.name === 'menu' ? 'close' : 'menu';
  navLinks.classList.toggle('top-[9%]');
}

// Get all link elements inside .nav-links
const links = navLinks.querySelectorAll('a');

// Add click event listener to each link
links.forEach(link => {
  link.addEventListener('click', () => {
    // Call onToggleMenu to close the menu
    onToggleMenu({ name: 'close' });
  });
});