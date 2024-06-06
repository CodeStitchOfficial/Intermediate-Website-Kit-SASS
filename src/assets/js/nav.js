var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

// Function to toggle the aria-expanded attribute between 'true' and 'false' for the supplied element
function ariaExpanded(element) {
    const isExpanded = element.getAttribute('aria-expanded');
    if (isExpanded === "false") {
        element.setAttribute('aria-expanded', 'true');
    } else {
        element.setAttribute('aria-expanded', 'false');
    };
};

// Function to toggle the hamburger menu open or closed
function toggleMenu() {
    CShamburgerMenu.classList.toggle('cs-active');
    CSnavbarMenu.classList.toggle('cs-active');
    CSbody.classList.toggle('cs-open');
    // run the function to check the aria-expanded value
    ariaExpanded(CShamburgerMenu);
}

// Clicking on the hamburger opens the menu
CShamburgerMenu.addEventListener('click', toggleMenu);

// Add event listener to the entire navigation header to handle clicks on the pseudo-element
CSnavbarMenu.addEventListener('click', function (event) {
    if (event.target === CSnavbarMenu && CSnavbarMenu.classList.contains('cs-active')) {
        toggleMenu();
    }
});

// Add event listeners to each navigation link so the navigation is closed when you click on internal anchor links
const navLinks = document.querySelectorAll('.cs-li-link');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (CSnavbarMenu.classList.contains('cs-active')) {
            toggleMenu();
        }
    });
});

// Add event listeners to each dropdown element for accessibility
const dropdownElements = document.querySelectorAll(".cs-dropdown");
dropdownElements.forEach(element => {
    element.addEventListener("focusout", function (event) {
        // If the focus has moved outside the dropdown, remove the active class from the dropdown and adjust aria-expanded attribute
        if (!element.contains(event.relatedTarget)) {
            element.classList.remove("cs-active");
            ariaExpanded(element);
        }
    });

    element.addEventListener("keydown", function (event) {
        // If the dropdown is active, stop the event from propagating. This is so we can use Escape to close the dropdown, then press it again to close the hamburger menu (if needed)
        if (element.classList.contains("cs-active")) {
            event.stopPropagation();
        }

        // Pressing Enter or Space will toggle the dropdown and adjust the aria-expanded attribute
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            element.classList.toggle("cs-active");
            ariaExpanded(element);
        };

        // Pressing Escape will remove the active class from the dropdown. The stopPropagation above will stop the hamburger menu from closing
        if (event.key === "Escape") {
            element.classList.remove("cs-active");
            ariaExpanded(element);
        }
    });
});

// If you press Escape and the hamburger menu is open, close it
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && CShamburgerMenu.classList.contains("cs-active")) {
        toggleMenu();
    }
});