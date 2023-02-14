window.addEventListener("load", iniciar);
const botonBuscar = document.getElementById("botonBuscar");
const interior = document.getElementById("interior");
const aromatica = document.getElementById("aromatica");
const frutal = document.getElementById("frutal");
let productos = [];
microfono = document.getElementById("microfono");
/* Filtrar por categoria */
interior.addEventListener("click", () => {
  document.getElementById("cards").innerHTML =
    ""; /* Lo dejamos vacio para limpiar la pagina */
  productos.forEach((element) => {
    if (element.categoria == "interior") {
      imprimir(element);
    }
  });
});
aromatica.addEventListener("click", () => {
  document.getElementById("cards").innerHTML = "";
  productos.forEach((element) => {
    if (element.categoria == "aromatica") {
      imprimir(element);
    }
  });
});
frutal.addEventListener("click", () => {
  document.getElementById("cards").innerHTML = "";
  productos.forEach((element) => {
    if (element.categoria == "frutal") {
      imprimir(element);
    }
  });
});
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

microfono.addEventListener("click", () => {
  speech();
});

botonBuscar.addEventListener("click", () => {
  document.getElementById("cards").innerHTML = "";
  buscarProductos(productos);
});

/* Funcion Iniciar */
function iniciar() {
  fetchProductos();
  iniciarSesion();
}

/* Fetch */

function fetchProductos() {
  const url = `/files/productos.json`;
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((json) => fetchfiltrar(json));
}

function fetchfiltrar(myObj) {
  productos = myObj;
  for (let i = 0; i < productos.length; i++) {
    imprimir(productos[i]);
    botonCarrito();
  }
}

function imprimir(producto) {
  var texto = "";
  texto += `<div class="card py-2 px-2 mx-4 my-4 text-center" style="width: 18rem">
        <a href = 'producto.html?producto=${producto.producto}' target= '_blank'><img
          src="img/${producto.img}"
          class="card-img-top imagen"
          alt=""
        /></a>
        <div class="card-body text-center">
          <h5 class="card-title">${producto.producto}</h5>
          <p class="card-text fs-4 text-success fw-bolder my-4">${producto.precio}€</p>
          <p class="card-text text-justify">
          ${producto.descripcion}</p>
          
        </div>
        <input type="button" class="btn btn-success align-self-center my-3 carrito" value="Añadir al Carrito">
      </div>`;
  document.getElementById("cards").innerHTML += texto;
}

/* FUNCION BUSCAR  */

function buscarProductos(productos) {
  const buscador =
    document.getElementById("buscador").value; /* Cogemos el valor del input */
  var texto = "";
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].producto.toUpperCase().includes(buscador.toUpperCase())) {
      imprimir(productos[i]);
    }
  }
  document.getElementById("cards").innerHTML += texto;
}
/* FUNCION BUSCAR MICROFONO */

/* FUNCION MICROFONO */

function speech() {
  //crear el objeto Speech Recognition
  const SpeechRecognition = webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // comienza el reconocimiento
  recognition.start();

  // Detecta cuando empieza a hablar
  recognition.onstart = function () {
    microfono.classList.remove("btn-outline-success");
    microfono.className += " btn btn-outline-danger";
  };
  // Detecta cuando deja de hablar (speechend) y para el reconocimiento(stop())
  recognition.onspeechend = function () {
    microfono.classList.remove("btn-outline-danger");
    microfono.className += " btn btn-outline-success";
    recognition.stop();
  };

  //Se ejecuta cuando obtiene los resultados del reconocimiento
  recognition.onresult = function (e) {
    var transcript = e.results[0][0].transcript;
    var confidence = e.results[0][0].confidence;

    if (confidence >= 0.5) {
      document.getElementById("buscador").value = transcript;
      document.getElementById("cards").innerHTML = "";
      buscarProductos(productos); /* Buscamos en todos los archivos json */
    } else {
      alert("Lo sentimos la fiabilidad del audio es inferior al 50%");
    }
  };
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


/* FUNCIONA MEJOR CON FETCH*/

/* Funcion Para sacar datos de fichero .json 
function getJSON(fichero) {
  var xhr = new XMLHttpRequest(); //Se crea el objeto
  xhr.open("GET", `/files/${fichero}.json`, true); //Abrir una petición
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      procesarJSON(this);
    }
  };
  xhr.send();
}

 Función para procesar los datos de los arboles frutales 
function procesarJSON(xhr) {
  var jsonDoc = JSON.parse(xhr.responseText);
  var texto = "";
  for (let i = 0; i < jsonDoc.length; i++) {
    texto += `<div class="card py-2 px-2 mx-4 my-4" style="width: 18rem">
        <img
          src="img/${jsonDoc[i].img}"
          class="card-img-top imagen"
          alt=""
        />
        <div class="card-body text-center">
          <h5 class="card-title">${jsonDoc[i].producto}</h5>
          <div class="row py-2">
            <div class="col-8">
              <p class="card-text text-start">
                ${jsonDoc[i].descripcion}
              </p>
            </div>
            <div class="col-4">
              <p class="card-text fs-4 text-success fw-bolder my-4">${jsonDoc[i].precio}€</p>
            </div>
          </div>

          <a href="#" class="btn btn-success">Añadir al Carrito</a>
        </div>
      </div>`;
  }
  document.getElementById("cards").innerHTML += texto;
} */
