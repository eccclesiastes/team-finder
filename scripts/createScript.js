const create = document.getElementById('create-form');
const update = document.getElementById('update-form');
const createButton = document.getElementById('create');
const updateButton = document.getElementById('update');
const createForm = document.getElementById('formCr');
const updateForm = document.getElementById('formUp');
const error = document.getElementById('error');
const success = document.getElementById('success');

const createClick = () => {
    update.hidden = true;
    createButton.hidden = true;
    create.hidden = false;
    updateButton.hidden = false;
    error.innerHTML = '';
    success.innerHTML = '';
};

const updateClick = () => {
    create.hidden = true;
    updateButton.hidden = true;
    update.hidden = false;
    createButton.hidden = false;
    error.innerHTML = '';
    success.innerHTML = '';
};

createButton.addEventListener('click', createClick);
updateButton.addEventListener('click', updateClick);

createForm.onsubmit = createSubmit;
updateForm.onsubmit = updateSubmit;

async function createSubmit(e) {
    e.preventDefault();

    const formData = {
        createName: document.getElementById('createName').value,
        cexperience: document.getElementById('cexperience').value,
        cqualifications: document.getElementById('cqualifications').value,
        cyear_joined: document.getElementById('cyear_joined').value,
        clocation: document.getElementById('clocation').value,
        cou: document.getElementById('cou').value,
        ccontact_info: document.getElementById('ccontact_info').value,
        cgrade: document.getElementById('cgrade').value,
        cskills: document.getElementById('cskills').value,
        ccurrent_project: document.getElementById('ccurrent_project').value,
        cavailability: document.getElementById('cavailability').value,
        cprofile_pic: document.getElementById('cprofile_pic').value,
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
    };

    const response = await fetch('http://localhost:8080/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    }).catch(e => console.log(e));

    const data = await response.json();

    if (data.message !== 'Success') {
        error.innerHTML = data.message;
    } else if (data.message === 'Success') {
        success.innerHTML = data.message;
    };
};

async function updateSubmit(e) {
    e.preventDefault();

    const formData = {
        updateName: document.getElementById('updateName').value,
        uexperience: document.getElementById('uexperience').value,
        uqualifications: document.getElementById('uqualifications').value,
        uyear_joined: document.getElementById('uyear_joined').value,
        ulocation: document.getElementById('ulocation').value,
        uou: document.getElementById('uou').value,
        ucontact_info: document.getElementById('ucontact_info').value,
        ugrade: document.getElementById('ugrade').value,
        uskills: document.getElementById('uskills').value,
        ucurrent_project: document.getElementById('ucurrent_project').value,
        uavailability: document.getElementById('uavailability').value,
        uprofile_pic: document.getElementById('uprofile_pic').value,
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password'),
    };

    const response = await fetch('http://localhost:8080/create', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    }).catch(e => console.log(e));

    const data = await response.json();

    if (data.message !== 'Success') {
        error.innerHTML = data.message;
    } else if (data.message === 'Success') {
        success.innerHTML = data.message;
    };
};