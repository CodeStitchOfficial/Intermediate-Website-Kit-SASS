//
//    The Dark Mode System
//

// helper functions to toggle dark mode
function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
}
function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
}

// determines a new users dark mode preferences
function detectColorScheme() {
    // default to the light theme
    let theme = "light";

    // check localStorage for a saved 'theme' variable. if it's there, the user has visited before, so apply the necessary theme choices
    if (localStorage.getItem("theme")) {
        theme = localStorage.getItem("theme");
    }
    // if it's not there, check to see if the user has applied dark mode preferences themselves in the browser
    else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        theme = "dark";
    }

    // if there is no preference set, the default of light will be used. apply accordingly
    theme === "dark" ? enableDarkMode() : disableDarkMode();
}

// run on page load
detectColorScheme();

// add event listener to the dark mode button toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
    // on click, check localStorage for the dark mode value, use to apply the opposite of what's saved
    localStorage.getItem("theme") === "light"
        ? enableDarkMode()
        : disableDarkMode();
});
