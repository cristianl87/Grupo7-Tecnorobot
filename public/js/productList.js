
const listaProductos = document.querySelector('.lista-productos');
const agregarCarrito = document.querySelector('.add-to-cart');

eventListeners();

function eventListeners() {
    listaProductos.addEventListener('click', leerProducto);
}

function leerProducto(e) {
    const productId = e.target.getAttribute('data-id');
    location.href = '/products/detail/' + productId;
}