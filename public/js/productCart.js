const cart = JSON.parse((localStorage.getItem('tecnoCart')));
const productsContainer = document.getElementById('products-container');

document.addEventListener('DOMContentLoaded', () => {
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
                        <div class="texto-recuadro" id="menos-mas">-</div>
                        <div class="texto-recuadro">1</div>
                        <div class="texto-recuadro" id="menos-mas">+</div>
                    </div>
                </div>
                <p class="subtotal">$200</p>
            </div>
            <div class="tacho-basura">
                <i class="far fa-trash-alt" id="tachito"></i>
            </div>
        </div>
        `
        productsContainer.appendChild(divProducto);
    });
})

