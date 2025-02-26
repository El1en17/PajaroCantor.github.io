function redirectToAdminPage(event) {
    event.preventDefault(); // Evita el envío del formulario
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Verificación básica del email y contraseña
    if (email === 'ofsqueletonsektor@gmail.com' && password === '1234567890') {
        window.location.href = 'admin_dashboard.html'; // Redirige a la página del administrador
    } else if (email === 'ofsqueleton@gmail.com' && password === '12341234') {
        window.location.href = 'dashboard_docente.html'; // Redirige a la página del docente
    } else {
        alert('Credenciales incorrectas. Por favor, intente de nuevo.');
    }
}

function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function registerUser (event) {
    event.preventDefault(); // Evita el envío del formulario
    const regEmail = document.querySelector('input[name="reg_email"]').value;
    const regPassword = document.querySelector('input[name="reg_password"]').value;

    // Aquí deberías agregar la lógica para registrar al usuario
    alert(`Usuario registrado con éxito: ${regEmail}. Tu contraseña es: ${regPassword}`);
    // Limpiar los campos del formulario de registro
    document.querySelector('input[name="reg_email"]').value = '';
    document.querySelector('input[name="reg_password"]').value = '';
    // Volver al formulario de inicio de sesión
    toggleForms();
}