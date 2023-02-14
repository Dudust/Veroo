window.addEventListener("load", iniciar);
let productos = [];
/* Funcion Iniciar */
function iniciar() {
  for (let i = 0; i < 4; i++) {
    getProducto();
  }
  iniciarSesion();
  preguntarCookie();
}
/* FUNCION Añadir al Carrito */
function botonCarrito() {
  [...document.getElementsByClassName("carrito")].forEach(function (item) {
    item.addEventListener("click", function () {
      if (sessionStorage.getItem("sesion") == "True") {
        let usu = sessionStorage.getItem("usuario");
        let carrito = [];
        if (localStorage.getItem(`items_${usu}`) != null) {
          carrito = JSON.parse(localStorage.getItem(`items_${usu}`));
          let aux = carrito.indexOf(
            carrito.find((element) =>
              element.includes(item.parentElement.querySelector("h5").innerText)
            )
          );
          if (aux != -1) {
            carrito[aux] = `${carrito[aux].split(":")[0]}:${
              parseInt(carrito[aux].split(":")[1]) + 1
            }`;
            localStorage.setItem(`items_${usu}`, JSON.stringify(carrito));
          } else {
            carrito.push(
              item.parentElement.querySelector("h5").innerText + ":1"
            );
            localStorage.setItem(`items_${usu}`, JSON.stringify(carrito));
          }
        } else {
          carrito.push(item.parentElement.querySelector("h5").innerText + ":1");
          localStorage.setItem(`items_${usu}`, JSON.stringify(carrito));
        }
      } else {
        alert("Debe Iniciar Sesion antes de Comprar");
      }
    });
  });
}

/* Funcion Para sacar datos de fichero frutal.json */
function getProducto() {
  var xhr = new XMLHttpRequest(); //Se crea el objeto
  xhr.open("GET", `/files/productos.json`, true); //Abrir una petición
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      procesarProducto(this);
    }
  };
  xhr.send();
}

/* Función para procesar los datos de los arboles frutales */
function procesarProducto(xhr) {
  productos = JSON.parse(xhr.responseText);
  imprimir(productos);
  botonCarrito();
}

function imprimir(productos) {
  var random = Math.round(Math.random() * productos.length);
  var texto = "";
  texto += `<div class="card py-2 px-2 mx-4 my-4 text-center" style="width: 18rem">
    <a href = 'producto.html?producto=${productos[random].producto}' target= '_blank'><img
    src="img/${productos[random].img}"
    class="card-img-top imagen"
    alt=""
    /></a>
   <div class="card-body text-center">
    <h5 class="card-title">${productos[random].producto}</h5>
    <p class="card-text fs-4 text-success fw-bolder my-4">${productos[random].precio}€</p>
    <p class="card-text text-justify">
    ${productos[random].descripcion}</p>
    
    </div>
    <input type="button" class="btn btn-success align-self-center my-3 carrito" value="Añadir al Carrito">
    </div>`;
  document.getElementById("cards").innerHTML += texto;
}

/* FUNCION INICIAR SESION */
function cerrrarSesion() {
  document.getElementById("cerrarsesion").addEventListener("click", () => {
    sessionStorage.setItem("sesion", "False");
    sessionStorage.setItem("usuario", "");
    document.getElementById("login").innerHTML = "";
    document.getElementById("login").innerHTML = `
        <div class="px-3 py-2 dropdown-item">
        <input
          type="text"
          id="usuario"
          class="form-control"
          placeholder="Usuario"
          required="required"
        />
      </div>
      <div class="px-3 py-2 dropdown-item">
        <input
          type="password"
          id="contrasena"
          class="form-control"
          placeholder="Contraseña"
          required="required"
        />
      </div>
      <input type="button" id="login_button" class="btn btn-success" value="Login" />
      <div class="text-center mt-2 dropdown-item">
        <p id="registro" class="fs-6 text-capitalize">
          Registrate Aquí
        </p>
      </div>`;
    darseAlta();
  });
}
function iniciarSesion() {
  if (sessionStorage.getItem("sesion") == "True") {
    document.getElementById("login").innerHTML = "";
    document.getElementById("login").innerHTML = `
                <p class="fs-6 text-capitalize px-3">${sessionStorage.getItem(
                  "usuario"
                )}</p>
                <input
                  type="button"
                  id="cerrarsesion"
                  class="btn btn-success btn-block"
                  value="Cerrar Session"
                />
              `;
    cerrrarSesion();
    notificacion();
  } else {
    darseAlta();
    document.getElementById("login_button").addEventListener("click", () => {
      let usuario = document.getElementById("usuario").value;
      let contrasena = document.getElementById("contrasena").value;
      let usuarios = localStorage.getItem("usuarios");
      let aux = usuarios.split(";");
      let bol = false;
      if (usuarios != null) {
        for (let i = 0; i < aux.length; i++) {
          let aux2 = aux[i].split("-");
          if (
            usuario.toUpperCase() == aux2[0].toUpperCase() &&
            contrasena == aux2[1]
          ) {
            sessionStorage.setItem("sesion", "True");
            sessionStorage.setItem("usuario", usuario);
            bol = true;
          }
        }
        if (bol == false) {
          alert("Usuario o Contraseña incorrectos");
        } else {
          document.getElementById("login").innerHTML = "";
          document.getElementById("login").innerHTML = `
                <p class="fs-6 text-capitalize px-3">${sessionStorage.getItem(
                  "usuario"
                )}</p>
                <input
                  type="button"
                  id="cerrarsesion"
                  class="btn btn-success btn-block"
                  value="Cerrar Session"
                />
              `;
        }
        cerrrarSesion();
        notificacion();
      }
    });
  }
}
function darseAlta() {
  document.getElementById("registro").addEventListener("click", () => {
    document.getElementById("login").innerHTML = "";
    document.getElementById("login").innerHTML = `
          <p class="fs-6 text-capitalize px-3">Create una cuenta!</p>
          <div class="form-group px-3 py-2">
            <input
              type="text"
              id="nuevo_usuario"
              class="form-control px-3 py-2"
              placeholder="Usuario"
              required="required"
            />
          </div>
          <div class="form-group px-3 py-2">
            <input
              type="password"
              id="nueva_contrasena"
              class="form-control px-3 py-2"
              placeholder="Contraseña"
              required="required"
            />
          </div>
          <input
            type="button"
            id="darse_alta"
            class="btn btn-success btn-block"
            value="Registrate"
          />
        `;
    document.getElementById("darse_alta").addEventListener("click", () => {
      const usuario = document.getElementById("nuevo_usuario").value;
      const contrasena = document.getElementById("nueva_contrasena").value;
      const expresion =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_+-,\$%\^&\*])(?=.{8,})/;
      if (expresion.test(contrasena)) {
        let usus;
        if (localStorage.getItem("usuarios") != null) {
          usus = localStorage.getItem("usuarios");
          usus += `${usuario}-${contrasena};`;
        } else {
          usus = `${usuario}-${contrasena};`;
        }
        localStorage.setItem("usuarios", usus);
        alert("Usuario registrado Correctamente");
        document.getElementById("login").innerHTML = "";
        document.getElementById("login").innerHTML = `
        <div class="px-3 py-2 dropdown-item">
        <input
          type="text"
          id="usuario"
          class="form-control"
          placeholder="Usuario"
          required="required"
        />
      </div>
      <div class="px-3 py-2 dropdown-item">
        <input
          type="password"
          id="contrasena"
          class="form-control"
          placeholder="Contraseña"
          required="required"
        />
      </div>
      <input type="button" id="login_button" class="btn btn-success" value="Login" />
      <div class="text-center mt-2 dropdown-item">
        <p id="registro" class="fs-6 text-capitalize">
          Registrate Aquí
        </p>
      </div>`;
        iniciarSesion();
      } else {
        alert(
          "La contraseña debe contener Mayusculas, Minusculas un simbolo y mas de 8 caracteres."
        );
      }
    });
  });
}
function notificacion() {
  Notification.requestPermission().then((resultado) => {
    console.log("El resultado es ", resultado);
  });
  if (Notification.permission == "granted") {
    const notificacion = new Notification(
      `Hola ${sessionStorage.getItem("usuario")}, ¿ Cómo Estas?`,
      {
        body: "Bienvenido a Veroo",
        icon: "../img/manzano.jpg",
      }
    );
  }
}

/* Cookies */
function preguntarCookie() {
  document.getElementById(
    "cookies"
  ).innerHTML = `<div id="cb-cookie-banner1" class="alert alert-light text-center mb-0" role="alert">
  Aceptas las cookies??
  
  <button type="button" class="btn btn-success btn-sm ms-3" onclick="mostrarCookie()">
  SI
  </button>
  <button type="button" class="btn btn-success btn-sm ms-3" onclick="mostrarCookieRechazada()">
  NO
  </button>
  </div>`;
}

function mostrarCookie() {
  document.getElementById("cb-cookie-banner1").style.display = "none";

  document.getElementById(
    "cookies"
  ).innerHTML = `<div id="cb-cookie-banner" class="alert alert-light text-center mb-0" role="alert">
  🍪 Este sitio web usa cookies para funcionar correctamente. Gracias por aceptarlas.
  
  
  <button type="button" class="btn btn-success btn-sm ms-3" onclick="ocultarCookie()">
  ocultar
  </button>
  </div>`;
  document.cookie = `precio=Math.random()*100`;
}

function mostrarCookieRechazada() {
  document.getElementById("cb-cookie-banner1").style.display = "none";
  document.getElementById(
    "cookies"
  ).innerHTML = `<div id="cb-cookie-banner" class="alert alert-light text-center mb-0" role="alert">
  Has rechazado las cookies.
  
  <button type="button" class="btn btn-success btn-sm ms-3" onclick="ocultarCookie()">
  Aceptar
  </button>
  </div>`;
}

function ocultarCookie() {
  document.getElementById("cb-cookie-banner").style.display = "none";
}
