function openNav() {
    const sidebar = document.getElementById("leftSidebar");
    sidebar.style.display = "block"; // Ensure display is block on open
    setTimeout(() => {
        sidebar.classList.remove("closed");
    }, 10); // Slight delay for smooth transition
}

function closeNav() {
    const sidebar = document.getElementById("leftSidebar");
    sidebar.classList.add("closed");
    setTimeout(() => {
        sidebar.style.display = "none"; // Hide after transition
    }, 500); // Match this delay to CSS transition time
}

export { openNav, closeNav };
