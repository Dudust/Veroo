let osmUrl; // url
let map; // mapa
let markerGroup; // marcadores
let myIcon = L.icon({
  iconUrl: "../img/marcador.png",
  iconSize: [50, 50],
  iconAnchor: [20, 15],
});
window.addEventListener("load", iniciar());

function iniciar() {
  // Creamos el mapa
  (osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    (osmAttrib =
      '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'),
    (osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }));
  // Esto de setView sirve para situar la cámara, las coordenadas desde las que
  map = L.map("map")
    .setView([40.39733967747982, -3.9968454603582293], 13)
    .addLayer(osm);
  markerGroup = L.layerGroup().addTo(map);

  showMap();
  iniciarSesion();
}

// Comprueba si has hecho el mapa entero
function setFullMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showFullMap);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// Añade el marcador de Veroo
function showMap() {
  L.marker([40.3971436, -3.996824], { icon: myIcon })
    .addTo(map)
    .bindPopup("Veroo")
    .openPopup()
    .addTo(map);
}

// Añade el marcador de tu localización
function showFullMap(position) {
  L.marker([position.coords.latitude, position.coords.longitude], {
    icon: myIcon,
  })
    .addTo(map)
    .bindPopup("Tu localización")
    .openPopup()
    .addTo(map);
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
        let usus = localStorage.getItem("usuarios");
        usus += `${usuario}-${contrasena};`;
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

