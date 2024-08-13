document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm')
    const productItems = document.getElementById('productItems')
    const editIndex = document.getElementById('editIndex')


    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || []
        productItems.innerHTML = ''
        products.forEach((product, index) => {
            const li = document.createElement('li')
            li.innerHTML = `
                <strong>${product.name}</strong><br>
                Precio: $${product.price}<br>
                Descripción: ${product.description}<br>
                Cantidad: ${product.quantity}<br>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            `;
            productItems.appendChild(li)
        });
    }


    function saveProduct(product) {
        const products = JSON.parse(localStorage.getItem('products')) || []
        const index = parseInt(editIndex.value)

        if (index === -1) {
            products.push(product)
        } else {
            products[index] = product
        }
        localStorage.setItem('products', JSON.stringify(products))
        loadProducts()
    }
    window.editProduct = function(index) {
        const products = JSON.parse(localStorage.getItem('products')) || []
        const product = products[index]

        document.getElementById('productName').value = product.name
        document.getElementById('productPrice').value = product.price
        document.getElementById('productDescription').value = product.description
        document.getElementById('productQuantity').value = product.quantity
        editIndex.value = index
        document.querySelector('button[type="submit"]').textContent = 'Actualizar Producto'
    }

    window.deleteProduct = function(index) {
        let products = JSON.parse(localStorage.getItem('products')) || []
        products.splice(index, 1)
        localStorage.setItem('products', JSON.stringify(products))
        loadProducts()
    }

    productForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = document.getElementById('productName').value
        const price = parseFloat(document.getElementById('productPrice').value)
        const description = document.getElementById('productDescription').value
        const quantity = parseInt(document.getElementById('productQuantity').value)

        const product = { name, price, description, quantity }
        saveProduct(product)

        productForm.reset()
        editIndex.value = -1
        document.querySelector('button[type="submit"]').textContent = 'Agregar Producto'
    });


    loadProducts()
})
