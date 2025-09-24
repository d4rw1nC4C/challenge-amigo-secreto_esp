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
 * Implementación del algoritmo Fisher-Yates para barajar arrays de forma equitativa
 */
function fisherYatesShuffle(array) {
    // Crear una copia del array para no modificar el original
    const shuffled = [...array];

    // Aplicar algoritmo Fisher-Yates
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Helper function para normalizar nombres (capitalizar primera letra de cada palabra)
 */
function normalizarNombre(nombre) {
    return nombre
        .trim()
        .split(/\s+/) // Dividir por cualquier cantidad de espacios
        .filter(palabra => palabra.length > 0) // Eliminar cadenas vacías
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
        .join(' ');
}

/**
 * Función para agregar un amigo a la lista
 */
function agregarAmigo() {
    const input = byId('amigo');
    const nombreRaw = String(input.value ?? '').trim();

    // Validar que el nombre no esté vacío
    if (!nombreRaw) {
        alert('Por favor, ingrese un nombre válido.');
        return;
    }

    // Normalizar el nombre (capitalizar primera letra de cada palabra)
    const nombre = normalizarNombre(nombreRaw);

    // Verificar que el nombre no esté duplicado
    if (amigos.includes(nombre)) {
        alert('Este nombre ya está en la lista.');
        return;
    }

    // Agregar el nombre a la lista
    amigos.push(nombre);

    // Actualizar la visualización de la lista
    actualizarLista();
    actualizarEstadoBotones();
    actualizarContadorAmigos();
    actualizarMensajesAyuda();

    // Anunciar el cambio
    anunciarCambio(`${nombre} ha sido añadido a la lista`);

    // Limpiar el campo de entrada y revalidar
    input.value = '';
    validarEstadoInput();
    input.focus();
}

/**
 * Función para actualizar la visualización de la lista de amigos
 */
function actualizarLista() {
    const lista = byId('listaAmigos');
    lista.innerHTML = '';

    amigos.forEach((nombre, indice) => {
        const li = document.createElement('li');
        li.className = 'friend-item';

        // Si el elemento está en modo edición, renderizar el modo de edición
        if (elementoEnEdicion === indice) {
            renderizarModoEdicion(li, nombre, indice);
        } else {
            // Renderizar modo normal
            renderizarModoNormal(li, nombre, indice);
        }

        lista.appendChild(li);
    });
}

/**
 * Renderiza un elemento de lista en modo normal con botones de acción
 */
function renderizarModoNormal(li, nombre, indice) {
    // Contenedor principal del elemento
    const contenedor = document.createElement('div');
    contenedor.className = 'friend-item-content';

    // Texto del nombre
    const textoNombre = document.createElement('span');
    textoNombre.className = 'friend-name';
    textoNombre.textContent = nombre;

    // Contenedor de botones
    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'friend-actions';

    // Botón de editar
    const botonEditar = document.createElement('button');
    botonEditar.setAttribute('data-action', 'edit');
    botonEditar.setAttribute('data-index', indice.toString());
    botonEditar.setAttribute('aria-label', `Editar ${nombre}`);
    botonEditar.setAttribute('title', `Editar ${nombre}`);
    botonEditar.className = 'button-edit';
    botonEditar.innerHTML = '✏️';
    botonEditar.onclick = function() { return iniciarEdicion(indice); };

    // Botón de eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.setAttribute('data-action', 'delete');
    botonEliminar.setAttribute('data-index', indice.toString());
    botonEliminar.setAttribute('aria-label', `Eliminar ${nombre}`);
    botonEliminar.setAttribute('title', `Eliminar ${nombre}`);
    botonEliminar.className = 'button-delete';
    botonEliminar.innerHTML = '🗑️';
    botonEliminar.onclick = function() { return eliminarAmigoConConfirmacion(indice); };

    botonesContainer.appendChild(botonEditar);
    botonesContainer.appendChild(botonEliminar);

    contenedor.appendChild(textoNombre);
    contenedor.appendChild(botonesContainer);

    li.appendChild(contenedor);

    // Eventos de hover
    li.addEventListener('mouseenter', function() {
        this.classList.add('item-hover');
    });

    li.addEventListener('mouseleave', function() {
        this.classList.remove('item-hover');
    });
}

/**
 * Renderiza un elemento de lista en modo edición
 */
function renderizarModoEdicion(li, nombre, indice) {
    li.className = 'friend-item editing';

    // Contenedor de edición
    const contenedorEdicion = document.createElement('div');
    contenedorEdicion.className = 'friend-edit-content';

    // Input de edición
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = nombre;
    input.setAttribute('data-index', indice.toString());

    // Contenedor de botones de edición
    const botonesEdicion = document.createElement('div');
    botonesEdicion.className = 'edit-actions';

    // Botón guardar
    const botonGuardar = document.createElement('button');
    botonGuardar.setAttribute('data-action', 'save');
    botonGuardar.setAttribute('data-index', indice.toString());
    botonGuardar.setAttribute('aria-label', 'Guardar cambios');
    botonGuardar.setAttribute('title', 'Guardar cambios');
    botonGuardar.className = 'button-save';
    botonGuardar.innerHTML = '✅';
    botonGuardar.onclick = function() { return guardarEdicion(indice); };

    // Botón cancelar
    const botonCancelar = document.createElement('button');
    botonCancelar.setAttribute('data-action', 'cancel');
    botonCancelar.setAttribute('data-index', indice.toString());
    botonCancelar.setAttribute('aria-label', 'Cancelar edición');
    botonCancelar.setAttribute('title', 'Cancelar edición');
    botonCancelar.className = 'button-cancel';
    botonCancelar.innerHTML = '❌';
    botonCancelar.onclick = function() { return cancelarEdicion(indice); };

    // Botones normales ocultos durante edición
    const botonesNormales = li.querySelectorAll('[data-action="edit"], [data-action="delete"]');
    botonesNormales.forEach(boton => {
        boton.style.display = 'none';
    });

    // Eventos de teclado para el input
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            guardarEdicion(indice);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            cancelarEdicion(indice);
        }
    });

    botonesEdicion.appendChild(botonGuardar);
    botonesEdicion.appendChild(botonCancelar);

    contenedorEdicion.appendChild(input);
    contenedorEdicion.appendChild(botonesEdicion);

    li.appendChild(contenedorEdicion);

    // Enfocar el input
    if (typeof global === 'undefined' || !global.document) {
        // Browser environment
        setTimeout(function() { input.focus(); }, 0);
    } else {
        // Test environment - focus immediately
        input.focus();
    }
}

/**
 * Función para sortear un amigo secreto
 */
function sortearAmigo() {
    const resultado = byId('resultado');

    // Verificar que hay al menos 2 amigos para hacer un sorteo
    if (amigos.length < 2) {
        alert('Se necesitan al menos 2 amigos para hacer un sorteo.');
        return;
    }

    // Mostrar indicador de carga
    mostrarIndicadorCarga(true);

    // In testing, don't use setTimeout as it can cause issues
    if (typeof global !== 'undefined' && global.document) {
        // Testing environment - execute immediately
        const listaBarajada = fisherYatesShuffle(amigos);
        const amigoSeleccionado = listaBarajada[0];
        resultado.innerHTML = `<li class="result-item">El amigo secreto sorteado es: <strong>${amigoSeleccionado}</strong></li>`;
        anunciarCambio(`El amigo secreto sorteado es ${amigoSeleccionado}`);
        mostrarIndicadorCarga(false);
    } else {
        // Browser environment - use setTimeout for UX
        setTimeout(() => {
            const listaBarajada = fisherYatesShuffle(amigos);
            const amigoSeleccionado = listaBarajada[0];
            resultado.innerHTML = `<li class="result-item">El amigo secreto sorteado es: <strong>${amigoSeleccionado}</strong></li>`;
            anunciarCambio(`El amigo secreto sorteado es ${amigoSeleccionado}`);
            mostrarIndicadorCarga(false);
        }, 500);
    }
}

/**
 * Función adicional para limpiar la lista (útil para reiniciar)
 */
function limpiarLista() {
    amigos = [];
    actualizarLista();
    byId('resultado').innerHTML = '';
    actualizarEstadoBotones();
    actualizarContadorAmigos();
    actualizarMensajesAyuda();
}

// Variable global para controlar el modo de edición
let elementoEnEdicion = null;

/**
 * Función para eliminar un amigo por índice
 */
function eliminarAmigo(indice) {
    // Validar índice
    if (indice < 0 || indice >= amigos.length || !Number.isInteger(indice)) {
        return; // Índice inválido, no hacer nada
    }

    // Eliminar el elemento del array
    amigos.splice(indice, 1);
}

/**
 * Función para eliminar un amigo con confirmación del usuario
 */
function eliminarAmigoConConfirmacion(indice) {
    // Validar índice
    if (indice < 0 || indice >= amigos.length) {
        return;
    }

    const nombreAmigo = amigos[indice];
    const mensaje = `¿Estás seguro de que quieres eliminar a ${nombreAmigo}?`;

    if (window.confirm(mensaje)) {
        eliminarAmigo(indice);

        // Actualizar la UI
        actualizarLista();
        actualizarEstadoBotones();
        actualizarContadorAmigos();
        actualizarMensajesAyuda();

        // Anunciar el cambio
        anunciarCambio(`${nombreAmigo} ha sido eliminado de la lista`);

        // Enfocar el input principal
        byId('amigo').focus();
    }
}

/**
 * Función para iniciar la edición de un nombre
 */
function iniciarEdicion(indice) {
    // Validar índice
    if (indice < 0 || indice >= amigos.length) {
        return;
    }

    // Si hay otro elemento en edición, cancelarlo primero
    if (elementoEnEdicion !== null && elementoEnEdicion !== indice) {
        elementoEnEdicion = null;
    }

    elementoEnEdicion = indice;

    // Re-renderizar la lista para mostrar el modo de edición
    actualizarLista();
}

/**
 * Función para guardar la edición de un nombre
 */
function guardarEdicion(indice) {
    // Validar índice
    if (indice < 0 || indice >= amigos.length) {
        return;
    }

    const lista = byId('listaAmigos');
    const elementoLista = lista.children[indice];
    const input = elementoLista.querySelector('input[type="text"]');

    if (!input) {
        return;
    }

    const nuevoNombre = String(input.value ?? '').trim();

    // Validar que el nombre no esté vacío
    if (!nuevoNombre) {
        alert('Por favor, ingrese un nombre válido.');
        input.focus();
        return;
    }

    // Validar longitud máxima
    if (nuevoNombre.length > 100) {
        alert('El nombre es demasiado largo. Máximo 100 caracteres.');
        input.focus();
        return;
    }

    // Normalizar el nombre
    const nombreNormalizado = normalizarNombre(nuevoNombre);

    // Verificar que no sea duplicado (excluyendo el elemento actual)
    const yaExiste = amigos.some((nombre, i) => i !== indice && nombre === nombreNormalizado);
    if (yaExiste) {
        alert('Este nombre ya está en la lista.');
        input.focus();
        return;
    }

    // Guardar el nombre anterior para el anuncio
    const nombreAnterior = amigos[indice];

    // Actualizar el array
    amigos[indice] = nombreNormalizado;

    // Salir del modo de edición
    elementoEnEdicion = null;

    // Actualizar la UI
    actualizarLista();
    actualizarEstadoBotones();
    actualizarContadorAmigos();
    actualizarMensajesAyuda();

    // Anunciar el cambio
    if (nombreAnterior !== nombreNormalizado) {
        anunciarCambio(`${nombreAnterior} ha sido editado a ${nombreNormalizado}`);
    }

    // Enfocar el input principal
    byId('amigo').focus();
}

/**
 * Función para cancelar la edición
 */
function cancelarEdicion(indice) {
    // Validar índice
    if (indice < 0 || indice >= amigos.length) {
        return;
    }

    // Salir del modo de edición
    elementoEnEdicion = null;

    // Re-renderizar la lista en modo normal
    actualizarLista();

    // Enfocar el input principal
    byId('amigo').focus();
}

/**
 * Función para ordenar la lista alfabéticamente
 */
function ordenarListaAlfabeticamente() {
    amigos.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

    actualizarLista();
    anunciarCambio('Lista ordenada alfabéticamente');
}

/**
 * Función para limpiar la lista con confirmación del usuario
 */
function limpiarListaConConfirmacion() {
    if (amigos.length === 0) {
        return;
    }

    const confirmMessage = '¿Estás seguro de que quieres limpiar toda la lista? Esta acción no se puede deshacer.';
    if (window.confirm(confirmMessage)) {
        limpiarLista();
        anunciarCambio('Lista de amigos limpiada completamente');
    }
}

/**
 * Actualiza el estado de los botones según el contenido de la lista
 */
function actualizarEstadoBotones() {
    const sortearButton = document.querySelector('.button-primary[onclick="sortearAmigo()"]');
    const clearButton = document.querySelector('.button-secondary[onclick="limpiarListaConConfirmacion()"]');

    if (sortearButton) {
        if (amigos.length < 2) {
            sortearButton.setAttribute('disabled', 'true');
        } else {
            sortearButton.removeAttribute('disabled');
        }
    }

    if (clearButton) {
        if (amigos.length === 0) {
            clearButton.setAttribute('disabled', 'true');
        } else {
            clearButton.removeAttribute('disabled');
        }
    }
}

/**
 * Actualiza el contador de amigos
 */
function actualizarContadorAmigos() {
    const contador = document.getElementById('friendCounter');
    if (!contador) return;

    const cantidad = amigos.length;

    if (cantidad === 0) {
        contador.textContent = '';
    } else if (cantidad === 1) {
        contador.textContent = '1 amigo en la lista';
    } else {
        contador.textContent = `${cantidad} amigos en la lista`;
    }
}

/**
 * Actualiza los mensajes de ayuda
 */
function actualizarMensajesAyuda() {
    const helpMessage = document.getElementById('helpMessage');
    if (!helpMessage) return;

    const cantidad = amigos.length;

    if (cantidad === 0) {
        helpMessage.textContent = 'Agrega al menos 2 amigos para comenzar el sorteo';
        helpMessage.style.display = 'block';
    } else if (cantidad === 1) {
        helpMessage.textContent = 'Agrega 1 amigo más para poder sortear';
        helpMessage.style.display = 'block';
    } else {
        helpMessage.style.display = 'none';
    }
}

/**
 * Valida el estado del input y aplica estilos visuales
 */
function validarEstadoInput() {
    const input = byId('amigo');
    const nombreRaw = String(input.value ?? '').trim();

    if (nombreRaw) {
        const nombre = normalizarNombre(nombreRaw);
        if (amigos.includes(nombre)) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    } else {
        input.classList.remove('error');
    }
}

/**
 * Anuncia cambios importantes para lectores de pantalla
 */
function anunciarCambio(mensaje) {
    const announcements = document.getElementById('announcements');
    if (!announcements) return;

    announcements.textContent = mensaje;

    // Limpiar el mensaje después de un tiempo para que pueda anunciar cambios futuros
    if (typeof global === 'undefined' || !global.document) {
        // Only use setTimeout in browser environment
        setTimeout(() => {
            announcements.textContent = '';
        }, 1000);
    }
}

/**
 * Muestra u oculta el indicador de carga
 */
function mostrarIndicadorCarga(mostrar) {
    const loader = document.getElementById('loadingIndicator');
    if (!loader) return;

    const sortearButton = document.querySelector('.button-primary[onclick="sortearAmigo()"]');

    if (mostrar) {
        loader.removeAttribute('hidden');
        if (sortearButton) {
            sortearButton.setAttribute('disabled', 'true');
        }
    } else {
        loader.setAttribute('hidden', 'true');
        actualizarEstadoBotones(); // Restaurar estado normal de botones
    }
}

// Event listeners para mejorar la interacción
document.addEventListener('DOMContentLoaded', function() {
    const input = byId('amigo');

    // Permitir agregar amigos presionando Enter
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            agregarAmigo();
        }
    });

    // Soporte para tecla Escape - limpiar input
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            input.value = '';
            input.focus();
        }
    });

    // Validación en tiempo real del input
    input.addEventListener('input', function() {
        validarEstadoInput();
    });

    // Atajos de teclado globales
    document.addEventListener('keydown', function(event) {
        // Ctrl+Enter: Ejecutar sorteo
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            if (amigos.length >= 2) {
                sortearAmigo();
            }
        }

        // Ctrl+L: Limpiar lista con confirmación
        if (event.ctrlKey && event.key === 'l') {
            event.preventDefault();
            limpiarListaConConfirmacion();
        }
    });

    // Inicializar estado de la UI
    actualizarEstadoBotones();
    actualizarContadorAmigos();
    actualizarMensajesAyuda();
});
