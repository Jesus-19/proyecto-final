const apiUrl = "http://localhost:3001";

function toggleForm() {
  document.getElementById("enviarForm").style.display =
    document.getElementById("enviarForm").style.display === "none"
      ? "flex"
      : "none";
  document.getElementById("registrarse").style.display =
    document.getElementById("registrarse").style.display === "none"
      ? "flex"
      : "none";
}

// Registrarse
document
  .getElementById("registrarse")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regContrasena").value;

    if (!email || !password || !nombre) {
      document.getElementById("error-registrarse").innerText =
        "Por favor, complete todos los campos.";
      return;
    }

    fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(
            data.message ||
              "Usuario registrado exitosamente. Ahora puedes iniciar sesión."
          );
          document.getElementById("regName").value = "";
          document.getElementById("regEmail").value = "";
          document.getElementById("regContrasena").value = "";
          document.getElementById("registrarse").style.display = "none";
          document.getElementById("enviarForm").style.display = "flex";
        } else {
          console.log(
            "register-message",
            data.message || "Error al registrar el usuario."
          );
        }
      })
      .catch((err) => {
        console.log(err || "Error al registrar el usuario.");
      });
  });

// Login
document
  .getElementById("enviarForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("logEmail").value.trim();
    const password = document.getElementById("logContrasena").value.trim();

    if (!email || !password) {
      document.getElementById("error-login").innerText =
        "Por favor, complete todos los campos.";
      return;
    }

    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data));
          console.log("Inicio de sesión exitoso");

          document.getElementById("login").style.display = "none";
          document.getElementById("paginaTareas").style.display = "block";
          document.getElementById("usuarioNombre").innerText = data.nombre;

          loadTasks();
        } else {
          document.getElementById("error-login").innerText =
            "Usuario o contraseña incorrectos.";
        }
      })
      .catch((err) => {
        console.error(err);
        document.getElementById("error-login").innerText =
          "Ocurrió un error, intente nuevamente.";
      });
  });

window.addEventListener("load", () => {
  const userData = localStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);

    document.getElementById("login").style.display = "none";
    document.getElementById("paginaTareas").style.display = "block";
    document.getElementById("usuarioNombre").innerText = user.nombre;

    loadTasks();
  } else {
    document.getElementById("login").style.display = "flex";
    document.getElementById("paginaTareas").style.display = "none";
  }
});

function logOut() {
  localStorage.removeItem("user");
  document.getElementById("login").style.display = "flex";
  document.getElementById("paginaTareas").style.display = "none";
  document.getElementById("usuarioNombre").innerText = "";
}

// Crear o editar tarea

function toggleOpenForm() {
  document.getElementById("formulario").style.display = 
    document.getElementById("formulario").style.display === "block"
      ? "none"
      : "block";
}

document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const estado = document.getElementById("estado").value;
    const id_hijo = document.getElementById("hijo").value;
    // Verificamos si estamos actualizando una tarea existente
    const isEditing =
      document.getElementById("formulario").dataset.editing;
    const submitButton = document.getElementById("button-crear");

    // if (isEditing) {
    //   // Si estamos editando, enviamos la solicitud PUT
    //   const taskId = document.getElementById("formulario").dataset.taskId;
    //   fetch(`${apiUrl}/tareas/${taskId}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ titulo, descripcion, estado }),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.message) {
    //         loadTasks(); // Recargar las tareas después de actualizar una
    //         clearForm();
    //         submitButton.textContent = "Crear tarea"; // Restablecer el texto del botón
    //       }
    //     });
    // } else {
      // Si estamos creando, enviamos la solicitud POST
      fetch(`${apiUrl}/tareas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ titulo, descripcion, estado, id_hijo }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.message) {
            loadTasks(); // Recargar las tareas después de crear una nueva
            clearForm();
          }
        });
    }
);

// Cargar tareas
function loadTasks() {
  fetch(`${apiUrl}/tareas`)
    .then((response) => response.json())
    .then((data) => {

      const arrProceso = data.filter(item => item.estado === "en proceso");
      const arrFinalizadas = data.filter(item => item.estado === "finalizada");

      const tareasProceso = document.getElementById("lista-proceso");
       tareasProceso.innerHTML = "";

       const tareasFinalizadas = document.getElementById("fin-tareas");
       tareasFinalizadas.innerHTML = "";

      arrProceso.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span>${task.titulo} - ${task.estado}</span>
          <button onclick="deleteTask(${task.id_tarea})">Eliminar</button>
          <button onclick="editTask(${task.id_tarea}, '${task.titulo}', '${task.descripcion}', '${task.estado}')">Editar</button>
        `;
        tareasProceso.appendChild(taskItem);
      });
      arrFinalizadas.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span>${task.titulo} - ${task.estado}</span>
          <button onclick="deleteTask(${task.id_tarea})">Eliminar</button>
          <button onclick="editTask(${task.id_tarea}, '${task.titulo}', '${task.descripcion}', '${task.estado}')">Editar</button>
        `;
        tareasFinalizadas.appendChild(taskItem);
      });
    });
}

 // Eliminar tarea
  function deleteTask(id) {
    fetch(`${apiUrl}/tareas/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
        loadTasks(); // Recargar las tareas después de eliminar una
       
        }
      });
  }

// // Editar tarea
 function editTask(id_tarea, titulo, descripcion, estado) {
   // Mostrar formulario de edición con los datos actuales
   document.getElementById("titulo").value = titulo;
   document.getElementById("descripcion").value = descripcion;
   document.getElementById("estado").value = estado;

   // Cambiar el formulario a modo de edición
   const form = document.getElementById("formulario");
   form.dataset.editing = true; // Marcamos que estamos editando
   form.dataset.taskId = id_tarea; // Guardamos el id de la tarea a editar

   // Cambiar el texto del botón de "Crear tarea" a "Editar tarea"
   const submitButton = document.getElementById("button-crear");
   submitButton.textContent = "Editar tarea"; // Cambiar texto del botón
 }

// Limpiar el formulario y desmarcar el modo de edición
function clearForm() {
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("estado").value = "";
  const form = document.getElementById("formulario");
  form.removeAttribute("data-editing");
  form.removeAttribute("data-taskId");
  const submitButton = document.getElementById("button-crear");
  submitButton.textContent = "Crear tarea"; // Restablecer texto del botón
}
