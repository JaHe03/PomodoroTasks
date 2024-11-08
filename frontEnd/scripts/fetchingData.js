async function loginFetch() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login/', { 
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token }}'  // CSRF token
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            console.log('Login successful');
        }
        else {
            console.log('Login failed');
        }
    } catch (error) { 
        console.error('Login failed:', error);
    }
}

async function signupPost() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/local/signup', { 
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token }}'  // CSRF token
        },
        body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.success) {
            console.log('signup successful');
            window.location.href = '/login/';
        }
        else {
            console.log('Signup failed');
        }
    } catch (error) {
        console.error('Signup failed:', error);
    }
}
