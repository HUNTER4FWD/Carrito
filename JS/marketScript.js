
let currentSlide = 0

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img')
    if (index >= slides.length) currentSlide = 0
    if (index < 0) currentSlide = slides.length - 1
    const newTransform = -currentSlide * 100
    document.querySelector('.carousel-images').style.transform = `translateX(${newTransform}%)`
}

function autoSlide() {
    currentSlide++
    showSlide(currentSlide)
}

showSlide(currentSlide)
setInterval(autoSlide, 3000)


let carritoVisible = false

document.addEventListener('DOMContentLoaded', ready)

function ready() {
    cargarCarritoDesdeLocalStorage()

    document.querySelectorAll('.btnEliminar').forEach(button => {
        button.addEventListener('click', eliminarItemCarrito)
    })

    document.querySelectorAll('.sumarCantidad').forEach(button => {
        button.addEventListener('click', sumarCantidad)
    })

    document.querySelectorAll('.restarCantidad').forEach(button => {
        button.addEventListener('click', restarCantidad)
    })

    document.querySelectorAll('.btnItem').forEach(button => {
        button.addEventListener('click', agregarAlCarritoClicked)
    })

    document.querySelector('.btnPagar').addEventListener('click', pagarClicked)
}

function pagarClicked() {
    const carritoItems = document.querySelector('.carritoItems')

    if (carritoItems.childElementCount === 0) {
        alert("No hay nada que pagar")
    } else {
        alert("Gracias por la compra")
        carritoItems.innerHTML = ''
        actualizarTotalCarrito()
        ocultarCarrito()
        localStorage.removeItem('carritoItems')
    }
}

function agregarAlCarritoClicked(event) {
    const button = event.target
    const item = button.closest('.item')
    const titulo = item.querySelector('.tituloItem').innerText
    const precio = item.querySelector('.precioItem').innerText
    const imagenSrc = item.querySelector('.imgItem').src

    agregarItemAlCarrito(titulo, precio, imagenSrc)
    guardarCarritoEnLocalStorage()
    hacerVisibleCarrito()
}

function hacerVisibleCarrito() {
    carritoVisible = true
    const carrito = document.querySelector('.carrito')
    carrito.style.marginRight = '0'
    carrito.style.opacity = '1'

    const items = document.querySelector('.contenedorItems')
    items.style.width = '60%'
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const itemsCarrito = document.querySelector('.carritoItems')
    const nombresItemsCarrito = itemsCarrito.querySelectorAll('.carritoItemTitulo')
    for (const nombre of nombresItemsCarrito) {
        if (nombre.innerText === titulo) {
            alert("El item ya se encuentra en el carrito")
            return
        }
    }

    const itemCarritoContenido = `
        <div class="carritoItem">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carritoItemDetalles">
                <span class="carritoItemTitulo">${titulo}</span>
                <div class="selectorCantidad">
                    <i class="fa-solid fa-minus restarCantidad"></i>
                    <input type="text" value="1" class="carritoItemCantidad" disabled>
                    <i class="fa-solid fa-plus sumarCantidad"></i>
                </div>
                <span class="carritoItemPrecio">${precio}</span>
            </div>
            <button class="btnEliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    
    const item = document.createElement('div')
    item.classList.add('item')
    item.innerHTML = itemCarritoContenido
    itemsCarrito.appendChild(item)

    item.querySelector('.btnEliminar').addEventListener('click', eliminarItemCarrito)
    item.querySelector('.restarCantidad').addEventListener('click', restarCantidad)
    item.querySelector('.sumarCantidad').addEventListener('click', sumarCantidad)

    actualizarTotalCarrito()
}

function sumarCantidad(event) {
    const buttonClicked = event.target
    const selector = buttonClicked.parentElement
    let cantidadActual = parseInt(selector.querySelector('.carritoItemCantidad').value)
    cantidadActual++
    selector.querySelector('.carritoItemCantidad').value = cantidadActual
    actualizarTotalCarrito()
    guardarCarritoEnLocalStorage()
}

function restarCantidad(event) {
    const buttonClicked = event.target
    const selector = buttonClicked.parentElement
    let cantidadActual = parseInt(selector.querySelector('.carritoItemCantidad').value)
    if (cantidadActual > 1) {
        cantidadActual--
        selector.querySelector('.carritoItemCantidad').value = cantidadActual
        actualizarTotalCarrito()
        guardarCarritoEnLocalStorage()
    }
}

function eliminarItemCarrito(event) {
    const buttonClicked = event.target
    buttonClicked.closest('.carritoItem').remove()
    actualizarTotalCarrito()
    ocultarCarrito()
    guardarCarritoEnLocalStorage()
}

function ocultarCarrito() {
    const carritoItems = document.querySelector('.carritoItems')
    if (carritoItems.childElementCount === 0) {
        const carrito = document.querySelector('.carrito')
        carrito.style.marginRight = '-100%'
        carrito.style.opacity = '0'
        carritoVisible = false
        
        const items = document.querySelector('.contenedorItems')
        items.style.width = '100%'
    }
}

function actualizarTotalCarrito() {
    const carritoItems = document.querySelectorAll('.carritoItem')
    let total = 0
    carritoItems.forEach(item => {
        const precioElemento = item.querySelector('.carritoItemPrecio')
        const precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''))
        const cantidadItem = parseInt(item.querySelector('.carritoItemCantidad').value)
        total += (precio * cantidadItem)
    })
    total = Math.round(total * 100) / 100
    document.querySelector('.carritoPrecioTotal').innerText = `$${total.toLocaleString("es")},00`
}

function guardarCarritoEnLocalStorage() {
    const carritoItems = document.querySelectorAll('.carritoItem')
    const items = []

    carritoItems.forEach(item => {
        const titulo = item.querySelector('.carritoItemTitulo').innerText
        const precio = item.querySelector('.carritoItemPrecio').innerText
        const imagenSrc = item.querySelector('img').src
        const cantidad = item.querySelector('.carritoItemCantidad').value
        items.push({ titulo, precio, imagenSrc, cantidad })
    })

    localStorage.setItem('carritoItems', JSON.stringify(items))
}

function cargarCarritoDesdeLocalStorage() {
    const items = JSON.parse(localStorage.getItem('carritoItems'))
    if (items) {
        items.forEach(item => {
            agregarItemAlCarrito(item.titulo, item.precio, item.imagenSrc)

            const carritoItems = document.querySelector('.carritoItems')
            const cantidadInput = carritoItems.querySelectorAll('.carritoItemCantidad')[0]
            cantidadInput.value = item.cantidad
        })
        actualizarTotalCarrito()
        hacerVisibleCarrito()
    }
}
