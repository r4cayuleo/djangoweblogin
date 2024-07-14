// VALIDACIONES PARA FORMULARIO DE REGISTRO

// VALIDACIONES PARA FORMULARIO DE REGISTRO
document.getElementById('registro-form').addEventListener('submit', function(event) {
    // Obtener valores de los campos
    var nombre = document.getElementById('id_nombre').value.trim();
    var apellido = document.getElementById('id_apellido').value.trim();
    var usuario = document.getElementById('id_usuario').value.trim();
    var correo = document.getElementById('id_correo').value.trim();
    var contraseña = document.getElementById('id_contraseña').value;
    var repContraseña = document.getElementById('id_rep_contraseña').value;
    var sexo = document.getElementById('id_sexo').value;
    var edad = document.getElementById('id_edad').value;

    // Borrar mensajes de error anteriores
    document.getElementById('error-nombre').textContent = '';
    document.getElementById('error-apellido').textContent = '';
    document.getElementById('error-usuario').textContent = '';
    document.getElementById('error-correo').textContent = '';
    document.getElementById('error-contraseña').textContent = '';
    document.getElementById('error-rep-contraseña').textContent = '';
    document.getElementById('error-sexo').textContent = '';
    document.getElementById('error-edad').textContent = '';

    // Validaciones
    var valid = true;

    if (nombre === '') {
        document.getElementById('error-nombre').textContent = 'El campo Nombre es obligatorio';
        valid = false;
    }
    if (apellido === '') {
        document.getElementById('error-apellido').textContent = 'El campo Apellido es obligatorio';
        valid = false;
    }
    if (usuario === '') {
        document.getElementById('error-usuario').textContent = 'El campo Usuario es obligatorio';
        valid = false;
    }
    if (correo === '') {
        document.getElementById('error-correo').textContent = 'El campo Correo Electrónico es obligatorio';
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
        document.getElementById('error-correo').textContent = 'El campo Correo Electrónico no es válido';
        valid = false;
    }
    if (contraseña === '') {
        document.getElementById('error-contraseña').textContent = 'El campo Contraseña es obligatorio';
        valid = false;
    } else if (contraseña.length < 8) {
        document.getElementById('error-contraseña').textContent = 'La contraseña debe tener al menos 8 caracteres';
        valid = false;
    }
    if (contraseña !== repContraseña) {
        document.getElementById('error-rep-contraseña').textContent = 'Las contraseñas no coinciden';
        valid = false;
    }
    if (sexo === '') {
        document.getElementById('error-sexo').textContent = 'Debe seleccionar un sexo';
        valid = false;
    }
    if (edad === '' || isNaN(edad) || edad <= 0) {
        document.getElementById('error-edad').textContent = 'El campo Edad debe ser un número positivo';
        valid = false;
    }

    if (valid) {
        alert('Registro exitoso. Redirigiendo a la página de inicio de sesión.');
        window.location.href = 'login.html';
    } else {
        alert('Error en el registro. Por favor, revise los campos.');
        event.preventDefault();
    }
});

// AUTENTICACIÓN LOGIN
document.getElementById('login-form').addEventListener('submit', function(event) {
    var username = document.getElementById('id_username').value.trim();
    var password = document.getElementById('id_password').value.trim();

    // Borrar mensajes de error anteriores
    document.getElementById('error-username').textContent = '';
    document.getElementById('error-password').textContent = '';

    // Validaciones
    var valid = true;

    if (username === '') {
        document.getElementById('error-username').textContent = 'El campo Usuario es obligatorio';
        valid = false;
    }
    if (password === '') {
        document.getElementById('error-password').textContent = 'El campo Contraseña es obligatorio';
        valid = false;
    }

    if (valid) {
        // Simulación de autenticación exitosa
        alert('Sesión iniciada correctamente.');
        window.location.href = 'eventos.html';
    } else {
        alert('Error en el inicio de sesión. Por favor, revise los campos.');
        event.preventDefault();
    }
});



// AQUI EMPIEZA EL CODIGO DEL CARRITO DE COMPRAS
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderCartItems();
});

function addToCart(eventName, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const eventIndex = cart.findIndex(event => event.name === eventName);

    if (eventIndex > -1) {
        cart[eventIndex].quantity += parseInt(quantity);
    } else {
        cart.push({ name: eventName, quantity: parseInt(quantity) });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
    alert('Entradas agregadas al carrito para ' + eventName);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, event) => total + event.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((event, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const eventInfo = document.createElement('span');
        eventInfo.textContent = `${event.name} - `;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = event.quantity;
        quantityInput.className = 'form-control quantity-input';
        quantityInput.addEventListener('change', () => updateCartQuantity(index, quantityInput.value));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => removeFromCart(index));

        const controls = document.createElement('div');
        controls.className = 'd-flex align-items-center';
        controls.appendChild(quantityInput);
        controls.appendChild(deleteButton);

        listItem.appendChild(eventInfo);
        listItem.appendChild(controls);

        cartItemsContainer.appendChild(listItem);
    });
}

function updateCartQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function checkout() {
    localStorage.removeItem('cart');
    updateCartCount();
    renderCartItems();
    window.location.href = datosCompraUrl; // Redirigir usando la URL definida en el HTML
}

function finalizarCompra() {
    // Validar el formulario antes de proceder
    const form = document.getElementById('purchase-form');
    if (form.checkValidity()) {
        alert('Compra realizada');
        const url = document.querySelector('[onclick="finalizarCompra()"]').getAttribute('data-url');
        window.location.href = url;
    } else {
        form.reportValidity();
    }
}



// CODIGO API
const TICKETMASTER_API_KEY = 'CGGZDZbd2Du3f5HVuhZ2UrWhqmdzaBCc'; // Cambio de nombre para evitar conflictos
const ticketmasterUrl = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=${TICKETMASTER_API_KEY}`;

function cargarConciertosRecomendados() {
    fetch(ticketmasterUrl)
        .then(response => response.json())
        .then(data => {
            const eventos = data._embedded.events;
            const conciertosContainer = document.getElementById('conciertos-recomendados');
            conciertosContainer.innerHTML = '';

            const artistCounts = {};
            const displayedArtists = [];

            eventos.forEach(evento => {
                const artista = evento._embedded.attractions[0].name;
                const fechaEvento = new Date(evento.dates.start.localDate);
                const añoEvento = fechaEvento.getFullYear();

                if (añoEvento !== 2024 && añoEvento !== 2025) {
                    return;
                }

                if (!displayedArtists.includes(artista) && displayedArtists.length >= 4) {
                    return;
                }

                if (!artistCounts[artista]) {
                    artistCounts[artista] = 0;
                }

                if (artistCounts[artista] < 3) {
                    const conciertoElement = document.createElement('div');
                    conciertoElement.classList.add('col-md-4');

                    conciertoElement.innerHTML = `
                        <div class="card">
                            <img src="${evento.images[0].url}" class="card-img-top" alt="${evento.name}">
                            <div class="card-body">
                                <h5 class="card-title">${evento.name}</h5>
                                <p class="card-text">Fecha: ${evento.dates.start.localDate}</p>
                                <p class="card-text">Lugar: ${evento._embedded.venues[0].name}</p>
                                <a href="${evento.url}" class="btn btn-primary">Comprar Entradas</a>
                            </div>
                        </div>
                    `;

                    conciertosContainer.appendChild(conciertoElement);

                    artistCounts[artista]++;
                    if (!displayedArtists.includes(artista)) {
                        displayedArtists.push(artista);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al cargar los conciertos:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    cargarConciertosRecomendados();
});


// AQUI EMPIEZA EL CODIGO DE LA API
// Clave API de Ticketmaster
const apiKey = 'CGGZDZbd2Du3f5HVuhZ2UrWhqmdzaBCc';
// URL de la API de Ticketmaster para obtener eventos de música
const url = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=${apiKey}`;

// Función para obtener y mostrar los conciertos recomendados
function cargarConciertosRecomendados() {
    // Llamada a la API usando fetch
    fetch(url)
        .then(response => response.json()) // Convierte la respuesta en un objeto JSON
        .then(data => {
            // Se obtiene la lista de eventos del objeto JSON
            const eventos = data._embedded.events;
            // Se selecciona el contenedor para mostrar los conciertos recomendados
            const conciertosContainer = document.getElementById('conciertos-recomendados');
            // Limpia cualquier contenido anterior en el contenedor
            conciertosContainer.innerHTML = '';

            // Objeto para contar la cantidad de conciertos por artista
            const artistCounts = {};
            // Array para rastrear el número de artistas diferentes mostrados
            const displayedArtists = [];

            // Itera sobre cada evento
            eventos.forEach(evento => {
                // Nombre del artista principal del evento
                const artista = evento._embedded.attractions[0].name;

                // Fecha del evento
                const fechaEvento = new Date(evento.dates.start.localDate);
                const añoEvento = fechaEvento.getFullYear();

                // Filtra eventos para mostrar solo los de 2024 y 2025
                if (añoEvento !== 2024 && añoEvento !== 2025) {
                    return;
                }
                
                // Si el artista no está en el array y ya hay 4 artistas, no agregue más conciertos
                if (!displayedArtists.includes(artista) && displayedArtists.length >= 4) {
                    return;
                }

                // Inicializa el contador para el artista si no existe
                if (!artistCounts[artista]) {
                    artistCounts[artista] = 0;
                }

                // Solo agrega el concierto si el artista tiene menos de 3 conciertos mostrados
                if (artistCounts[artista] < 3) {
                    // Crea un elemento de tarjeta para el concierto
                    const conciertoElement = document.createElement('div');
                    conciertoElement.classList.add('col-md-4');

                    // Define el contenido HTML de la tarjeta
                    conciertoElement.innerHTML = `
                        <div class="card">
                            <img src="${evento.images[0].url}" class="card-img-top" alt="${evento.name}">
                            <div class="card-body">
                                <h5 class="card-title">${evento.name}</h5>
                                <p class="card-text">Fecha: ${evento.dates.start.localDate}</p>
                                <p class="card-text">Lugar: ${evento._embedded.venues[0].name}</p>
                                <a href="${evento.url}" class="btn btn-primary" target="_blank">Comprar Entradas</a>
                            </div>
                        </div>
                    `;

                    // Agrega la tarjeta al contenedor
                    conciertosContainer.appendChild(conciertoElement);
                    // Incrementa el contador para el artista
                    artistCounts[artista]++;
                    
                    // Si es la primera vez que se muestra un concierto de este artista, se agrega al array de artistas mostrados
                    if (!displayedArtists.includes(artista)) {
                        displayedArtists.push(artista);
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error)); // Maneja cualquier error en la llamada a la API
}

// Función para cargar los conciertos cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarConciertosRecomendados);

// AUTENTICACION LOGIN
// app.js

document.addEventListener('DOMContentLoaded', function() {
    const authLinks = document.getElementById('auth-links');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (authLinks && loggedInUser) {
        authLinks.innerHTML = `
            <li class="nav-item">
                <a href="perfil.html" class="nav-link">Ver Perfil</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" id="logout">Cerrar Sesión</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#cartModal">
                    <i class="fas fa-shopping-cart"></i> Carrito (<span id="cart-count">0</span>)
                </a>
            </li>
        `;
        
        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});


// Este evento se activa cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Se obtiene el elemento que contiene los enlaces de autenticación
    const authLinks = document.getElementById('auth-links');
    // Se obtiene la información del usuario que ha iniciado sesión desde el almacenamiento local
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Si hay un usuario autenticado
    if (loggedInUser) {
        // Se reemplazan los enlaces de autenticación con los enlaces de perfil y cierre de sesión
        authLinks.innerHTML = `
            <li class="nav-item">
                <a href="perfil.html" class="nav-link">Ver Perfil</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" id="logout">Cerrar Sesión</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#cartModal">
                    <i class="fas fa-shopping-cart"></i> Carrito (<span id="cart-count">0</span>)
                </a>
            </li>
        `;
        
        // Se agrega un evento de escucha al enlace de cierre de sesión
        document.getElementById('logout').addEventListener('click', function() {
            // Se elimina la información del usuario autenticado del almacenamiento local
            localStorage.removeItem('loggedInUser');
            // Se redirige al usuario a la página de inicio
            window.location.href = 'index.html';
        });
    }
});
