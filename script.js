// Verifica si el formulario de usuario existe (Alta new users)
const formUsuario = document.getElementById("enviarForm");
if (formUsuario) {
  formUsuario.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se envíe el formulario por defecto

    // Obtener valores de los campos
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("contrasena").value.trim();

    // Verificación básica de formato de email
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   document.getElementById("error-envio").innerText =
    //     "Por favor ingrese un correo electrónico válido.";
    //   return;
    // }
    // Verificación de campos vacíos
    if (name === "" || email === "" || password === "") {
      document.getElementById("error-envio").innerText =
        "Todos los campos deben estar completos.";
      return;
    }

    localStorage.setItem("usuario", name);

    // Si todo está correcto, redirigir a inicio.html
    window.location.href = "inicio.html";
  });
}

// //     tarea.remove();
// //}
//  Verifica si el formulario de tareas existe (Tablero Kanban)
const mostrarFormularioBtn = document.getElementById("mostrar-formulario");
if (mostrarFormularioBtn) {
  mostrarFormularioBtn.addEventListener("click", function () {
    document.getElementById("formulario").style.display = "block";
  });

  document
    .getElementById("formulario")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const nombreTarea = document.getElementById("nombre").value;
      const fechaTarea = document.getElementById("fecha-tarea").value;
      const horaTarea = document.getElementById("hora-tarea").value;
      const responsableTarea =
        document.getElementById("responsable-tarea").value;
      const prioridadTarea = document.getElementById("prioridad-tarea").value;
      if (
        nombreTarea === "" ||
        fechaTarea === "" ||
        horaTarea === "" ||
        responsableTarea === ""
      ) {
        document.getElementById("error-mensaje").style.display = "block";
        return;
      }

      document.getElementById("error-mensaje").style.display = "none";

      // Crear nueva tarea en la lista de tareas en proceso
      const nuevaTarea = document.createElement("div");
      nuevaTarea.classList.add("tarea-contenedor");
      nuevaTarea.innerHTML = `
             <p><strong>Tarea:</strong> <span class="tarea-nombre">${nombreTarea}</span></p>
             <p><strong>Fecha:</strong> <span class="tarea-fecha">${fechaTarea}</span></p>
             <p><strong>Hora:</strong> <span class="tarea-hora">${horaTarea}</span></p>
             <p><strong>Responsable:</strong> <span class="tarea-responsable">${responsableTarea}</span></p>
             <p><strong>Prioridad:</strong> <span class="tarea-prioridad">${prioridadTarea}</span></p>

         `;

      // Botón para finalizar la tarea
      const botonFinalizar = document.createElement("button");
      botonFinalizar.textContent = "Finalizar Tarea";
      botonFinalizar.classList.add("finalizar-tarea");
      botonFinalizar.addEventListener("click", function () {
        finalizarTarea(nuevaTarea);
      });

      // Botón para editar la tarea
      const botonEditar = document.createElement("button");
      botonEditar.textContent = "Editar Tarea";
      botonEditar.classList.add("editar-tarea");
      botonEditar.addEventListener("click", function () {
        editarTarea(nuevaTarea);
      });

      nuevaTarea.appendChild(botonFinalizar);
      nuevaTarea.appendChild(botonEditar);
      document.getElementById("lista-tareas").appendChild(nuevaTarea);

      // Limpiar el formulario
      document.getElementById("formulario").reset();
      document.getElementById("formulario").style.display = "none";
    });
}

// Función para editar la tarea
function editarTarea(tarea) {
  const nombreActual = tarea.querySelector(".tarea-nombre").textContent;
  const fechaActual = tarea.querySelector(".tarea-fecha").textContent;
  const horaActual = tarea.querySelector(".tarea-hora").textContent;
  const responsableActual =
    tarea.querySelector(".tarea-responsable").textContent;

  // Rellenar el formulario con los valores actuales de la tarea
  document.getElementById("nombre").value = nombreActual;
  document.getElementById("fecha-tarea").value = fechaActual;
  document.getElementById("hora-tarea").value = horaActual;
  document.getElementById("responsable-tarea").value = responsableActual;

  // Mostrar el formulario para editar
  document.getElementById("formulario").style.display = "block";

  // Cambiar el comportamiento del botón de añadir para que actualice la tarea en lugar de crear una nueva
  const form = document.getElementById("formulario");
  form.onsubmit = function (event) {
    event.preventDefault();

    // Actualizar los datos de la tarea
    tarea.querySelector(".tarea-nombre").textContent =
      document.getElementById("nombre").value;
    tarea.querySelector(".tarea-fecha").textContent =
      document.getElementById("fecha-tarea").value;
    tarea.querySelector(".tarea-hora").textContent =
      document.getElementById("hora-tarea").value;
    tarea.querySelector(".tarea-responsable").textContent =
      document.getElementById("responsable-tarea").value;

    // Ocultar el formulario y resetear
    document.getElementById("formulario").reset();
    document.getElementById("formulario").style.display = "none";

    // Restaurar el comportamiento original del formulario
    form.onsubmit = null;
  };
}

function finalizarTarea(tarea) {
  const tareaFinalizada = tarea.cloneNode(true);
  tareaFinalizada.removeChild(tareaFinalizada.lastChild); // Remover el botón de "Finalizar Tarea"
  tareaFinalizada.removeChild(tareaFinalizada.lastChild); // Remover el botón de "Editar Tarea"

  // Añadir una clase para marcar que es una tarea finalizada
  tareaFinalizada.classList.add("tarea-finalizada");

  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar Tarea";
  botonEliminar.classList.add("eliminar-tarea");
  botonEliminar.addEventListener("click", function () {
    tareaFinalizada.remove();
  });

  tareaFinalizada.appendChild(botonEliminar);
  document.getElementById("fin-tareas").appendChild(tareaFinalizada);

  tarea.remove();
}
function editarTarea(tarea) {
  // Obtener los elementos de la tarea actual para editar
  const tareaNombre = tarea.querySelector(".tarea-nombre");
  const tareaFecha = tarea.querySelector(".tarea-fecha");
  const tareaHora = tarea.querySelector(".tarea-hora");
  const tareaResponsable = tarea.querySelector(".tarea-responsable");
  const tareaPrioridad = tarea.querySelector(".tarea-prioridad");
  // Pide al usuario que introduzca nuevos valores (puedes usar prompts, inputs o un modal personalizado)
  const nuevoNombre = prompt(
    "Editar nombre de la tarea:",
    tareaNombre.textContent
  );
  const nuevaFecha = prompt(
    "Editar fecha de la tarea:",
    tareaFecha.textContent
  );
  const nuevaHora = prompt("Editar hora de la tarea:", tareaHora.textContent);
  const nuevoResponsable = prompt(
    "Editar responsable de la tarea:",
    tareaResponsable.textContent
  );
  const nuevaPrioridad = prompt(
    "Editar prioridad de la tarea:",
    tareaPrioridad.textContent
  );
  // Actualiza los valores si se ha proporcionado nueva información
  if (nuevoNombre) tareaNombre.textContent = nuevoNombre;
  if (nuevaFecha) tareaFecha.textContent = nuevaFecha;
  if (nuevaHora) tareaHora.textContent = nuevaHora;
  if (nuevoResponsable) tareaResponsable.textContent = nuevoResponsable;
  if (nuevaPrioridad) tareaPrioridad.textContent = nuevaPrioridad;
}

// Mostrar nombre del usuario en inicio.html
window.onload = function () {
  const usuario = localStorage.getItem("usuario");
  if (usuario) {
    // Usuario encontrado, mostrar su nombre
    const usuarioLoginDiv = document.getElementById("usuario-login");
    usuarioLoginDiv.innerHTML = `
             <span>Bienvenido, ${usuario}</span>
             <button id="cerrar-sesion">Cerrar Sesión</button>
         `;

    const cerrarSesionBtn = document.getElementById("cerrar-sesion");
    cerrarSesionBtn.addEventListener("click", function () {
      localStorage.removeItem("usuario");
      window.location.href = "altausuario.html"; // Redirigir al formulario de alta
    });
  } else {
    // No hay usuario, pero primero verificar si estamos ya en la página de altausuario.html
    const currentPage = window.location.pathname;
    if (!currentPage.includes("altausuario.html")) {
      // Si no estamos en la página de altausuario.html, redirigir allí
      window.location.href = "altausuario.html";
    }
  }
};

// // Verifica si el formulario de usuario existe (Alta new users)
// const formUsuario = document.getElementById('enviarForm');
// if (formUsuario) {
//     formUsuario.addEventListener('submit', function(event) {
//         event.preventDefault(); // Evita que se envíe el formulario por defecto

//         // Obtener valores de los campos
//         const name = document.getElementById('name').value.trim();
//         const email = document.getElementById('email').value.trim();
//         const password = document.getElementById('contrasena').value.trim();

//         // Verificación de campos vacíos
//         if (name === '' || email === '' || password === '') {
//             document.getElementById('error-envio').innerText = 'Todos los campos deben estar completos.';
//             return;
//         }

//         // Verificación básica de formato de email
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             document.getElementById('error-envio').innerText = 'Por favor ingrese un correo electrónico válido.';
//             return;
//         }

//         localStorage.setItem('usuario', name);

//         // Si todo está correcto, redirigir a inicio.html
//         window.location.href = 'inicio.html';
//     });
// }

// // Verifica si el formulario de tareas existe (Tablero Kanban)
// const mostrarFormularioBtn = document.getElementById('mostrar-formulario');
// let tareas = []; // Array para almacenar las tareas

// if (mostrarFormularioBtn) {
//     mostrarFormularioBtn.addEventListener('click', function() {
//         document.getElementById('formulario').style.display = 'block';
//     });

//     document.getElementById('formulario').addEventListener('submit', function(event) {
//         event.preventDefault();

//         const nombreTarea = document.getElementById('nombre').value;
//         const fechaTarea = document.getElementById('fecha-tarea').value;
//         const horaTarea = document.getElementById('hora-tarea').value;
//         const responsableTarea = document.getElementById('responsable-tarea').value;
//         const prioridadTarea = document.getElementById('prioridad-tarea').value;

//         if (nombreTarea === '' || fechaTarea === '' || horaTarea === '' || responsableTarea === '') {
//             document.getElementById('error-mensaje').style.display = 'block';
//             return;
//         }

//         document.getElementById('error-mensaje').style.display = 'none';

//         // Crear un objeto para la nueva tarea
//         const nuevaTarea = {
//             nombre: nombreTarea,
//             fecha: fechaTarea,
//             hora: horaTarea,
//             responsable: responsableTarea,
//             prioridad: prioridadTarea,
//             estado: "en proceso" // Agregar estado para facilitar la gestión
//         };

//         // Agregar tarea a la lista
//         tareas.push(nuevaTarea);
//         mostrarTareasEnDOM(tareas, 'lista-tareas'); // Mostrar tareas

//         // Limpiar el formulario
//         document.getElementById('formulario').reset();
//         document.getElementById('formulario').style.display = 'none';
//     });
// }

// // Función para ordenar tareas por prioridad
// function ordenarTareasPorPrioridad(tareas) {
//     const prioridades = { "alta": 1, "media": 2, "baja": 3 };

//     return tareas.sort((a, b) => {
//         return prioridades[a.prioridad] - prioridades[b.prioridad];
//     });
// }

// // Función para mostrar tareas en el DOM
// function mostrarTareasEnDOM(tareas, contenedorId) {
//     const contenedor = document.getElementById(contenedorId);
//     contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas tareas

//     const tareasOrdenadas = ordenarTareasPorPrioridad(tareas);

//     tareasOrdenadas.forEach(tarea => {
//         const tareaElement = document.createElement("div");
//         tareaElement.classList.add('tarea-contenedor');
//         tareaElement.innerHTML = `
//             <p><strong>Tarea:</strong> <span class="tarea-nombre">${tarea.nombre}</span></p>
//             <p><strong>Fecha:</strong> <span class="tarea-fecha">${tarea.fecha}</span></p>
//             <p><strong>Hora:</strong> <span class="tarea-hora">${tarea.hora}</span></p>
//             <p><strong>Responsable:</strong> <span class="tarea-responsable">${tarea.responsable}</span></p>
//             <p><strong>Prioridad:</strong> <span class="tarea-prioridad">${tarea.prioridad}</span></p>
//         `;

//         // Botón para finalizar la tarea
//         const botonFinalizar = document.createElement('button');
//         botonFinalizar.textContent = 'Finalizar Tarea';
//         botonFinalizar.classList.add('finalizar-tarea');
//         botonFinalizar.addEventListener('click', function() {
//             finalizarTarea(tareaElement);
//         });

//         const botonEditar = document.createElement('button');
//         botonEditar.textContent = 'Editar Tarea';
//         botonEditar.classList.add('editar-tarea');
//         botonEditar.addEventListener('click', function() {
//             editarTarea(tareaElement);
//         });

//         tareaElement.appendChild(botonFinalizar);
//         tareaElement.appendChild(botonEditar);
//         contenedor.appendChild(tareaElement);
//     });
// }

// // Función para finalizar una tarea
// function finalizarTarea(tarea) {
//     const tareaFinalizada = tarea.cloneNode(true);
//     tareaFinalizada.removeChild(tareaFinalizada.lastChild); // Remover el botón de "Finalizar Tarea"
//     tareaFinalizada.removeChild(tareaFinalizada.lastChild); // Remover el botón de "Editar Tarea"

//     // Añadir una clase para marcar que es una tarea finalizada
//     tareaFinalizada.classList.add('tarea-finalizada');

//     const botonEliminar = document.createElement('button');
//     botonEliminar.textContent = 'Eliminar Tarea';
//     botonEliminar.classList.add('eliminar-tarea');
//     botonEliminar.addEventListener('click', function() {
//         tareaFinalizada.remove();
//     });

//     tareaFinalizada.appendChild(botonEliminar);
//     document.getElementById('fin-tareas').appendChild(tareaFinalizada);

//     tarea.remove();
// }

// // Función para editar la tarea
// function editarTarea(tarea) {
//     const nombreActual = tarea.querySelector('.tarea-nombre').textContent;
//     const fechaActual = tarea.querySelector('.tarea-fecha').textContent;
//     const horaActual = tarea.querySelector('.tarea-hora').textContent;
//     const responsableActual = tarea.querySelector('.tarea-responsable').textContent;
//     const prioridadActual = tarea.querySelector('.tarea-prioridad').textContent;

//     // Rellenar el formulario con los valores actuales de la tarea
//     document.getElementById('nombre').value = nombreActual;
//     document.getElementById('fecha-tarea').value = fechaActual;
//     document.getElementById('hora-tarea').value = horaActual;
//     document.getElementById('responsable-tarea').value = responsableActual;
//     document.getElementById('prioridad-tarea').value = prioridadActual;

//     // Mostrar el formulario para editar
//     document.getElementById('formulario').style.display = 'block';

//     // Cambiar el comportamiento del botón de añadir para que actualice la tarea en lugar de crear una nueva
//     const form = document.getElementById('formulario');
//     form.onsubmit = function(event) {
//         event.preventDefault();

//         // Actualizar los datos de la tarea
//         tarea.querySelector('.tarea-nombre').textContent = document.getElementById('nombre').value;
//         tarea.querySelector('.tarea-fecha').textContent = document.getElementById('fecha-tarea').value;
//         tarea.querySelector('.tarea-hora').textContent = document.getElementById('hora-tarea').value;
//         tarea.querySelector('.tarea-responsable').textContent = document.getElementById('responsable-tarea').value;
//         tarea.querySelector('.tarea-prioridad').textContent = document.getElementById('prioridad-tarea').value;

//         // Ocultar el formulario y resetear
//         document.getElementById('formulario').reset();
//         document.getElementById('formulario').style.display = 'none';

//         // Restaurar el comportamiento original del formulario
//         form.onsubmit = null;

//         // Reordenar y mostrar nuevamente las tareas
//         mostrarTareasEnDOM(tareas, 'lista-tareas');
//     };
// }

// // Mostrar nombre del usuario en inicio.html
// window.onload = function() {
//     const usuario = localStorage.getItem('usuario');

//     if (usuario) {
//         // Usuario encontrado, mostrar su nombre
//         const usuarioLoginDiv = document.getElementById('usuario-login');

//         usuarioLoginDiv.innerHTML = `
//             <span>Bienvenido, ${usuario}</span>
//             <button id="cerrar-sesion">Cerrar Sesión</button>
//         `;

//         const cerrarSesionBtn = document.getElementById('cerrar-sesion');
//         cerrarSesionBtn.addEventListener('click', function() {
//             localStorage.removeItem('usuario');
//         })
//     }}
