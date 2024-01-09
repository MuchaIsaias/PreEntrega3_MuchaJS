let carrito_sin_login = [];
let botones_productos = document.querySelectorAll('.btn-agregar-carrito')

botones_productos.forEach(function (boton) {
    boton.addEventListener('click', function () {
        // me da el producto mas cercano al boto que le di click
        let productIdd = this.closest(".contenedor-productos").dataset.productId;

        // Agregar el producto al carrito
        agregarAlCarrito(productIdd);
    });
});
//funciona


function agregarAlCarrito(productId) {
    let userId = obtenerIdUsuario();
    let producto = obtenerProductoPorId(productId);
    if (userId) {
        let usuariosGuardados = localStorage.getItem('usuarios');
        let todosLosUsuarios = JSON.parse(usuariosGuardados);
        let usuarioEncontrado = todosLosUsuarios.find(usuario => usuario.id === userId);
        if (usuarioEncontrado) {
            usuarioEncontrado.carrito.push(producto);
            localStorage.setItem('usuarios', JSON.stringify(todosLosUsuarios));
        } else {
            console.error('Usuario no encontrado');
        }
    } else {
        carrito_sin_login.push(producto);
        sessionStorage.setItem('carritos', JSON.stringify( carrito_sin_login ));
        console.log(carrito_sin_login)
    }
}

function obtenerProductoPorId(idd) {
    return catalogoProductos.find(producto => producto.id === idd);
}