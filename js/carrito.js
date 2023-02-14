window.addEventListener("load", iniciar);
let productos = [];
let total = 0;
let usu = sessionStorage.getItem("usuario");
let items = JSON.parse(localStorage.getItem(`items_${usu}`));

/* Funcion Iniciar */
function iniciar() {
  getProducto();
  iniciarSesion();
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
}

function imprimir(productos) {
  let texto = "";

  if (items != null && sessionStorage.getItem("sesion") == "True") {
    document.getElementById("cards").innerHTML = "";
    items.forEach((element) => {
      const objeto = productos.find(
        (producto) =>
          producto.producto.toUpperCase() == element.split(":")[0].toUpperCase()
      );
      total = parseInt(objeto.precio) * parseInt(element.split(":")[1]) + total;
      texto = `<div class="card rounded-3 mb-4">
      <div class="card-body p-4">
        <div class="row d-flex justify-content-between align-items-center">
          <div class="col-md-2 col-lg-2 col-xl-2">
            <img
              src="img/${objeto.img}"
              class="img-fluid rounded-3" alt="">
          </div>
          <div class="col-md-3 col-lg-3 col-xl-3">
            <p class="lead fw-normal mb-2">${objeto.producto}</p>
            <p>Descripcion: <br><span class = "text-muted">${
              objeto.descripcion
            }</span></p>
          </div>
          <div class="col-md-3 col-lg-3 col-xl-2 d-flex " >
            <button class="btn btn-danger px-2 abajo mx-1"
              onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
              <i class="bi bi-dash-circle"></i>
            </button>
  
            <input id="form1" min="0" name="quantity" value="${
              element.split(":")[1]
            }" type="number"
              class="form-control form-control-md" />
  
            <button class="btn-success btn  px-2 arriba mx-1" 
              onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
              <i class="bi bi-plus-circle"></i>
            </button>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 text-center py-2">
            <h5 class="mb-0 text-success">${
              parseInt(objeto.precio) * parseInt(element.split(":")[1])
            }€</h5>
          </div>
          <div class="col-md-1 col-lg-1 col-xl-1 text-center">
                  <button type="button" class="btn btn-outline-danger borrar" type="button">
                    <i class="bi bi-trash"></i></button>
                  </div>
          </div>
      </div>
    </div>`;
      document.getElementById("cards").innerHTML += texto;
    });
    document.getElementById("cards").innerHTML += `<div class="card mb-5">
    <div class="card-body p-4">

      <div class="float-end">
        <p class="mb-0 me-5 d-flex align-items-center">
          <span class="small text-muted me-2">Total:</span> <span
            class="lead fw-normal text-success" id="suma">${total}€</span>
        </p>
      </div>

    </div>
  </div>

  <div class="d-flex justify-content-center">
    <a href="tienda.html" type="button" class="btn btn-light mx-3">Volver a la Tienda</a>
    <button type="button" class="btn btn-success mx-3">Pagar</button>
  </div>`;
    /* Boton borrar */
    [...document.getElementsByClassName("borrar")].forEach(function (item) {
      borrar(item);
    });
    /* Añadir y restar */
    [...document.getElementsByClassName("arriba")].forEach(function (item) {
      anadir(item);
    });
    [...document.getElementsByClassName("abajo")].forEach(function (item) {
      restar(item);
    });
  } else {
    texto = `<h1 class="Carrito Vacio"><h1>
    <div class="row">
          <div class ="col-md-5 col-12" d-flex justify-content-center >
            <p class="fs-3 text-center">No tienes ningun producto.</p>
            <a href="tienda.html" class="text-decoration-none text-success fs-6 d-flex justify-content-center">Volver a la tienda</a>
          </div>
          <div class="col-md-7 d-flex justify-content-center col-12">
            <img src="img/tree.png" alt="" style="width: 7em;">
          </div>
    </div>`;
    document.getElementById("cards").innerHTML = texto;
  }
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

function borrar(item) {
  item.addEventListener("click", function () {
    item.parentElement.parentElement.parentElement.parentElement.remove();
    let carrito = [];
    carrito = JSON.parse(localStorage.getItem(`items_${usu}`));
    let aux = carrito.indexOf(
      carrito.find((element) =>
        element.includes(
          item.parentElement.parentElement.parentElement.getElementsByClassName(
            "lead"
          )[0].textContent
        )
      )
    );
    carrito.splice(aux, 1);
    localStorage.setItem(`items_${usu}`, JSON.stringify(carrito));
    let precio = parseInt(
      item.parentElement.parentElement.querySelector("h5").textContent
    );
    total = total - precio;
    document.getElementById("suma").innerHTML = total + "€";
  });
}

function anadir(item) {
  item.addEventListener("click", function () {
    let carrito = [];
    carrito = JSON.parse(localStorage.getItem(`items_${usu}`));
    let aux = carrito.indexOf(
      carrito.find((element) =>
        element.includes(
          item.parentElement.parentElement.parentElement.getElementsByClassName(
            "lead"
          )[0].textContent
        )
      )
    );
    let cantidad =
      parseInt(item.parentElement.querySelector("input").value) - 1;
    let precio =
      parseInt(
        item.parentElement.parentElement.querySelector("h5").textContent
      ) / cantidad;
    carrito[aux] = `${carrito[aux].split(":")[0]}:${
      parseInt(carrito[aux].split(":")[1]) + 1
    }`;
    item.parentElement.parentElement.querySelector("h5").textContent =
      parseInt(
        item.parentElement.parentElement.querySelector("h5").textContent
      ) +
      precio +
      "€";
    localStorage.setItem(`items_${usu}`, JSON.stringify(carrito));
    total = total + precio;
    document.getElementById("suma").innerHTML = total + "€";
  });
}

function restar(item) {
  item.addEventListener("click", function () {
    let carrito = [];
    carrito = JSON.parse(localStorage.getItem(`items_${usu}`));
    let aux = carrito.indexOf(
      carrito.find((element) =>
        element.includes(
          item.parentElement.parentElement.parentElement.getElementsByClassName(
            "lead"
          )[0].textContent
        )
      )
    );
    let cantidad =
      parseInt(item.parentElement.querySelector("input").value) + 1;
    if (cantidad == 1) {
      borrar(item);
    } else {
      let precio =
        parseInt(
          item.parentElement.parentElement.querySelector("h5").textContent
        ) / cantidad;
      carrito[aux] = `${carrito[aux].split(":")[0]}:${
        parseInt(carrito[aux].split(":")[1]) - 1
      }`;
      item.parentElement.parentElement.querySelector("h5").textContent =
        parseInt(
          item.parentElement.parentElement.querySelector("h5").textContent
        ) -
        precio +
        "€";
      localStorage.setItem(`items_${usu}`, JSON.stringify(carrito));
      total = total - precio;
      document.getElementById("suma").innerHTML = total + "€";
    }
  });
}
