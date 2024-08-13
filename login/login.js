document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        alert('Inicio de sesión exitoso')
        window.location.href = 'http://127.0.0.1:5500/admin/admin.html' 
    } else {
        alert('Usuario o contraseña incorrectos')
    }
})

