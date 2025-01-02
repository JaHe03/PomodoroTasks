const body = document.body;
const themes = {
    light: 'light-mode',
    dark: 'dark-mode',
    default: 'default-mode'
};

// Function to set the theme based on the selected option
function setTheme(theme) {
    body.classList.remove(...Object.values(themes)); // Remove all theme classes

    if (themes[theme]) {
        body.classList.add(themes[theme]); // Add the selected theme class
    }
}

// Attach an event listener to the dropdown
const themeDropdown = document.getElementById('themeDropdown');
themeDropdown.addEventListener('change', (event) => {
    const selectedTheme = event.target.value; // Get the selected value
    setTheme(selectedTheme); // Apply the theme
});

export { setTheme };
