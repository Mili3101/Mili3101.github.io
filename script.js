// Arreglo para almacenar los registros
const registros = [];

// Evento para el botón de guardar
document.getElementById('medicalForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveForm();
});

// Guardar el formulario
function saveForm() {
    const rut = document.getElementById('rut').value;
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const fecha_nacimiento = document.getElementById('fecha-nacimiento').value; // Corregido
    const estado_civil = document.getElementById('estado-civil').value; // Corregido
    const comentarios = document.getElementById('comentarios').value;

    // Validaciones de formato
    if (!/^\d{7,8}-[0-9kK]$/.test(rut)) {
        alert("El RUT debe estar en el formato 12345678-9 o 12345678-k");
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(nombres) || !/^[a-zA-Z\s]+$/.test(apellidos)) {
        alert("Los nombres y apellidos solo deben contener letras.");
        return;
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(direccion)) {
        alert("La dirección solo debe contener letras y números.");
        return;
    }
    if (!/^569\d{8}$/.test(telefono)) {
        alert("El teléfono debe estar en el formato 56912345678.");
        return;
    }

    // Revisión de registros existentes
    const registroExistente = registros.find(reg => reg.rut === rut);

    if (registroExistente) {
        if (confirm('El registro ya existe. ¿Desea sobrescribirlo?')) {
            Object.assign(registroExistente, { nombres, apellidos, direccion, ciudad, telefono, email, fecha_nacimiento, estado_civil, comentarios });
            alert('Registro actualizado exitosamente.');
        }
    } else {
        registros.push({ rut, nombres, apellidos, direccion, ciudad, telefono, email, fecha_nacimiento, estado_civil, comentarios });
        alert('Registro guardado exitosamente.'); // Este mensaje debe aparecer ahora
    }
}

// Evento para el botón de eliminar
document.getElementById('btn-eliminar').addEventListener('click', () => {
    const rut = document.getElementById('rut').value;
    const index = registros.findIndex(reg => reg.rut === rut);

    if (index !== -1) {
        if (confirm('¿Estás seguro de eliminar el registro?')) {
            registros.splice(index, 1);
            alert('Registro eliminado exitosamente.');
            document.getElementById('medicalForm').reset();
        }
    } else {
        alert('No se encontró el registro a eliminar.');
    }
});

// Evento para buscar por apellido
document.getElementById('btn-buscar').addEventListener('click', () => {
    const apellido = document.getElementById('apellido-busqueda').value.trim();
    const resultado = registros.filter(reg => reg.apellidos.includes(apellido));

    if (resultado.length > 0) {
        alert(`Se encontraron ${resultado.length} resultados con el apellido ${apellido}.`);
        console.table(resultado);
    } else {
        alert('No se encontraron registros con ese apellido.');
    }
});
