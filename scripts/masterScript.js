const form = document.getElementById('form');
const message = document.getElementById('message');
const success = document.getElementById('success');

form.onsubmit = submit;

async function submit(e) {
    e.preventDefault();

    const username = document.getElementById('newUserUsername').value;
    const email = document.getElementById('newUserEmail').value;

    const formData = {
        newUserUsername: username,
        newUserEmail: email,
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
    };

    const response = await fetch('http://localhost:8080/master', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    }).catch(e => console.log(e));

    const data = await response.json();

    if (data.message !== 'Success') {
        message.innerHTML = data.message;
    } else if (data.message === 'Success') {
        success.innerHTML = data.message;
    };
};