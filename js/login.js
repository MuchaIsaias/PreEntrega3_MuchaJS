

let registro= document.querySelector(".contenedor-registro");
let inicio= document.querySelector(".contenedor-inicio")
let login= document.querySelector(".contenedor-login")
let template_login= document.querySelector(".template-login")
let body_header=document.querySelector(".body_header")
let contenido_login = template_login.content
let clon_login=contenido_login.cloneNode(true)


class Usuario {
    constructor(id, nombre, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.carrito = [];
    }
}
let todosLosUsuarios=[]

//Funciona
registro.addEventListener('submit',(evt) => {
    let registro_nombre = registro.querySelector(".contenedor-registro_input-nombre").value;
    let registr_contraseña= registro.querySelector(".contenedor-registro_input-contraseña").value;
    todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios'))
    let usuarioExistente = todosLosUsuarios.find(usuario => usuario.nombre === registro_nombre);
    if (usuarioExistente) {
        evt.preventDefault()
        alert("Nombre de usuario ya existente")
    }else{
        let numberID = todosLosUsuarios.length + 1;
        let nuevoUsuario = new Usuario(numberID.toString(), registro_nombre, registr_contraseña);
        todosLosUsuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(todosLosUsuarios))
    }
});

todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios'))
console.log(todosLosUsuarios)
//Funciona
inicio.addEventListener('submit', () => {
    let inicio_nombre = inicio.querySelector(".contenedor-inicio_input-nombre").value;
    let inicio_contraseña = inicio.querySelector(".contenedor-inicio_input-contraseña").value;
    todosLosUsuarios = JSON.parse(localStorage.getItem('usuarios'))
    let usuarioEncontrado = false;
    todosLosUsuarios.forEach(usuario => {
        if (inicio_nombre === usuario.nombre && inicio_contraseña === usuario.contraseña) {
            usuarioEncontrado = true;
            let idUsuarioEncontrado = usuario.id;
            sessionStorage.setItem('id', idUsuarioEncontrado);
            sessionStorage.setItem('isLoggedIn', 'true');
        }
    });
    if (!usuarioEncontrado) {
        alert("Cuenta Incorrecta");
        sessionStorage.setItem('isLoggedIn', 'false');
    }
});

window.addEventListener('load', () => {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        login.style.display = "none";   
        body_header.appendChild(clon_login);
        
        let botonSesion = document.querySelector(".content-login .cerrar");
        
        if (botonSesion) {
            botonSesion.addEventListener('click', () => {
                sessionStorage.setItem('isLoggedIn', 'false');
                window.location.reload();
            });
        } else {
            console.error("No se encontró el botón de sesión");
        }
    }
}); 


function obtenerIdUsuario() {
    let idUsuarioRecuperar= sessionStorage.getItem('id')
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            return idUsuarioRecuperar
        }else{
            return null
        }
}