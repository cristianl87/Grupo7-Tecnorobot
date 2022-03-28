const listaProductos = document.querySelector('.lista-productos');
const producto = document.querySelector('.producto');
const cartBody = document.querySelector('#cart-body');
let carrito;

const productsOnCart = localStorage.getItem('tecnoCart');

if(productsOnCart === null) {
    carrito = [];
} else {
    carrito = JSON.parse(productsOnCart);
    carritoHTML();
}

eventListeners();

function eventListeners() {
    listaProductos.addEventListener('click', leerProducto);
}

function leerProducto(e) {
    const id = e.target.getAttribute('data-id');

    if(e.target.classList.contains('agregar-carrito')) {
        fetch('/api/products/' + id)
        .then(response => response.json())
        .then(data => {
            carrito.unshift(data);

            const carritoString = JSON.stringify(carrito);
            localStorage.setItem('tecnoCart', carritoString);

            carritoHTML();
        });
    } else {
        location.href = `/products/detail/${id}`;
    }
}

function carritoHTML() {
    limpiarHTML();
    carrito.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td> <img src="${product.mainImage}"> </td>
            <td> ${product.name} </td>
            <td> ${product.currency.symbol} ${product.price} </td>
            <td> 1 </td>
        `
        cartBody.appendChild(tr);
    });
    
}

function limpiarHTML() {
    cartBody.innerHTML = '';
}