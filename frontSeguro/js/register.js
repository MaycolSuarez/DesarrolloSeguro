document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registerForm");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // Evita que se envíe el formulario de manera convencional

      // Verificar si los campos del formulario están vacíos
      if (document.getElementById("username").value === "" || 
          document.getElementById("lastname").value === "" || 
          document.getElementById("firstname").value === "" || 
          document.getElementById("country").value === "") {
            alert("Por favor complete todos los campos del formulario");
            return; // Detiene la ejecución si hay campos vacíos
      }

      const url = 'http://localhost:8081/auth/register';
      
      const data = {
        username: document.getElementById("username").value,
        lastname: document.getElementById("lastname").value,
        firstname: document.getElementById("firstname").value,
        country: document.getElementById("country").value,
        password: document.getElementById("confirm_password").value
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
          console.error('Error al realizar la solicitud:', error);
      });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const passwordError = document.getElementById("passwordError");
    const passwordCharacteres = document.getElementById("passwordCharacteres");
    const submitButton = document.getElementById("submitButton");
    

    confirmPasswordInput.addEventListener("input", function() {
        if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.textContent = "Las contraseñas no coinciden";
        passwordError.style.display = "block";
        confirmPasswordInput.classList.add("is-invalid");
        submitButton.disabled = true;
        } else {
        passwordError.textContent = "";
        passwordError.style.display = "none";
        confirmPasswordInput.classList.remove("is-invalid");
        submitButton.disabled = false;
        }
    });
    passwordInput.addEventListener("input", function() {
        if (passwordInput.value !== confirmPasswordInput.value) {
        passwordError.textContent = "Las contraseñas no coinciden";
        passwordError.style.display = "block";
        confirmPasswordInput.classList.add("is-invalid");
        submitButton.disabled = true;
        }
    });

    passwordInput.addEventListener("input", function() {
        let password = passwordInput.value;
        
        // Verificar la longitud de la contraseña
        if (password.length < 8 || password.length > 14) {
            passwordCharacteres.style.display = "block";
            passwordInput.classList.add("is-invalid");
            passwordCharacteres.textContent = "La contraseña debe tener entre 8 y 14 caracteres";
            return;
        }
    
        // Verificar si hay al menos una letra minúscula y una letra mayúscula
        let hasLowerCase = /[a-z]/.test(password);
        let hasUpperCase = /[A-Z]/.test(password);
        if (!hasLowerCase || !hasUpperCase) {
            passwordCharacteres.style.display = "block";
            passwordInput.classList.add("is-invalid");
            passwordCharacteres.textContent = "La contraseña debe tener al menos una letra minúscula y una letra mayúscula";
            return;
        }
    
        // Verificar si hay al menos un dígito y un carácter especial
        let hasDigit = /\d/.test(password);
        let hasSpecialChar = /[@$!%*?&#]/.test(password);
        if (!hasDigit || !hasSpecialChar) {
            passwordCharacteres.style.display = "block";
            passwordInput.classList.add("is-invalid");
            passwordCharacteres.textContent = "La contraseña debe tener al menos un dígito y un carácter especial";
            return;
        }
    
        // Si todas las condiciones se cumplen, habilitar el botón de envío y ocultar el mensaje de error
        passwordCharacteres.style.display = "none";
        passwordInput.classList.remove("is-invalid");
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

function filtrarCaracteresNums(event) {
    const input = event.target;
    let valor = input.value;

    // Expresión regular para caracteres no permitidos
    const caracteresNoPermitidos = /[:;'"/><.(){}[\]0-9]/g;

    if (caracteresNoPermitidos.test(valor)) {
        // Eliminar caracteres no permitidos del valor del input
        valor = valor.replace(caracteresNoPermitidos, '');
        input.value = valor;
    }
}


