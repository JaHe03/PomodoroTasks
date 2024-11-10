document.getElementById('submitLoginBtn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await loginFetch(email, password); // Pass email and password to loginFetch
});