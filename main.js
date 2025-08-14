const valor1USD = {
  ARS: 1257.24,
  EUR: 0.852,
  GBP: 0.74,
};
const valor1EUR = {
  ARS: 1474.07,
  USD: 1.172,
  GBP: 0.86,
};
const valor1ARS = {
  USD: 0.0007953,
  EUR: 0.000678394,
  GBP: 0.00056,
};

const valor1GBP = {
  ARS: 1782.66,
  USD: 1.36,
  EUR: 1782.66
}

let historial = [];
const resultadoParrafo = document.querySelector("#resultado");
const input = document.querySelector("#importe");
const errorimporte = document.querySelector("#error");
const button = document.querySelector("button");
const cruz = document.querySelector("#eliminar");
const historialDiv = document.querySelector("#historial");
const tituloHistorial = document.querySelector("#tituloHistorial");

function obtenerImporte() {
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

function calcularResultado(importe, desde, a) {
  let resultado;

  switch (desde) {
    case "ARS":
      resultado = importe * valor1ARS[a];
      break;
    case "USD":
      resultado = importe * valor1USD[a];
      break;
    case "EUR":
      resultado = importe * valor1EUR[a];
      break;
      case "GBP":
      resultado = importe * valor1GBP[a];
      break;
  }
  return resultado;
}

function mostrarResultado(resultado, importe, desde, a) {
  resultadoParrafo.textContent = `${importe} ${desde} = ${resultado.toFixed(
    2
  )} ${a}`;
  resultadoParrafo.style.display = "block";
}

function limpiarInput() {
  input.value = "";
}

function actualizarUI(importe, desde, a, resultado) {
  mostrarResultado(resultado, importe, desde, a);
  guardarHistorial(importe, desde, a, resultado);
  mostrarHistorial();
  limpiarInput();
}

function convertir() {
  const importe = obtenerImporte();
  const desde = document.querySelector("#desde").value;
  const a = document.querySelector("#a").value;

  if (!validarImporte(importe)) {
    return;
  }

  const resultado = calcularResultado(importe, desde, a);
  actualizarUI(importe, desde, a, resultado);
}

button.addEventListener("click", convertir);

function guardarHistorial(importe, desde, a, resultado) {
  historial.push(`${importe} ${desde} = ${resultado.toFixed(2)} ${a}`);
  localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
  historialDiv.innerHTML = ""; // Limpia el historial anterior

  if (historial.length > 0) {
    tituloHistorial.style.display = "block";
    cruz.style.display = "inline-block";
    historial.forEach((itemTexto) => {
      const item = document.createElement("p");
      item.textContent = itemTexto;
      historialDiv.appendChild(item);
    });
  } else {
    tituloHistorial.style.display = "none";
    cruz.style.display = "none";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const historialGuardado = localStorage.getItem("historial");

  if (historialGuardado) {
    historial = JSON.parse(historialGuardado);
    mostrarHistorial(); // 👈 Llamas a la nueva función aquí también
  }
});

cruz.addEventListener("click", borrarHistorial);

function borrarHistorial() {
  historial = [];
  localStorage.removeItem("historial");

  if (historialDiv) {
    historialDiv.innerHTML = "";
  }
  if (tituloHistorial) {
    tituloHistorial.style.display = "none";
  }
  if (cruz) {
    cruz.style.display = "none";
  }
}
/*Clear error input vacio menor que 0*/

input.addEventListener("input", handleHideError);

function handleHideError() {
  errorimporte.style.display = "none";
  resultadoParrafo.style.display = "none";
}
