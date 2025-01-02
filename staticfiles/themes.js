const body = document.body;
const themes = {
    light: 'light-mode',
    dark: 'dark-mode',
    default: 'default-mode'
};

// Function to set the theme based on the button clicked
function setTheme(theme) {
    body.classList.remove(...Object.values(themes));

    if (themes[theme]) {
        body.classList.add(themes[theme]);
    }
};

export { setTheme };