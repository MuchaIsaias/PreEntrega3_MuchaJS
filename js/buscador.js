
let formularioBusqueda = document.getElementById('formularioBusqueda');
let buscadorInput = document.getElementById('buscador');
let listaProductos = document.getElementById('listaProductos');

// Función para manejar la búsqueda y actualizar la lista de productos
function manejarBusqueda(event) {
    event.preventDefault()
        let busqueda = buscadorInput.value.toLowerCase();
        let productosFiltrados = catalogoProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda)
    );
    listaProductos.innerHTML = '';
    sessionStorage.setItem('productosFiltrados', JSON.stringify(productosFiltrados));
    window.location.href = 'resultadodebusqueda.html';
}

formularioBusqueda.addEventListener('submit', manejarBusqueda);
