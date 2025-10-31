//
//    The Dark Mode System
//

// Get the button element once to avoid repeated DOM lookups
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Helper functions to toggle dark mode
function enableDarkMode() {
	document.body.classList.add("dark-mode");
	localStorage.setItem("theme", "dark");
	// Update aria-pressed state
	if (darkModeToggle) {
		// Defensive check: ensure button exists
		darkModeToggle.setAttribute("aria-pressed", "true");
	}
}

function disableDarkMode() {
	document.body.classList.remove("dark-mode");
	localStorage.setItem("theme", "light");
	// Update aria-pressed state
	if (darkModeToggle) {
		// Defensive check: ensure button exists
		darkModeToggle.setAttribute("aria-pressed", "false");
	}
}

// Determines a user's dark mode preferences and applies theme
function detectColorScheme() {
	let theme = "light"; // Default to light theme

	// 1. Check localStorage for a saved 'theme' preference
	if (localStorage.getItem("theme")) {
		theme = localStorage.getItem("theme");
	}
	// 2. If no saved preference, check browser's system preference
	else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		theme = "dark";
	}

	// Apply the detected theme and set the initial aria-pressed state
	theme === "dark" ? enableDarkMode() : disableDarkMode();
}

// Run on page load to detect and apply the theme
detectColorScheme();

// Add event listener to the dark mode button toggle
if (darkModeToggle) {
	// Defensive check: ensure button exists before attaching listener
	darkModeToggle.addEventListener("click", () => {
		// On click, toggle the theme based on the current saved value
		localStorage.getItem("theme") === "light" ? enableDarkMode() : disableDarkMode();
	});
}
