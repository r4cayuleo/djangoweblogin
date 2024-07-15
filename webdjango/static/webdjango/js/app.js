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
    var campos = ['nombre', 'apellido', 'usuario', 'correo', 'contraseña', 'rep_contraseña', 'sexo', 'edad'];
    campos.forEach(function(campo) {
        document.getElementById('error-' + campo).textContent = '';
    });

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
document.addEventListener('DOMContentLoaded', function() {
    cargarConciertosRecomendados();
    updateCartCount();
    renderCartItems();
});

function addToCart(eventName, quantity, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const eventIndex = cart.findIndex(event => event.name === eventName);

    if (eventIndex > -1) {
        cart[eventIndex].quantity += parseInt(quantity);
    } else {
        cart.push({ name: eventName, quantity: parseInt(quantity), price: parseFloat(price) });
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
    updateCartTotal();
}

function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, event) => sum + (event.quantity * event.price), 0);
    document.getElementById('cart-total').textContent = formatCurrency(total);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(value);
}

function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((event, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const eventInfo = document.createElement('span');
        eventInfo.textContent = `${event.name} - ${formatCurrency(event.price)} x `;

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

    updateCartTotal();
}

function updateCartQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (newQuantity <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity = parseInt(newQuantity);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    const csrftoken = getCookie('csrftoken');

    fetch(datosCompraUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Compra realizada con éxito');
            localStorage.removeItem('cart');
            updateCartCount();
            renderCartItems();
        } else {
            alert('Hubo un problema con la compra. Por favor, intenta de nuevo.');
        }
    })
    .catch(error => console.error('Error:', error));
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
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
const TICKETMASTER_API_KEY = 'CGGZDZbd2Du3f5HVuhZ2UrWhqmdzaBCc';
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
                const fechaEvento = new Date(evento.dates.start.dateTime);

                if (!artistCounts[artista]) {
                    artistCounts[artista] = 0;
                }

                if (artistCounts[artista] < 2 && !displayedArtists.includes(artista)) {
                    const card = document.createElement('div');
                    card.className = 'col-md-4 mb-4';

                    card.innerHTML = `
                        <div class="card h-100">
                            <img src="${evento.images[0].url}" class="card-img-top" alt="${artista}">
                            <div class="card-body">
                                <h5 class="card-title">${artista}</h5>
                                <p class="card-text">${evento.name}</p>
                                <p class="card-text"><strong>Fecha:</strong> ${fechaEvento.toLocaleDateString()} ${fechaEvento.toLocaleTimeString()}</p>
                                <button class="btn btn-primary" onclick="addToCart('${evento.name}', 1)">Agregar al carrito</button>
                            </div>
                        </div>
                    `;

                    conciertosContainer.appendChild(card);
                    displayedArtists.push(artista);
                    artistCounts[artista]++;
                }
            });
        })
        .catch(error => console.error('Error al cargar conciertos recomendados:', error));
}