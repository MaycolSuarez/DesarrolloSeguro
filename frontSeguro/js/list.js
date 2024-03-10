// Realizar la solicitud con Fetch
// Obtener el token de donde lo tengas guardado (por ejemplo, localStorage)
const token = localStorage.getItem('token');
debugger;
fetch('http://localhost:8081/api/v1/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // Agregar el token al header Authorization
    'Authorization': `Bearer ${token}`
  },
})
.then((response) => response.json())
.then((data) => {
  // Obtener el contenedor de tbody
  const tbody = document.querySelector('#resulTable tbody');

  // Limpiar el contenido actual del tbody
  tbody.innerHTML = '';

  // Iterar sobre los datos y agregar filas a la tabla
  data.forEach((user) => {
    const row = tbody.insertRow();
    const nombreCell = row.insertCell(0);
    const edadCell = row.insertCell(1);
    const emailCell = row.insertCell(2);
    const direccionCell = row.insertCell(3);
    const accionesCell = row.insertCell(4);

    // Llenar las celdas con los datos del usuario
    nombreCell.textContent = user.username;
    edadCell.textContent = user.lastname;
    emailCell.textContent = user.firstname;
    direccionCell.textContent = user.country;

    // Agregar botones a la nueva columna 'acciones'
    const botonEditar = document.createElement('button');
    botonEditar.textContent = 'Editar';
    botonEditar.classList.add("btn", "btn-warning",'mx-1');
    botonEditar.addEventListener('click', () => {
      // Redireccionar a otra página
      window.location.href = '/templates/editar.html?id='+user.id;
      //console.log('Editar', user.id);
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add("btn", "btn-danger",'mx-2');
    botonEliminar.addEventListener('click', () => {
      fetch('http://localhost:8081/api/v1/user/' + user.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregar el token al header Authorization
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Eliminado exitosamente');
        // Recargar la página después de la eliminación exitosa
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al eliminar:', error);
      });
    });

    accionesCell.appendChild(botonEditar);
    accionesCell.appendChild(botonEliminar);
  });
  // Mostrar el contenedor de la tabla una vez que los datos estén listos
  const tableContainer = document.getElementById('contenidoList');
  tableContainer.style.display = 'block';
})
.catch((error) => {
  console.error('Error al obtener datos:', error);
  // Redirigir a otra página en caso de error al obtener datos
  window.location.href = '/login.html';
});

function salir(){

  // Limpiar el token del localStorage
  localStorage.removeItem('token');
  window.location.href = '/login.html';

}

