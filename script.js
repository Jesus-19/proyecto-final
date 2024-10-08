

// Verifica si el formulario de usuario existe (Alta new users)
const formUsuario = document.getElementById('enviarForm');
if (formUsuario) {
    formUsuario.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto
    
        // Obtener valores de los campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('contrasena').value.trim();
        
        // Verificación de campos vacíos
        if (name === '' || email === '' || password === '') {
            document.getElementById('error-envio').innerText = 'Todos los campos deben estar completos.';
            return;
        }
    
        // Verificación básica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('error-envio').innerText = 'Por favor ingrese un correo electrónico válido.';
            return;
        }
        
        localStorage.setItem('usuario', name);

        // Si todo está correcto, redirigir a inicio.html
        window.location.href = 'inicio.html';
    });
}

// Verifica si el formulario de tareas existe (Tablero Kanban)
const mostrarFormularioBtn = document.getElementById('mostrar-formulario');
if (mostrarFormularioBtn) {
    mostrarFormularioBtn.addEventListener('click', function() {
        document.getElementById('formulario').style.display = 'block';
    });

    document.getElementById('formulario').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombreTarea = document.getElementById('nombre').value;
        const fechaTarea = document.getElementById('fecha-tarea').value;
        const horaTarea = document.getElementById('hora-tarea').value;
        const responsableTarea = document.getElementById('responsable-tarea').value;
        
        if (nombreTarea === '' || fechaTarea === '' || horaTarea === '' || responsableTarea === '') {
            document.getElementById('error-mensaje').style.display = 'block';
            return;
        }

        document.getElementById('error-mensaje').style.display = 'none';
        
        // Crear nueva tarea en la lista de tareas en proceso
        const nuevaTarea = document.createElement('div');
        nuevaTarea.classList.add('tarea-contenedor');
        nuevaTarea.innerHTML = `
            <p>Tarea: ${nombreTarea}</p>
            <p>Fecha: ${fechaTarea}</p>
            <p>Hora: ${horaTarea}</p>
            <p>Responsable: ${responsableTarea}</p>
        `;
        
        // Botón para finalizar la tarea
        const botonFinalizar = document.createElement('button');
        botonFinalizar.textContent = 'Finalizar Tarea';
        botonFinalizar.classList.add('finalizar-tarea');
        botonFinalizar.addEventListener('click', function() {
            finalizarTarea(nuevaTarea);
        });
        
        nuevaTarea.appendChild(botonFinalizar);
        document.getElementById('lista-tareas').appendChild(nuevaTarea);
        
        // Limpiar el formulario
        document.getElementById('formulario').reset();
        document.getElementById('formulario').style.display = 'none';
    });
}

function finalizarTarea(tarea) {
    const tareaFinalizada = tarea.cloneNode(true);
    tareaFinalizada.removeChild(tareaFinalizada.lastChild); // Remover el botón de "Finalizar Tarea"

    // Añadir una clase para marcar que es una tarea finalizada
    tareaFinalizada.classList.add('tarea-finalizada');

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar Tarea';
    botonEliminar.classList.add('eliminar-tarea');
    botonEliminar.addEventListener('click', function() {
        tareaFinalizada.remove();
    });

    tareaFinalizada.appendChild(botonEliminar);
    document.getElementById('fin-tareas').appendChild(tareaFinalizada);
    
    tarea.remove();
}
// Mostrar nombre del usuario en inicio.html
window.onload = function() {
    const usuario = localStorage.getItem('usuario');
    
    if (usuario) {
        const usuarioLoginDiv = document.getElementById('usuario-login');
        
        usuarioLoginDiv.innerHTML = `
            <span>Bienvenido, ${usuario}</span>
            <button id="cerrar-sesion">Cerrar Sesión</button>
        `;
        
        const cerrarSesionBtn = document.getElementById('cerrar-sesion');
        cerrarSesionBtn.addEventListener('click', function() {
            localStorage.removeItem('usuario');
            window.location.href = 'altausuario.html';
        });
    } else {
        // Si no hay usuario, redirigir a altausuario.html
        window.location.href = 'altausuario.html';
    }
}
