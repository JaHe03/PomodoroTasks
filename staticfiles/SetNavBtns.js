function openNavSettings() {
    const sidebarSettings = document.getElementById("leftSidebar");
    sidebarSettings.style.display = "block"; // Ensure display is block on open
    setTimeout(() => {
        sidebarSettings.classList.remove("closed");
    }, 10); // Slight delay for smooth transition
}

function closeNavSettings() {
    const sidebarSettings = document.getElementById("leftSidebar");
    sidebarSettings.classList.add("closed");
    setTimeout(() => {
        sidebarSettings.style.display = "none"; // Hide after transition
    }, 500); // Match this delay to CSS transition time
}


function openNavTask() {
    const sidebarTask = document.getElementById("rightSidebar");
    sidebarTask.style.display = "block"; // Ensure display is block on open
    setTimeout(() => {
        sidebarTask.classList.remove("closed");
    }, 10); // Slight delay for smooth transition
}

function closeNavTask() {
    const sidebarTask = document.getElementById("rightSidebar");
    sidebarTask.classList.add("closed");
    setTimeout(() => {
        sidebarTask.style.display = "none"; // Hide after transition
    }, 500); // Match this delay to CSS transition time
}

export { openNavSettings, openNavTask, closeNavSettings, closeNavTask };
