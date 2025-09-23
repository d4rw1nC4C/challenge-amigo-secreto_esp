// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Array para almacenar la lista de amigos
let amigos = [];

/**
 * Helper function para obtener elementos del DOM de forma segura
 */
function byId(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Elemento no encontrado: ${id}`);
    }
    return element;
}

/**
 * Función para agregar un amigo a la lista
 */
function agregarAmigo() {
    const input = byId('amigo');
    const nombre = String(input.value ?? '').trim();

    // Validar que el nombre no esté vacío
    if (!nombre) {
        alert('Por favor, ingrese un nombre válido.');
        return;
    }

    // Verificar que el nombre no esté duplicado
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        return;
    }

    // Agregar el nombre a la lista
    amigos.push(nombre);

    // Actualizar la visualización de la lista
    actualizarLista();

    // Limpiar el campo de entrada
    input.value = '';
    input.focus();
}

/**
 * Función para actualizar la visualización de la lista de amigos
 */
function actualizarLista() {
    const lista = byId('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

/**
 * Función para sortear un amigo secreto
 */
function sortearAmigo() {
    const resultado = byId('resultado');

    // Verificar que hay amigos en la lista
    if (amigos.length === 0) {
        alert('Agregue al menos un amigo antes de sortear.');
        return;
    }

    // Seleccionar un amigo al azar
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSeleccionado = amigos[indiceAleatorio];

    // Mostrar el resultado
    resultado.innerHTML = `<li class="result-item">El amigo secreto sorteado es: <strong>${amigoSeleccionado}</strong></li>`;
}

/**
 * Función adicional para limpiar la lista (útil para reiniciar)
 */
function limpiarLista() {
    amigos = [];
    actualizarLista();
    byId('resultado').innerHTML = '';
}

// Permitir agregar amigos presionando Enter en el campo de entrada
document.addEventListener('DOMContentLoaded', function() {
    const input = byId('amigo');
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            agregarAmigo();
        }
    });
});
