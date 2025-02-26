let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

renderAllTables();

function showSection(sectionId, role = null) {
const sections = document.querySelectorAll('.section');
sections.forEach(section => section.classList.add('hidden')); // Oculta todas las secciones

document.getElementById(sectionId).classList.remove('hidden'); // Muestra la sección específica

// Si se pasa un rol, actualizar el select y los campos
if (role) {
document.getElementById('role').value = role;
toggleFields(); // Asegurar que los campos visibles correspondan al rol seleccionado
}
}



function renderAllTables() {
    renderTable('docentes');
    renderTable('tutores');
    renderTable('alumnos');
}

function renderTable(role) {
const tableBody = document.getElementById(role + 'Table');
tableBody.innerHTML = '';
const roleMap = { docentes: 'docente', tutores: 'tutor', alumnos: 'alumno' };
const filteredUsers = usuarios.filter(u => u.role === roleMap[role]);

// Ordenar los usuarios por nombre completo
filteredUsers.sort((a, b) => {
const nameA = `${a.nombre} ${a.primerApellido} ${a.segundoApellido || ''}`.trim().toLowerCase();
const nameB = `${b.nombre} ${b.primerApellido} ${b.segundoApellido || ''}`.trim().toLowerCase();
return nameA.localeCompare(nameB);
});

filteredUsers.forEach(u => {
const row = document.createElement('tr');

let rowHTML = '';
if (role === 'docentes') {
rowHTML = `
    <td>${u.nombre} ${u.primerApellido} ${u.segundoApellido || ''}</td>
    <td>${u.email || 'N/A'}</td>
    <td>${u.telefono || 'N/A'}</td>
    <td>${u.matricula || 'N/A'}</td>
    <td>
        <button onclick="openEditModal('${u.email}', '${role}')">Editar</button>
        <button onclick="removeUsuario('${u.email}')">Eliminar</button>
    </td>
`;
} else if (role === 'tutores') {
rowHTML = `
    <td>${u.nombre} ${u.primerApellido} ${u.segundoApellido || ''}</td>
    <td>${u.email || 'N/A'}</td>
    <td>${u.telefono || 'N/A'}</td>
    <td>${u.alumno || 'N/A'}</td>
    <td>
        <button onclick="openEditModal('${u.email}', '${role}')">Editar</button>
        <button onclick="removeUsuario('${u.email}')">Eliminar</button>
    </td>
`;
} else if (role === 'alumnos') {
rowHTML = `
    <td>${u.matricula || 'N/A'}</td>
    <td>${u.nombre} ${u.primerApellido} ${u.segundoApellido || ''}</td>
    <td>${u.grado || 'N/A'}</td>
    <td>${u.grupo || 'N/A'}</td>
    <td>
        <button onclick="openEditModal('${u.email}', '${role}')">Editar</button>
        <button onclick="removeUsuario('${u.email}')">Eliminar</button>
    </td>
`;
}

row.innerHTML = rowHTML;
tableBody.appendChild(row);
});

}
// Función para abrir el modal y rellenar los datos del usuario
function openEditModal(email, role) {
const user = usuarios.find(u => u.email === email);
if (!user) return;

// Rellenar los campos del formulario con los datos del usuario
document.getElementById('editName').value = `${user.nombre} ${user.primerApellido} ${user.segundoApellido || ''}`;
document.getElementById('editEmail').value = user.email;
document.getElementById('editTelephone').value = user.telefono; // Agregado para editar el teléfono
document.getElementById('editUser Id').value = user.email; // Asegúrate de que el ID sea correcto

// Mostrar el modal
document.getElementById('editModal').style.display = 'block';
}

document.getElementById('editUser Form').addEventListener('submit', function(e) {
e.preventDefault();

const email = document.getElementById('editUser Id').value; // Cambiado a 'editUser Id'
const name = document.getElementById('editName').value;
const newEmail = document.getElementById('editEmail').value;

// Actualizar el usuario en el array
const userIndex = usuarios.findIndex(u => u.email === email);
if (userIndex !== -1) {
usuarios[userIndex].nombre = name.split(' ')[0]; // Asumiendo que el nombre completo está en el campo
usuarios[userIndex].primerApellido = name.split(' ')[1]; // Asumiendo que el primer apellido está en el campo
usuarios[userIndex].email = newEmail;
}

// Guardar los cambios en localStorage
localStorage.setItem('usuarios', JSON.stringify(usuarios));

// Cerrar el modal
closeEditModal();
renderAllTables(); // Volver a renderizar las tablas para mostrar los cambios
});

// Función para cerrar el modal
function closeEditModal() {
document.getElementById('editModal').style.display = 'none';
}

// Manejar el envío del formulario
document.getElementById('editUser Form').addEventListener('submit', function(e) {
e.preventDefault();

const email = document.getElementById('editUser Id').value;
const name = document.getElementById('editName').value;
const newEmail = document.getElementById('editEmail').value;

// Actualizar el usuario en el array
const userIndex = usuarios.findIndex(u => u.email === email);
if (userIndex !== -1) {
usuarios[userIndex].nombre = name.split(' ')[0]; // Asumiendo que el nombre completo está en el campo
usuarios[userIndex].primerApellido = name.split(' ')[1]; // Asumiendo que el primer apellido está en el campo
usuarios[userIndex].email = newEmail;
}

// Guardar los cambios en localStorage
localStorage.setItem('usuarios', JSON.stringify(usuarios));

// Cerrar el modal
closeEditModal();
renderAllTables(); // Volver a renderizar las tablas para mostrar los cambios
});


filteredUsers.forEach(u => {
const row = document.createElement('tr');
row.innerHTML = `
    <td>${u.nombre} ${u.primerApellido} ${u.segundoApellido || ''}</td>
    <td>${u.email || 'N/A'}</td>
    <td>${u.telefono || 'N/A'}</td>
    ${role === 'docentes' ? `<td>${u.matricula || 'N/A'}</td>` : ''}
    <td>
        <button onclick="editUsuario('${u.email}', '${role}')">Editar</button>
        <button onclick="removeUsuario('${u.email}')">Eliminar</button>
    </td>
`;
tableBody.appendChild(row);
});

function editUsuario(email, role) {
    const user = usuarios.find(u => u.email === email);
    if (user) {
        user.nombre = prompt("Ingrese el nuevo nombre:", user.nombre);
        user.primerApellido = prompt("Ingrese el nuevo primer apellido:", user.primerApellido);
        user.segundoApellido = prompt("Ingrese el nuevo segundo apellido:", user.segundoApellido);
        user.telefono = prompt("Ingrese el nuevo teléfono:", user.telefono);
        if (role === 'docentes') {
            user.matricula = prompt("Ingrese la nueva matrícula SEP:", user.matricula);
        }
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderTable(role);
    }
}

function removeUsuario(email) {
    usuarios = usuarios.filter(u => u.email !== email);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    renderAllTables();
}

function toggleFields() {
    const role = document.getElementById('role').value;
    const fields = {
        matricula: document.querySelector('input[name="matricula"]'),
        grado: document.querySelector('input[name="grado"]'),
        grupo: document.querySelector('input[name="grupo"]'),
        primerApellido: document.querySelector('input[name="primer-apellido"]'),
        segundoApellido: document.querySelector('input[name="segundo-apellido"]'),
        email: document.querySelector('input[name="email"]'),
        telefono: document.querySelector('input[name="telefono"]'),
        contrasena: document.querySelector('input[name="contrasena"]')
    };
    for (let key in fields) fields[key].classList.add('hidden');
    if (role === 'docente') {
        fields.matricula.classList.remove('hidden');
        fields.email.classList.remove('hidden');
        fields.telefono.classList.remove('hidden');
        fields.contrasena.classList.remove('hidden');
        fields.primerApellido.classList.remove('hidden');
        fields.segundoApellido.classList.remove('hidden');
    } else if (role === 'tutor') {
        fields.email.classList.remove('hidden');
        fields.telefono.classList.remove('hidden');
        fields.contrasena.classList.remove('hidden');
        fields.primerApellido.classList.remove('hidden');
        fields.segundoApellido.classList.remove('hidden');
    } else if (role === 'alumno') {
        fields.matricula.classList.remove('hidden');
        fields.grado.classList.remove('hidden');
        fields.grupo.classList.remove('hidden');
        fields.primerApellido.classList.remove('hidden');
        fields.segundoApellido.classList.remove('hidden');
    }
}

function saveCredentials(event) {
    event.preventDefault();

    const role = document.getElementById('role').value;
    const nombre = document.querySelector('input[name="nombre"]').value;
    const primerApellido = document.querySelector('input[name="primer-apellido"]').value;

    if (!nombre || !primerApellido) {
        showError('Por favor, completa el nombre y el primer apellido.');
        return;
    }

    const segundoApellido = document.querySelector('input[name="segundo-apellido"]').value || null;
    const email = document.querySelector('input[name="email"]').value || null;
    const telefono = document.querySelector('input[name="telefono"]').value || null;
    const contrasena = document.querySelector('input[name="contrasena"]').value || null;
    const matricula = document.querySelector('input[name="matricula"]').value || null;
    const grado = document.querySelector('input[name="grado"]').value || null;
    const grupo = document.querySelector('input[name="grupo"]').value || null;

    // Validar campos requeridos según el rol
    if (role === 'docente' && (!email || !telefono || !contrasena || !matricula)) {
        showError('Por favor, completa todos los campos requeridos para el rol de Docente.');
        return;
    }
    if (role === 'tutor' && (!email || !telefono || !contrasena)) {
        showError('Por favor, completa todos los campos requeridos para el rol de Tutor.');
        return;
    }
    if (role === 'alumno' && (!matricula || !grado || !grupo)) {
        showError('Por favor, completa todos los campos requeridos para el rol de Alumno.');
        return;
    }

    try {
        usuarios.push({ role, nombre, primerApellido, segundoApellido, email, telefono, contrasena, matricula, grado, grupo });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Credenciales guardadas exitosamente.');
        renderAllTables();
        showSection('adminInfo'); // Regresar a la sección de inicio
    } catch (error) {
        showError('No se pudo guardar la información. Intenta nuevamente.');
    }
}

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllTables();
});

// Función para mostrar una sección específica y opcionalmente establecer el rol
function showSection(sectionId, role = null, userData = null) {
const sections = document.querySelectorAll('.section');
sections.forEach(section => section.classList.add('hidden'));
document.getElementById(sectionId).classList.remove('hidden');

// Si se pasa un rol, actualizar el select y los campos
if (role) {
document.getElementById('role').value = role;
toggleFields();
}

// Si se pasa userData, llenar el formulario con los datos del usuario
if (userData) {
document.getElementById('username').value = userData.username;
document.getElementById('email').value = userData.email;
document.getElementById('role').value = userData.role;
document.getElementById('password').value = userData.password;
toggleFields();
}
}

document.addEventListener("DOMContentLoaded", () => {
const editUserForm = document.getElementById("editUserForm");
const editModal = document.getElementById("editModal");

editUserForm.addEventListener("submit", (event) => {
event.preventDefault();
const id = document.getElementById("editUser Id").value;
const name = document.getElementById("editName").value;
const email = document.getElementById("editEmail").value;

// Actualizar el usuario en el array
const userIndex = usuarios.findIndex(u => u.email === id);
if (userIndex !== -1) {
usuarios[userIndex].nombre = name.split(' ')[0]; // Asumiendo que el nombre completo está en el campo
usuarios[userIndex].primerApellido = name.split(' ')[1]; // Asumiendo que el primer apellido está en el campo
usuarios[userIndex].email = email;
}

// Guardar los cambios en localStorage
localStorage.setItem('usuarios', JSON.stringify(usuarios));

// Cerrar el modal
closeEditModal();
renderAllTables(); // Volver a renderizar las tablas para mostrar los cambios
});

window.editUser = (id) => {
const user = users.find(user => user.id === id);
if (user) {
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editUserId").value = user.id;
    openEditModal();
}
};

function openEditModal() {
editModal.style.display = "block";
}

window.closeEditModal = () => {
editModal.style.display = "none";
};
});


// Simulación de edición de un usuario
function editUser(userId) {
// Obtener datos del usuario (puedes reemplazar esto con una consulta a la base de datos)
const userData = {
username: "EjemploUsuario",
email: "usuario@example.com",
role: "docente",
password: "123456"
};

showSection('addCredentials', userData.role, userData);
}
