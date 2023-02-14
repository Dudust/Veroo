window.addEventListener("load", iniciar);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const producto = urlParams.get("producto");

function iniciar() {
    imprimir();
}

function imprimir() {
  const url = `/files/productos.json`;
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((json) => buscarIndividual(json));
}

function buscarIndividual(myObj) {
  var texto = "";
  for (let i = 0; i < myObj.length; i++) {
    switch (myObj[i].categoria) {
      case "interior":
        if (myObj[i].producto.toUpperCase().includes(producto.toUpperCase())) {
          texto += `<div class="row">
            <div class="col-12 col-md-4">
              <p id="producto" class="fs-1 fw-semibold p-3 my-0 text-center">${myObj[i].producto}</p>
              <p id="descripcion" class="fs-5 fw-semibold p-3 my-0 text-justify"> Descripcion: ${myObj[i].descripcion}</p>
              <p id="luz" class="fs-5 fw-semibold p-3 my-0"><i class="bi bi-sun-fill mx-2"></i>${myObj[i].luz}</p>
              <p id="dificultad" class="fs-5 fw-semibold p-3 my-0"> Dificultad: ${myObj[i].dificultad}</p>
              <p id="precio" class="fs-5 text-success fw-bolder p-3 my-0">${myObj[i].precio}€</p>
            </div>
            <div class="col-12 col-sm-8 text-center">
                <img src="img/${myObj[i].img}" alt="" style="width: 19rem; heigth: 19rem">
            </div>
          </div>`;
        }
        break;
      case "frutal":
        if (myObj[i].producto.toUpperCase().includes(producto.toUpperCase())) {
          texto += `<div class="row">
          <div class="col-12 col-md-4">
            <p id="producto" class="fs-1 fw-semibold p-3 my-0 text-center">${myObj[i].producto}</p>
            <p id="descripcion" class="fs-5 fw-semibold p-3 my-0 text-justify"> Descripcion: ${myObj[i].descripcion}</p>
            <p id="suelo" class="fs-5 fw-semibold p-3 my-0">Suelo: ${myObj[i].suelo}</p>
            <p id="temperatura" class="fs-5 fw-semibold p-3 my-0"><i class="bi bi-thermometer-half mx-2"></i> ${myObj[i].temperatura}</p>
            <p class="fs-5 text-success fw-bolder p-3 my-0">${myObj[i].precio}€</p>
          </div>
          <div class="col-12 col-md-8 text-center">
              <img src="img/${myObj[i].img}" alt="" style="width: 25rem; heigth: 19rem">
          </div>
        </div>`;
        }
        break;

      case "aromatica":
        if (myObj[i].producto.toUpperCase().includes(producto.toUpperCase())) {
          texto += `<div class="row">
          <div class="col-12 col-md-4">
            <p id="producto" class="fs-1 fw-semibold p-3 my-0 text-center">${myObj[i].producto}</p>
            <p id="descripcion" class="fs-5 fw-semibold p-3 my-0 text-justify"> Descripcion: ${myObj[i].descripcion}</p>
            <p id="suelo" class="fs-5 fw-semibold p-3 my-0">Suelo: ${myObj[i].suelo}</p>
            <p id="luz" class="fs-5 fw-semibold p-3 my-0"><i class="bi bi-sun-fill mx-2"></i>${myObj[i].luz}</p>
            <p id="cosecha" class="fs-5 fw-semibold p-3 my-0">Cosecha:  ${myObj[i].cosecha}</p>
            <p class="fs-5 text-success fw-bolder p-3 my-0">${myObj[i].precio}€</p>
          </div>
          <div class="col-12 col-md-8 text-center">
              <img src="img/${myObj[i].img}" alt="" style="width: 25rem; heigth: 19rem">
          </div>
        </div>`;
        }
        break;

      default:
        break;
    }
  }
  document.getElementById("content").innerHTML += texto;
}
