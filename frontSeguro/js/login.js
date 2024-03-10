document.addEventListener("DOMContentLoaded", function() {
    
    const form = document.getElementById("loginForm");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita que se envíe el formulario de manera convencional

      // Verificar si los campos del formulario están vacíos
      if (document.getElementById("username").value === "" ||
          document.getElementById("password").value === "") {
            alert("Por favor complete todos los campos del formulario");
            return; // Detiene la ejecución si hay campos vacíos
      }

      const url = 'http://localhost:8081/auth/login';
      
      const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
      }
      debugger;
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          if (data.token) {
              localStorage.setItem('token', data.token);
              console.log('Token almacenado:', data.token);
              // Redirigir a la URL deseada después de recibir el token
              window.location.href = "/index.html";
          } else {
              console.error('Error al obtener el token:', data.error);
          }
      })
      .catch(error => {
        // Mostrar el modal de error
        const errorModal = new bootstrap.Modal(document.getElementById('errorModalLogin'));
        errorModal.show();
      });
    });
});

function filtrarCaracteres(event) {
  const input = event.target;
  const valor = input.value;

  // Expresión regular para caracteres no permitidos
  const caracteresNoPermitidos = /[:;'"/><.(){}[\]]/g;

  if (caracteresNoPermitidos.test(valor)) {
      // Eliminar caracteres no permitidos del valor del input
      const nuevoValor = valor.replace(caracteresNoPermitidos, '');
      input.value = nuevoValor;
  }
}

