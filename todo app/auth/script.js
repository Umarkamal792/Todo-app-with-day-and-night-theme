// < ===== Generates IDs For User ===== >

function generateRandomId() {
    return Math.floor(Math.random() * 100);
}

// < ===== Generates IDs with increment ===== >

function getNextUserId(userRecord) {
    var maxId = userRecord.reduce((max, user) => Math.max(max, user.id), 0);
    return maxId + 1;
}

// < ===== signup form Functionality ===== >

function saveData() {
    var name, email, password;
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    if (password.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Password Error',
            text: 'Password must be at least 6 characters long.',
        });
        return false;
    }

    if (name === "" || email === "" || password === "") {
        Swal.fire({
            icon: 'error',
            title: 'Input fields must be filled.',
            text: 'Name, Email, and Password cannot be empty.',
        });
        return false;
    }

    var user_record = JSON.parse(localStorage.getItem("user")) || [];

    var isFirstUser = user_record.length === 0;

    var userId = isFirstUser ? generateRandomId() : getNextUserId(user_record);

    if (user_record.some((v) => v.email === email)) {
        Swal.fire({
            icon: 'error',
            title: 'Credentials Error',
            text: 'Email Already Exists!',
        });
    } else {
        user_record.push({
            id: userId,
            name: name,
            email: email,
            password: password
        });

        Swal.fire({
            icon: 'success',
            title: 'Sign up successfully',
            text: 'Your account has been created.',
        }).then(function () {
            localStorage.setItem("user", JSON.stringify(user_record));
            window.location.href = "login.html";
        });
    }
    return false;
}

// < ===== login form Functionality ===== >

function login() {
    var email, password;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    var user_record = JSON.parse(localStorage.getItem("user")) || [];
    var currentUser = user_record.find(function (v) {
        return v.email === email && v.password === password;
    });

    if (currentUser) {
        Swal.fire({
            icon: 'success',
            title: 'Login Successfully',
            text: 'Welcome...!',
        }).then(function () {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location.href = "./todo list/todo.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid Credentials...!',
        });
    }
    return false;
}

// < ===== Theme toggle logic ===== >

const toggle = document.getElementById('toggleTheme');
const body = document.body;
const navbar = document.querySelector('.navbar');
const toggleLabel = document.getElementById('toggleLabel');
const h1 = document.querySelector('h1'); 

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        body.classList.add('dark-theme');
        navbar.classList.add('dark-theme');
        toggleLabel.textContent = '🌙 Dark Mode';
        h1.style.color = '#fff'; 
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        navbar.classList.remove('dark-theme');
        toggleLabel.textContent = '🌞 Light Mode';
        h1.style.color = '#000'; 
        localStorage.setItem('theme', 'light');
    }
});

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggle.checked = true;
        body.classList.add('dark-theme');
        navbar.classList.add('dark-theme');
        toggleLabel.textContent = '🌙 Dark Mode';
        h1.style.color = '#fff'; 
    }
});
