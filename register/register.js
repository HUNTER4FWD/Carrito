document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault()

    const username = document.getElementById('username').value   
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirmPassword').value

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden')
        return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const existingUser = users.find(user => user.username === username || user.email === email)

    if (existingUser) {
        alert('El usuario o correo electrónico ya están registrados')
        return;
    }

    users.push({ username, email, password })
    localStorage.setItem('users', JSON.stringify(users))

    alert('Registro exitoso')
    this.reset()
})
