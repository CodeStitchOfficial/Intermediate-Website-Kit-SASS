// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded(element) {
    const isExpanded = element.getAttribute('aria-expanded');
    if (isExpanded === "false") {
        element.setAttribute('aria-expanded', 'true');
    } else {
        element.setAttribute('aria-expanded', 'false');
    };
};

function toggleMenu() {
    CShamburgerMenu.classList.toggle('cs-active');
    CSnavbarMenu.classList.toggle('cs-active');
    CSbody.classList.toggle('cs-open');
    // run the function to check the aria-expanded value
    ariaExpanded(CShamburgerMenu);
}

const dropdownElements = document.querySelectorAll(".cs-dropdown");
dropdownElements.forEach(element => {
    element.addEventListener("focusin", function (event) {
        ariaExpanded(element);
    });

    element.addEventListener("focusout", function (event) {
        ariaExpanded(element);
    });
});

CShamburgerMenu.addEventListener('click', toggleMenu);
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && CShamburgerMenu.classList.contains("cs-active")) {
        toggleMenu();
    }
})

