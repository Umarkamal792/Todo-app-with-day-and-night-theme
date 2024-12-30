// < ===== Theme toggle logic ===== >

const toggle = document.getElementById('toggleTheme');
const body = document.body;
const toggleLabel = document.getElementById('toggleLabel');
const container = document.getElementById('container');

function enableDarkMode() {
    body.style.backgroundColor = '#191919';
    body.style.color = '#fff';
    container.style.backgroundColor = '#333';
    toggleLabel.textContent = '🌙 Dark Mode';
    localStorage.setItem('theme', 'dark');
}

function enableLightMode() {
    body.style.backgroundColor = '#f4f4f4';
    body.style.color = '#000';
    container.style.backgroundColor = '#fffee9ba';
    toggleLabel.textContent = '🌞 Light Mode';
    localStorage.setItem('theme', 'light');
}

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggle.checked = true;
        enableDarkMode();
    } else {
        enableLightMode();
    }
});
