
function confirmLogout() {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "/logout";  // Redirect to the logout page
    }
}

export { confirmLogout };