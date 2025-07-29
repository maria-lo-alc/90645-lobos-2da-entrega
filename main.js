
const valor1USD = {
    ARS : 1257.24,
    EUR : 0.852
};
const valor1EUR = {
    ARS: 1474.07,
    USD: 1.172
}
const valor1ARS = {
    USD: 0.0007953,
    EUR: 0.000678394
}

let historial = [];


function obtenerImporte () {
 return Number(document.querySelector("#importe").value); 
}


function validarImporte(importe) {
  const errorImporte = document.querySelector("#error");
  if (isNaN(importe) || importe <= 0) {
    errorImporte.style.display = "block";
    return false;
  }
  return true;
}

function calcularResultado (importe) {
    const desde = document.querySelector("#desde").value;
const a = document.querySelector("#a").value;
let resultado;

    switch(desde){
        case "ARS":
            resultado = importe*valor1ARS[a];
            break;
        case "USD":
            resultado = importe*valor1USD[a];
            break;
        case "EUR":
            resultado = importe*valor1EUR[a];
            break;
    }
    return resultado;
    
}

function mostrarResultado(resultado, importe, desde, a) {
  const resultadoParrafo = document.querySelector("#resultado");
  resultadoParrafo.textContent = `${importe} ${desde} = ${resultado.toFixed(2)} ${a}`;
  resultadoParrafo.style.display = "block";
}

function convertir () {
    const importe = obtenerImporte ();
 const desde = document.querySelector("#desde").value;
const a = document.querySelector("#a").value;
input.value = "";
if (!validarImporte(importe)) {
    return;
}

const resultado= calcularResultado(importe);
 mostrarResultado(resultado, importe, desde, a); 
 guardarHistorial(importe, desde, a, resultado);
 mostrarHistorial();
  
}
const button = document.querySelector("button");
button.addEventListener("click" , convertir);

function guardarHistorial(importe, desde, a, resultado){
historial.push(`${importe} ${desde} = ${resultado.toFixed(2)} ${a}`);
localStorage.setItem("historial", JSON.stringify(historial));  
}
  const borrar = document.querySelector("#eliminar");
function mostrarHistorial() {
  const historialDiv = document.querySelector("#historial");
  const tituloHistorial = document.querySelector("#tituloHistorial");


  if (historial.length > 0) {
    tituloHistorial.style.display = "block";
    borrar.style.display = "inline-block";
      const historialItem = document.createElement("p");
      historialItem.textContent = historial.at(-1);
      historialDiv.appendChild(historialItem);
   
     } else {
    tituloHistorial.style.display = "none";
    cruz.style.display = "none";
  }
  
 
}

window.addEventListener("DOMContentLoaded", () => {
  const historialGuardado = localStorage.getItem("historial");
  const historialDiv = document.querySelector("#historial");
  const tituloHistorial = document.querySelector("#tituloHistorial");
  

  if (!historialDiv || !tituloHistorial) return;

  if (historialGuardado) {
    historial = JSON.parse(historialGuardado);

    
    historialDiv.innerHTML = "";
    if (historial.length > 0) {
      tituloHistorial.style.display = "block";
      borrar.style.display = "inline-block";
      for (let i = 0; i < historial.length; i++) {
        const itemHistorico = document.createElement("p");
        itemHistorico.textContent = historial[i]; 
        historialDiv.appendChild(itemHistorico);
      }
    } else {
      tituloHistorial.style.display = "none";
      borrar.style.display = "none";
    }
  }
});

/*Clear error input vacio menor que 0*/
const input = document.querySelector("#importe");
const errorimporte = document.querySelector("#error");

input.addEventListener("input", handleHideError);

function handleHideError() {
    errorimporte.style.display = "none";
}
/*Clear resultado*/
const input2 = document.querySelector("#importe");
const resultado = document.querySelector("#resultado");

input.addEventListener("input", handleHideError);

function handleHideError() {
    errorimporte.style.display = "none";
}



function borrarHistorial(){
  historial = [];
  localStorage.removeItem("historial");
  const historialDiv = document.querySelector("#historial");
  const tituloHistorial = document.querySelector("#tituloHistorial");
  if (historialDiv) historialDiv.innerHTML = "";
  if (tituloHistorial) tituloHistorial.style.display = "none";
  if (borrar) borrar.style.display = "none";
}


borrar.addEventListener("click" , borrarHistorial);