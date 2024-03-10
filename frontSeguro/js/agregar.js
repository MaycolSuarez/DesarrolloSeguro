const token = localStorage.getItem('token');
if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null ) {
        // Redirigir a otra página en caso de error al obtener datos
        window.location.href = '/login.html';
}

function agregar() {

    if (document.getElementById("username").value != "" && document.getElementById("lastname").value != "" && document.getElementById("firstname").value != "" && document.getElementById("country").value != "") {
        const user = {
            username: username = document.getElementById("username").value,
            password: password = document.getElementById("password").value,
            lastname: lastname = document.getElementById("lastname").value,
            firstname: firstname = document.getElementById("firstname").value,
            country: country = document.getElementById("country").value,
            role: role = "USER"
        }

        // Convertir el objeto a una cadena JSON
        const datosJSON = JSON.stringify(user);

        // Realizar la solicitud Fetch y enviar los datos JSON en el cuerpo
        fetch('http://localhost:8081/api/v1/saveUser', {
            method: 'POST', // o el método que necesites
            headers: {
                'Content-Type': 'application/json',
                // Agregar el token al header Authorization
                'Authorization': `Bearer ${token}`
                
            },
            body: datosJSON,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                console.log('Adicion exitosa');
                // Mostrar el modal de exito
                const errorModal = new bootstrap.Modal(document.getElementById('succesModal'));
                errorModal.show();
                // Esperar 3 segundos (3000 milisegundos) antes de redirigir
                setTimeout(function() {
                    window.location.href = '/index.html';
                }, 3000); // 3000 milisegundos = 3 segundos
            })
            .catch(error => {
                // Manejar errores
                console.error('Error en la solicitud:', error);
                // Limpiar el token del localStorage
                localStorage.removeItem('token');
                window.location.href = '/login.html';
            });
    } else {
        // Mostrar el modal de error
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
    }

}

document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const passwordError = document.getElementById("passwordError");
    const passwordCharacteres = document.getElementById("passwordCharacteres");
    const submitButton = document.getElementById("submitButton");

    const regex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!#$%&'*+-\/=?^_`{|}~.]{8,14}$/

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