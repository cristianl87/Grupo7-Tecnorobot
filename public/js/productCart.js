let cart = JSON.parse((localStorage.getItem('tecnoCart')));
const productsContainer = document.getElementById('products-container');
const articulosCarrito = document.querySelector('.articulo-carrito');
const totalCarrito = cart.reduce((total, product) => total + parseInt(product.price), 0);


document.addEventListener('DOMContentLoaded', () => {
    if(cart == null || cart.length == 0) {
        productsContainer.innerHTML = `<h2 class="noProducts">No hay productos en el carrito <a class="toStore" href="/products">Ir a la Tienda <i class="fas fa-store-alt"></i> </a> </h2>`;
    } else {

        cart.forEach(product => {

        const divProducto = document.createElement('div');
        divProducto.innerHTML = `
        <div class="producto-carrito">
            <img class="imagen-producto-carrito" src=${product.mainImage} alt="Imagen Producto">
            <p class="titulo-producto-carrito">${product.name}</p>
            <div class="valores-producto-desktop">
                <p class="precio-unitario">${product.currency.symbol} ${product.price}</p>
                <div class="cantidad-producto">
                    <div class="recuadro-cantidad">
                    <form>
                        <input type="number" id="quantity" value="1" min="1" max="10" onClick="recalcularSubtotal(this)">
                    </form>
                    </div>
                </div>
                <p class="subtotal"></p>
            </div>
            <div class="tacho-basura">
                <i class="far fa-trash-alt delete" id="tachito" data-id="${product.id}"></i>
            </div>
        </div>
        `
        productsContainer.appendChild(divProducto);
    });
    }
    articulosCarrito.addEventListener('click', deleteProduct);
})

function deleteProduct(e) {
    if(e.target.classList.contains('delete')) {
        const id = e.target.dataset.id;
        const newCart = cart.filter(product => product.id != id);
        console.log(newCart);
        localStorage.setItem('tecnoCart', JSON.stringify(newCart));
        location.reload();
    }
    
}

function recalcularSubtotal(e) {
    const cantidad = e.value;
    // const precio = e.target.parentElement.parentElement.querySelector('.precio-unitario').textContent;
    // const subtotal = cantidad * precio;
    // e.target.parentElement.parentElement.querySelector('.subtotal').textContent = subtotal;
}