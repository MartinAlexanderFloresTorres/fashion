"use strict";
//===== VARIABLES =====
const productos = document.querySelector("#productos");
const colorSelect = document.querySelector("#color");
const tallaSelect = document.querySelector("#talla");
const minimoSelect = document.querySelector("#precio-minimo");
const maximoSelect = document.querySelector("#precio-maximo");
const resetearBtn = document.querySelector("#resetearBtn");
const buscarUno = document.querySelector("#buscarUno");
const buscarDos = document.querySelector("#buscarDos");
const resultadoBusquedad = document.querySelector("#resultadoBusquedad");
const user = document.querySelector("#user");

let productosFiltrados = [];
let productosGuardados = [];

const datosSelect = {
    color: "",
    talla: "",
    minimo: "",
    maximo: "",
};
let busqueda = "";

//===== EVENTOS =====
resetearBtn.addEventListener("click", () => {
    limpiarDatosSelect();
    limpiarBusqueda();
    limpiarHtml(resultadoBusquedad);
    iniciarApp();
});
colorSelect.addEventListener("change", (e) => {
    datosSelect.color = e.target.value;
    limpiarBusqueda();
    limpiarHtml(resultadoBusquedad);
    filtrar();
});
tallaSelect.addEventListener("change", (e) => {
    datosSelect.talla = e.target.value;
    limpiarBusqueda();
    limpiarHtml(resultadoBusquedad);
    filtrar();
});
minimoSelect.addEventListener("change", (e) => {
    datosSelect.minimo = parseInt(e.target.value);
    limpiarBusqueda();
    limpiarHtml(resultadoBusquedad);
    filtrar();
});
maximoSelect.addEventListener("change", (e) => {
    datosSelect.maximo = parseInt(e.target.value);
    limpiarBusqueda();
    limpiarHtml(resultadoBusquedad);
    filtrar();
});
buscarUno.addEventListener("input", (e) => {
    busqueda = e.target.value.toLowerCase();
    limpiarDatosSelect();
    filtrar();
});
let filtracion = [];
buscarDos.addEventListener("input", (e) => {
    busqueda = e.target.value.toLowerCase();
    limpiarDatosSelect();
    filtrar();
    mostrarDatos(filtracion, resultadoBusquedad);
    if (busqueda === "") {
        limpiarHtml(resultadoBusquedad);
    }
});
//===== FUNCIONES =====
function iniciarApp() {
    mostrarDatos(dbProductos, productos);
}
iniciarApp();
function toggleBanner() {
    const bannerToggle = document.querySelector("#bannerToggle");
    const productoMostrar = document.querySelector(".producto__mostrar");

    bannerToggle.addEventListener("click", () => {
        if (productoMostrar) {
            productoMostrar.classList.add("active");
            setTimeout(() => {
                productoMostrar.classList.remove("active");
            }, 2000);
        }
    });
}
function mostrarDatos(baseDeDatos, contenedor) {
    limpiarHtml(contenedor);
    baseDeDatos.forEach((producto) => {
        const { imagen, nombre, color, talla, precio, id } = producto;

        const div = document.createElement("DIV");
        div.setAttribute("data-id", id);
        if (id === 6) {
            div.id = "CasacaVerde";
        }
        if (id === 7) {
            div.classList.add("producto__mostrar");
        }
        div.classList.add("productos__item");
        div.innerHTML = `
            <div class="producto__corazon"  data-id="${id}">
                <div class="producto__heart">
                    <i class='bx bx-heart producto__ico icoUno'></i>
                    <i class='bx bxs-heart producto__ico icoDos'></i>
                </div>
            </div>
            <img src="${imagen}" alt="${nombre}" class="productos__imagen" width="100px" height="100px">
            <div class="producto__info">
                <h2 class="producto__titulo">${nombre}</h2>
                <p>Color: <span class="producto__color">${color}</span></p>
                <p>Talla: <span class="producto__talla">${talla}</span></p>
                <p>Costo: S/.<span class="producto__precio">${precio}</span></p>
                <button class="banner__botom comprar" data-id="${id}">Agregar <i class='bx bx-cart-add producto__ico'></i></button>
            </div>
        `;
        contenedor.appendChild(div);
    });
    ResultadosVacios(baseDeDatos);
    toggleBanner();
}
function limpiarHtml(contenedor) {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}
function ResultadosVacios(baseDeDatos) {
    if (baseDeDatos.length === 0) {
        const div = document.createElement("DIV");
        div.textContent = "No se encontraron resultados";
        div.classList.add("error");
        const error = document.querySelectorAll(".error");
        if (error.length === 0) {
            productos.appendChild(div);
        }
    }
}
//===== filtrado =====

function filtrar() {
    filtracion = dbProductos
        .filter(filtrarBusquedaInput)
        .filter(filtrarColor)
        .filter(filtrarTalla)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo);
    mostrarDatos(filtracion, productos);
}
function filtrarBusquedaInput(producto) {
    if (busqueda) {
        if (producto.data.toLowerCase().includes(busqueda)) {
            return producto;
        }
    } else {
        return producto;
    }
}
function limpiarBusqueda() {
    busqueda = "";
    buscarUno.value = "";
    buscarDos.value = "";
}
function limpiarDatosSelect() {
    colorSelect.options[0].selected = true;
    tallaSelect.options[0].selected = true;
    minimoSelect.options[0].selected = true;
    maximoSelect.options[0].selected = true;
    datosSelect.color = "";
    datosSelect.talla = "";
    datosSelect.minimo = "";
    datosSelect.maximo = "";
}
function filtrarColor(producto) {
    const { color } = datosSelect;
    if (color) {
        return producto.color === color;
    } else {
        return producto;
    }
}
function filtrarTalla(producto) {
    const { talla } = datosSelect;
    if (talla) {
        return producto.talla == talla;
    } else {
        return producto;
    }
}
function filtrarMinimo(producto) {
    const { minimo } = datosSelect;
    if (minimo) {
        return producto.precio >= minimo;
    } else {
        return producto;
    }
}
function filtrarMaximo(producto) {
    const { maximo } = datosSelect;
    if (maximo) {
        return producto.precio <= maximo;
    } else {
        return producto;
    }
}

//===== funcion buscar =====
const body = document.querySelector("body");
const buscarToggle = document.querySelector("#buscarToggle");
const busquedaFixed = document.querySelector("#busquedaFixed");
const busquedaFixedChevron = document.querySelector("#busquedaFixedChevron");
const menuBtn = document.querySelector("#menu");
const closeBtn = document.querySelector("#close");
const navegacion = document.querySelector("#navegacion");
const subNavegacion = document.querySelector("#sub-navegacion");
const subNavegacionDos = document.querySelector("#sub-navegacionDos");
const subnombre = document.querySelector("#nombre");
const subnombreDos = document.querySelector("#nombreDos");
const cheveronSubNavegacion = document.querySelector("#cheveron-subNavegacion");
const closeSubnavegacion = document.querySelector("#close-subnavegacion");

//===== eventos =====
buscarToggle.addEventListener("click", () => {
    busquedaFixed.classList.add("active");
    body.classList.add("active");
    if (user.classList.contains("active")) {
        user.classList.remove("active");
    }
});
busquedaFixedChevron.addEventListener("click", () => {
    busquedaFixed.classList.remove("active");
    body.classList.remove("active");
    if (user.classList.contains("active")) {
        user.classList.remove("active");
    }
});
menuBtn.addEventListener("click", () => {
    navegacion.classList.add("active");
    body.classList.add("active");
    if (user.classList.contains("active")) {
        user.classList.remove("active");
    }
});
closeBtn.addEventListener("click", () => {
    navegacion.classList.remove("active");
    body.classList.remove("active");
});
navegacion.addEventListener("click", (e) => {
    if (user.classList.contains("active")) {
        user.classList.remove("active");
    }
    if (e.target.classList.contains("navegacion__item")) {
        subnombre.textContent = e.target.textContent;
        subNavegacion.classList.add("active");
    }
    if (e.target.classList.contains("navegacion__link")) {
        navegacion.classList.remove("active");
        body.classList.remove("active");
    }
    cheveronSubNavegacion.addEventListener("click", () => {
        subNavegacion.classList.remove("active");
    });
    closeSubnavegacion.addEventListener("click", () => {
        navegacion.classList.remove("active");
        body.classList.remove("active");
        subNavegacion.classList.remove("active");
    });
    subNavegacion.addEventListener("click", (e) => {
        if (e.target.classList.contains("navegacion__item")) {
            subnombreDos.textContent = e.target.textContent;
            subNavegacionDos.classList.add("active");
            subNavegacionDos.addEventListener("click", (e) => {
                if (e.target.id === "cheveron-subNavegacionDos") {
                    subNavegacionDos.classList.remove("active");
                }
                if (e.target.id === "close-subnavegacionDos") {
                    navegacion.classList.remove("active");
                    body.classList.remove("active");
                    subNavegacion.classList.remove("active");
                    subNavegacionDos.classList.remove("active");
                }
                if (e.target.classList.contains("navegacion__link")) {
                    navegacion.classList.remove("active");
                    body.classList.remove("active");
                    subNavegacion.classList.remove("active");
                    subNavegacionDos.classList.remove("active");
                }
            });
        }
        if (e.target.classList.contains("navegacion__link")) {
            navegacion.classList.remove("active");
            body.classList.remove("active");
            subNavegacion.classList.remove("active");
        }
    });
});

////////// carrito de compras //////////
const carritoBtn = document.querySelector("#carritoBtn");
const carritoClose = document.querySelector("#carritoClose");
const carrito = document.querySelector("#carrito");
const carritoResultados = document.querySelector("#carrito__resultados");
const totalPago = document.querySelector("#totalPago");
const carritoPagarBtn = document.querySelector("#carritoPagarBtn");
const formularioContenedor = document.querySelector("#formulario-contenedor");
const formularioRetroceder = document.querySelector("#formularioRetroceder");
const notificacion = document.querySelector("#notificacion");
const notificacionDos = document.querySelector("#notificacionDos");
const carritoSpan = document.querySelector("#contador-card");
let carritoCompras = [];
//===== eventos =====
body.addEventListener("click", agregarCarrito);
carritoPagarBtn.addEventListener("click", () => {
    formularioContenedor.classList.add("active");
});
formularioRetroceder.addEventListener("click", () => {
    formularioContenedor.classList.remove("active");
});
carritoBtn.addEventListener("click", () => {
    carrito.classList.add("active");
    body.classList.add("active");
    if (user.classList.contains("active")) {
        user.classList.remove("active");
    }
});
carritoClose.addEventListener("click", () => {
    carrito.classList.remove("active");
    body.classList.remove("active");
});
carrito.addEventListener("click", funcionesCarrito);
document.addEventListener("DOMContentLoaded", () => {
    resetCarritoIndiceSpan();
    carritoCompras =
        JSON.parse(localStorage.getItem("carrito-appOnline")) || [];
    imprimirHtml();
    productosGuardados =
        JSON.parse(localStorage.getItem("arregloDeFavoritos")) || [];
    imprimirHtmlGuardado();
});
//===== funciones =====
function agregarCarrito(e) {
    if (e.target.classList.contains("comprar")) {
        const datosTarget = e.target.parentElement.parentElement;
        if (!notificacion.classList.contains("active")) {
            notificacion.classList.add("active");
            setTimeout(() => {
                notificacion.classList.remove("active");
            }, 2000);
        }
        RecoletarDatos(datosTarget);
    }
    if (e.target.classList.contains("producto__corazon")) {
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            const datosTarget = e.target.parentElement;
            notificacionDos.innerHTML = "añadiendo a Favoritos";
            if (!notificacionDos.classList.contains("active")) {
                notificacionDos.classList.add("active");
                notificacionDos.innerHTML = "añadiendo a Favoritos";
                setTimeout(() => {
                    notificacionDos.classList.remove("active");
                }, 2000);
            }
            RecoletarDatosGuardar(datosTarget);
        } else {
            notificacionDos.innerHTML = "Desañadiendo de Favoritos";
            if (!notificacionDos.classList.contains("active")) {
                notificacionDos.classList.add("active");
                notificacionDos.innerHTML = "Desañadiendo de Favoritos";
                setTimeout(() => {
                    notificacionDos.classList.remove("active");
                }, 2000);
            }
            removerProductoHtml(parseInt(e.target.getAttribute("data-id")));
        }
    }
    if (e.target.classList.contains("guardardo__borrar")) {
        removerProductoHtml(parseInt(e.target.getAttribute("data-id")));
    }
}
function funcionesCarrito(e) {
    const getDataId = parseInt(e.target.getAttribute("data-id"));

    if (e.target.classList.contains("carrito__borrar")) {
        e.preventDefault();
        borrarProducto(getDataId);
    }
    if (e.target.classList.contains("mas")) {
        e.preventDefault();
        AumentarProducto(getDataId);
    }
    if (e.target.classList.contains("menos")) {
        e.preventDefault();
        DecrementarProducto(getDataId);
    }
}
function resetCarritoIndiceSpan() {
    if (carritoCompras.length === 0) {
        carritoSpan.textContent = "";
        carritoSpan.style.display = "none";
    } else {
        carritoSpan.style.display = "grid";
    }
}
function borrarProducto(id) {
    carritoCompras = carritoCompras.filter(function (producto) {
        return producto.id !== id;
    });
    resetCarritoIndiceSpan();
    sumarTotalPago();
    HabilitarBtnPagar();
    imprimirHtml();
    registrarStorage();
}
function AumentarProducto(id) {
    const existe = carritoCompras.some(function (producto) {
        return producto.id === id;
    });
    if (existe) {
        const carritoCantidad = carritoCompras.map(function (producto) {
            if (producto.id === id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carritoCompras = [...carritoCantidad];
    } else {
        carritoCompras = [...carritoCompras];
    }
    imprimirHtml();
}
function DecrementarProducto(id) {
    const existe = carritoCompras.some(function (producto) {
        return producto.id === id;
    });
    if (existe) {
        const carritoCantidad = carritoCompras.map(function (producto) {
            if (producto.id === id) {
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                }
                return producto;
            } else {
                return producto;
            }
        });
        carritoCompras = [...carritoCantidad];
    } else {
        carritoCompras = [...carritoCompras];
    }
    imprimirHtml();
}
function RecoletarDatos(div) {
    const datosProducto = {
        imagen: div.querySelector("img").src,
        nombre: div.querySelector(".producto__titulo").textContent,
        color: div.querySelector(".producto__color").textContent,
        talla: div.querySelector(".producto__talla").textContent,
        precio: parseInt(div.querySelector(".producto__precio").textContent),
        cantidad: 1,
        id: parseInt(div.querySelector(".comprar").getAttribute("data-id")),
    };
    const existe = carritoCompras.some(function (producto) {
        return producto.id === datosProducto.id;
    });
    if (existe) {
        const actualizarCantidad = carritoCompras.map((producto) => {
            if (producto.id === datosProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        carritoCompras = [...actualizarCantidad];
    } else {
        carritoCompras = [...carritoCompras, datosProducto];
    }
    imprimirHtml();
}
function imprimirHtml() {
    limpiarHtmlCarrito();
    resetCarritoIndiceSpan();
    carritoCompras.forEach((producto, index) => {
        carritoSpan.textContent = index + 1;
        const { imagen, nombre, color, talla, precio, cantidad, id } = producto;
        const div = document.createElement("DIV");
        div.classList.add("carrito__productoContent");
        div.innerHTML = `
            <div class="carrito__producto">
                <img src="${imagen}" alt="${nombre}" class="carrito__img" width="100px" height="100px">
               <div>
                    <h3 class="carrito__nombre">${nombre}</h3>
                    <p class="carrito__info"><b>Color:</b> ${color}</p>
                    <p class="carrito__info"><b>talla:</b> ${talla}</p>
                    <p class="carrito__info"><b>precio:</b> S/.${precio}</p>
                    <div class="carrito__info carrito__info--cantidad"><b>cantidad:</b> 
                        <div class="carrito__aumentos">
                            <i class='bx bx-minus menos' data-id="${id}"></i>
                            <span class="cantidad">${cantidad}</span>
                            <i class='bx bx-plus mas' data-id="${id}"></i>
                        </div>
                    </div>
                    <a class="carrito__borrar" data-id="${id}" href="#">Borrar <i class='bx bx-trash borrar__ico'></i></a>
               </div>
            </div>
        `;
        carritoResultados.appendChild(div);
        sumarTotalPago();
        HabilitarBtnPagar();
        registrarStorage();
    });
}
function limpiarHtmlCarrito() {
    while (carritoResultados.firstChild) {
        carritoResultados.removeChild(carritoResultados.firstChild);
    }
}
function registrarStorage() {
    localStorage.setItem("carrito-appOnline", JSON.stringify(carritoCompras));
}
let total = 0;
function sumarTotalPago() {
    const totalApagar = carritoCompras.reduce(function (total, producto) {
        return total + producto.precio * producto.cantidad;
    }, 0);
    totalPago.textContent = totalApagar;
}
function HabilitarBtnPagar() {
    if (carritoCompras.length === 0) {
        carritoPagarBtn.style.display = "none";
    } else {
        carritoPagarBtn.style.display = "flex";
    }
}

/////////// validar formulario de pagar //////////
const formularioPagar = document.querySelector("#formulario-pagar");
const email = document.querySelector(".formulario__email");
const nombre = document.querySelector(".formulario__nombre");
const apellidos = document.querySelector(".formulario__apellidos");
const direccion = document.querySelector(".formulario__direccion");
const tarjeta = document.querySelector(".formulario__tarjeta");
const numero = document.querySelector(".formulario__numero");
const caducidad = document.querySelector(".formulario__caducidad");
const cvv = document.querySelector(".formulario__cvv");
const titulo = document.querySelector(".formulario__titular");
const ciudad = document.querySelector(".formulario__ciudad");
const provincia = document.querySelector(".formulario__provincia");
const codigo = document.querySelector(".formulario__codigo");
const formularioSpiner = document.querySelector(".formulario__spiner");

const footerFormulario = document.querySelector(".footer__formulario");
const footerEmail = document.querySelector(".footer__email");
const footerBoton = document.querySelector(".footer__boton");
const footerSpiner = document.querySelector(".footer__spiner");
const footerMensaje = document.querySelector(".footer__mensaje");

const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//===== eventos =====
formularioPagar.addEventListener("submit", validadFormulario);
footerFormulario.addEventListener("submit", validadFormularioFooter);

//===== funciones =====
function validadFormularioFooter(e) {
    e.preventDefault();
    if (er.test(footerEmail.value)) {
        footerEmail.style.display = "none";
        footerBoton.style.display = "none";
        footerSpiner.style.display = "block";
        footerMensaje.style.display = "none";
        setTimeout(() => {
            footerSpiner.style.display = "none";
            footerMensaje.style.display = "block";
            footerMensaje.classList.add("correcto");
            footerMensaje.textContent = "Datos Enviados Correctamente";
            setTimeout(() => {
                footerMensaje.style.display = "none";
                footerMensaje.classList.remove("correcto");
                footerMensaje.textContent = "";
                footerEmail.style.display = "block";
                footerBoton.style.display = "block";
                footerSpiner.style.display = "none";
                footerFormulario.reset();
            }, 2500);
        }, 3000);
    } else {
        footerMensaje.style.display = "block";
        footerMensaje.classList.add("error");
        footerMensaje.textContent = "Email invalido";
        setTimeout(() => {
            footerMensaje.style.display = "none";
            footerMensaje.classList.remove("error");
            footerMensaje.textContent = "";
        }, 2500);
    }
}
function validadFormulario(e) {
    e.preventDefault();
    if (
        !er.test(email.value) ||
        nombre.value === "" ||
        apellidos.value === "" ||
        direccion.value === "" ||
        tarjeta.value === "" ||
        numero.value === "" ||
        caducidad.value === "" ||
        cvv.value === "" ||
        titulo.value === "" ||
        ciudad.value === "" ||
        provincia.value === "" ||
        codigo.value === ""
    ) {
        if (er.test(email.value)) {
            camposVacios("Todo los Campos son Obligatorios");
        } else {
            camposVacios("Email Invalido");
        }
    } else {
        enviarFormulario();
    }
}
function camposVacios(mensaje) {
    const div = document.createElement("DIV");
    div.textContent = mensaje;
    div.classList.add("formulario__error");
    const campoError = document.querySelectorAll(".formulario__error");
    if (campoError.length === 0) {
        formularioPagar.insertBefore(div, formularioPagar.children[12]);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}
const formularioTexto = document.querySelector(".formulario__texto");
function enviarFormulario() {
    formularioPagar.style.display = "none";
    formularioSpiner.style.display = "flex";
    setTimeout(() => {
        formularioSpiner.style.display = "none";
        const div = document.createElement("DIV");
        div.textContent = "Datos Enviados Correctamente";
        div.classList.add("formulario__correcto");

        const formularioCorrecto = document.querySelectorAll(
            ".formulario__correcto"
        );
        if (formularioCorrecto.length === 0) {
            formularioTexto.appendChild(div);
            setTimeout(() => {
                formularioPagar.style.display = "grid";
                formularioSpiner.style.display = "none";
                div.remove();
                formularioPagar.reset();
                formularioContenedor.classList.remove("active");
                carrito.classList.remove("active");
                body.classList.remove("active");
                carritoCompras = [];
                sumarTotalPago();
                HabilitarBtnPagar();
                resetCarritoIndiceSpan();
                registrarStorage();
                imprimirHtml();
            }, 2000);
        }
    }, 3500);
}

////////// favoritos //////////
//===== variables =====
const favoritosIco = document.querySelector("#header-favoritosIco");
const guardado = document.querySelector("#guardado");
const guardadoClose = document.querySelector("#guardado__close");
const guardadoResultados = document.querySelector(".guardado__resultados");
const carritoFavoritos = document.querySelector("#contador-favoritos");

//===== eventos =====
favoritosIco.addEventListener("click", () => {
    guardado.classList.add("active");
    body.classList.add("active");
    if (user.classList.contains("active")) {
        user.classList.remove("active");
    }
});
guardadoClose.addEventListener("click", () => {
    guardado.classList.remove("active");
    body.classList.remove("active");
});

//===== funciones =====
function RecoletarDatosGuardar(div) {
    const datosProducto = {
        imagen: div.querySelector("img").src,
        nombre: div.querySelector(".producto__titulo").textContent,
        color: div.querySelector(".producto__color").textContent,
        talla: div.querySelector(".producto__talla").textContent,
        precio: parseInt(div.querySelector(".producto__precio").textContent),
        id: parseInt(div.querySelector(".comprar").getAttribute("data-id")),
    };
    const existe = productosGuardados.some((producto) => {
        return producto.id === datosProducto.id;
    });
    if (existe) {
        const productoGuardado = productosGuardados.filter((producto) => {
            if (producto.id === datosProducto.id) {
                return producto;
            } else {
                return producto;
            }
        });
        productosGuardados = [...productoGuardado];
    } else {
        productosGuardados = [...productosGuardados, datosProducto];
    }
    imprimirHtmlGuardado();
}
function removerProductoHtml(id) {
    productosGuardados = productosGuardados.filter((producto) => {
        return producto.id !== id;
    });
    imprimirHtmlGuardado();
}
function imprimirHtmlGuardado() {
    limpiarHtmlGuardado();
    productosGuardados.forEach((producto, index) => {
        const { imagen, nombre, color, talla, precio, id } = producto;
        carritoFavoritos.textContent = index + 1;
        const div = document.createElement("DIV");
        div.classList.add("guardado__item");
        div.innerHTML = `
            <i class='bx bxs-x-circle guardardo__borrar' data-id="${id}"></i>
            <img src="${imagen}" alt="${imagen}" class="productos__imagen" width="100px" height="100px">
            <div class="producto__info">
                <h2 class="producto__titulo">${nombre}</h2>
                <p>Color: <span class="producto__color">${color}</span></p>
                <p>Talla: <span class="producto__talla">${talla}</span></p>
                <p>Costo: S/.<span class="producto__precio">${precio}</span></p>
                <i class='bx bx-cart-add guardado__ico comprar' data-id="${id}"></i>
            </div>
        `;
        guardadoResultados.appendChild(div);
    });
    localStorage.setItem(
        "arregloDeFavoritos",
        JSON.stringify(productosGuardados)
    );
    resetCarritoIndiceVaforitos();
}
function limpiarHtmlGuardado() {
    while (guardadoResultados.firstChild) {
        guardadoResultados.removeChild(guardadoResultados.firstChild);
    }
}
function resetCarritoIndiceVaforitos() {
    if (productosGuardados.length === 0) {
        carritoFavoritos.textContent = "";
        carritoFavoritos.style.display = "none";
        favoritosIco.classList.remove("rojo");
    } else {
        carritoFavoritos.style.display = "grid";
        favoritosIco.classList.add("rojo");
    }
}

////////// cambiar thema //////////
const toggleUser = document.querySelector("#toggleUser");
const thema = document.querySelector("#thema");
toggleUser.addEventListener("click", () => {
    user.classList.toggle("active");
});
thema.addEventListener("click", () => {
    thema.classList.toggle("active");
    body.classList.toggle("oscuro");
    if (!body.classList.contains("oscuro")) {
        localStorage.setItem("modo-fashion", "claro");
    } else {
        localStorage.setItem("modo-fashion", "oscuro");
    }
});
let getModo = localStorage.getItem("modo-fashion") || "";
if (getModo === "oscuro") {
    thema.classList.toggle("active");
    body.classList.toggle("oscuro");
} else {
    thema.classList.remove("active");
    body.classList.remove("oscuro");
}

/* ////////// navegacion items //////////
const navegacion  = document.querySelector(".navegacion__items") */
