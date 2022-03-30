const cartBtn = document.querySelector('.agregar-carrito');
const cartBody = document.querySelector('#cart-body');
const cantidadCarrito = document.querySelector('.cantidad-carrito');
let carrito;

const productsOnCart = localStorage.getItem('tecnoCart');

if(productsOnCart === null) {
    carrito = [];
} else {
    carrito = JSON.parse(productsOnCart);
}

eventListeners();

function eventListeners() {
    cartBtn.addEventListener('click', leerProducto);
}

function leerProducto(e) {
    const id = e.target.getAttribute('data-id');

        fetch('/api/products/' + id)
        .then(response => response.json())
        .then(data => {
            carrito.unshift(data);

            const carritoString = JSON.stringify(carrito);
            localStorage.setItem('tecnoCart', carritoString);

            carritoHTML();
        });

}

function carritoHTML() {
    limpiarHTML();
    cantidadCarrito.textContent = carrito.length;
    carrito.forEach(product => {
        const tr = document.createElement('tr');
        const name = product.name.slice(0,24) + '...'
        tr.innerHTML = `
            <td> <img src="${product.mainImage}" width="80px"> </td>
            <td> ${name} </td>
            <td> ${product.currency.symbol} ${product.price} </td>
            <td> 1 </td>
        `
        cartBody.appendChild(tr);
    });
    
}

function limpiarHTML() {
    cartBody.innerHTML = '';
}