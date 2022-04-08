const form = document.getElementById('form');

form.onsubmit = submit;

async function submit(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('credentials-error');

    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    const formData = {
        usernameLogin: username,
        passwordLogin: password,
    };

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    }).catch(e => console.log(e));

    const data = await response.json();

    if (data.message) {
        message.innerHTML = data.message;
    } else if (data.location) {
        window.location.href = data.location;
    };
};