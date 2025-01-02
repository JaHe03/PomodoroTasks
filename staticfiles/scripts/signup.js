document.getElementById('submitSignUpBtn').addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await signUpFetch(email, password);
});
