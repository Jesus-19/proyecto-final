
    document.getElementById('enviarForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto
    
        // Obtener valores de los campos
        const name = document.getElementById('name').value.trim();
        const apellidos = document.getElementById('apellido').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('contrasena').value.trim();
        
        // Verificación de campos vacíos
        if (name === '' || apellidos === '' || email === '' || password === '') {
            document.getElementById('error-envio').innerText = 'Todos los campos deben estar completos.';
            return; // Detener el proceso si los campos están vacíos
        }
    
        // Verificación básica de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('error-envio').innerText = 'Por favor ingrese un correo electrónico válido.';
            return; // Detener el proceso si el email no es válido
        }
    
        // Si todos los campos están correctos, redirigir a inicio.html
        window.location.href = 'inicio.html';
    });

 document.getElementById('mostrar-formulario').addEventListener('click', function() {
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
    const nuevaTarea = document.createElement('li');
    nuevaTarea.textContent = `Nombre: ${nombreTarea} - Fecha: ${fechaTarea} - Hora: ${horaTarea} - Responsable: ${responsableTarea}`;
    
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

function finalizarTarea(tarea) {
    // Mover la tarea a la lista de tareas finalizadas
    const tareaFinalizada = tarea.cloneNode(true);
    tareaFinalizada.removeChild(tareaFinalizada.lastChild); // Remover el botón de "Finalizar Tarea"

    // Añadir botón de eliminar a la tarea finalizada
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar Tarea';
    botonEliminar.classList.add('eliminar-tarea');
    botonEliminar.addEventListener('click', function() {
        tareaFinalizada.remove();
    });
    
    tareaFinalizada.appendChild(botonEliminar);
    document.getElementById('fin-tareas').appendChild(tareaFinalizada);
    
    // Eliminar la tarea de la lista en proceso
    tarea.remove();
}
