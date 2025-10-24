// Select DOM elements
const bodyElement = document.querySelector("body");
const navbar = document.querySelector("#cs-navigation");
const navbarMenu = document.getElementById("cs-expanded");
const hamburgerToggle = document.querySelector("#cs-navigation .cs-toggle");

const maxWidthMobileMediaQuery = window.matchMedia("(max-width: 63.9375rem)");

// Function to toggle the aria-expanded attribute - utility function
function toggleAriaExpanded(element) {
  const isExpanded = element.getAttribute("aria-expanded");
  element.setAttribute(
    "aria-expanded",
    isExpanded === "false" ? "true" : "false"
  );
}

// Function to toggle let screen reader know it is hidden from DOM. aira-hidden - utility function
function toggleAriaHidden(element) {
  const isHidden = element.getAttribute("aria-hidden");
  element.setAttribute("aria-hidden", isHidden === "false" ? "true" : "false");
}

// Function to toggle the navbar menu open or closed
function toggleMenu() {
  hamburgerToggle.classList.toggle("cs-active");
  navbar.classList.toggle("cs-active");
  bodyElement.classList.toggle("cs-open");

  toggleAriaHidden(navbarMenu);
  toggleAriaExpanded(hamburgerToggle);
}

// Add click event listener to the hamburger menu
hamburgerToggle.addEventListener("click", toggleMenu);

// Add click event listener to the navbar menu to handle clicks on the pseudo-element
navbar.addEventListener("click", function (event) {
  if (event.target === navbar && navbar.classList.contains("cs-active")) {
    toggleMenu();
  }
});

// Function to handle dropdown toggle
function toggleDropdown(element) {
  const dropdownButton = element.querySelector(".cs-dropdown-button");
  const dropdownMenu = element.querySelector(
    ".cs-dropdown-button ~ .cs-drop-ul"
  );

  toggleAriaHidden(dropdownMenu);
  toggleAriaExpanded(dropdownButton);

  element.classList.toggle("cs-active");
}

// Add event listeners to each dropdown element for accessibility
const dropdownElements = document.querySelectorAll(".cs-dropdown");
dropdownElements.forEach((element) => {
  element.addEventListener("focusout", function (event) {
    // if its active and we exit outside of focus close dropdown menu
    if (!element.contains(event.relatedTarget)) {
      if (element.classList.contains("cs-active")) {
        toggleDropdown(element);
      }
    }
  });

  // we are no longer allowing click events to open the menu as we are on desktop. We only allow hover and keyboard navigation
  element.addEventListener("keydown", function (event) {
    // prevents hamburger menu from closing
    if (element.classList.contains("cs-active")) {
      event.stopPropagation();
    }

    // Pressing Enter or Space will toggle the dropdown and adjust the aria-expanded attribute
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown(element);
    }

    // Pressing Escape will remove the active class from the dropdown. The stopPropagation above will stop the hamburger menu from closing
    if (event.key === "Escape") {
      toggleDropdown(element);
      // jump focus back to where it was before we close menu or browser can't find focus as element does not have a tab index
      const button = element.querySelector(".cs-dropdown-button");
      button.focus();
    }
  });

  // add onclick event but only have it activate when we are on mobile
  element.addEventListener("click", function () {
    if (maxWidthMobileMediaQuery.matches) {
      toggleDropdown(element);
    }
  });
});

// Toggle at breakpoint becuase we automatically open and close the menu depending on screen size
maxWidthMobileMediaQuery.addEventListener("change", function () {
  toggleAriaHidden(navbarMenu);
  toggleAriaExpanded(hamburgerToggle);
});

// Find current screen width of window size on document load so we know whether or not to added aria-hidden and aira-expand with the navbar menu
document.addEventListener("DOMContentLoaded", function () {
  // we are on desktop open the menu
  if (!maxWidthMobileMediaQuery.matches) {
    toggleAriaHidden(navbarMenu);
    toggleAriaExpanded(hamburgerToggle);
  }
});

// Pressing Enter will redirect to the href
const dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
dropdownLinks.forEach((link) => {
  link.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      window.location.href = this.href;
    }
  });
});

// If you press Escape and the hamburger menu is open, close it
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    hamburgerToggle.classList.contains("cs-active")
  ) {
    toggleMenu();
    hamburgerToggle.focus();
  }
});
