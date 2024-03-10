const token = localStorage.getItem('token');
if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null ) {
        // Redirigir a otra página en caso de error al obtener datos
        window.location.href = '/login.html';
}
window.onload = function () {
    // Obtener la URL actual
    const url = new URL(window.location.href);
    const token = localStorage.getItem('token');
    // Obtener el valor del parámetro idUser
    const id = url.searchParams.get("id");
    fetch('http://localhost:8081/api/v1/user/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Agregar el token al header Authorization
            'Authorization': `Bearer ${token}`
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const id = document.getElementById("id")
            id.value = data.id;
            const username = document.getElementById("username")
            username.value = data.username;
            const lastname = document.getElementById("lastname")
            lastname.value = data.lastname;
            const firstname = document.getElementById("firstname")
            firstname.value = data.firstname;
            const country = document.getElementById("country")
            country.value = data.country;
            const password = document.getElementById("password")
            password.value = data.password;            
        })
        .catch((error) => {
            console.error('Error al obtener datos:', error);
            // Redirigir a otra página en caso de error al obtener datos
            localStorage.getItem('token') = "";
            window.location.href = '/login.html';
        });
};

function accept() {
    debugger;
    const token = localStorage.getItem('token');
    if (document.getElementById("username").value != "" && document.getElementById("lastname").value != "" && document.getElementById("firstname").value != "" && document.getElementById("country").value != "") {
        const user = {
            id: id = document.getElementById("id").value,
            username: username = document.getElementById("username").value,
            lastname: lastname = document.getElementById("lastname").value,
            firstname: firstname = document.getElementById("firstname").value,
            country: country = document.getElementById("country").value,
            password: password = document.getElementById("password").value,
            role: role = "USER"
        }

        // Convertir el objeto a una cadena JSON
        const datosJSON = JSON.stringify(user);

        // Realizar la solicitud Fetch y enviar los datos JSON en el cuerpo
        fetch('http://localhost:8081/api/v1/updateUser', {
            method: 'PUT', // o el método que necesites
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
                console.log('Edicion Exitosa');
                // Recargar la página después de la edicion exitosa
                window.location.href = '/index.html'
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
