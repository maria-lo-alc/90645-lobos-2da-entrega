let tasasDeCambio = {};
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
async function obtenerTasasDeCambio() {
  try {
    const respuesta = await fetch("tasas.json");
    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo de tasas.");
    }
    const datos = await respuesta.json();
    tasasDeCambio = datos.tasasDeCambio;
  } catch (error) {
    Swal.fire({
  icon: "error",
  title: "No pudimos cargar las tasas de cambio. ",
  text: "Vuleve a intentarlo más tarde.",
});
  }
}

async function convertir() {
  const importe = obtenerImporte();
  const desde = document.querySelector("#desde").value;
  const a = document.querySelector("#a").value;

  if (a === desde) {
    Swal.fire("Debes elegir dos monedas diferentes");
    return;
  }

  if (!validarImporte(importe)) {
    return;
  }

   if (Object.keys(tasasDeCambio).length === 0) {
        await obtenerTasasDeCambio();
        if (Object.keys(tasasDeCambio).length === 0) {
            return;
        }
  }

  const resultado = calcularResultado(importe, desde, a);
  actualizarUI(importe, desde, a, resultado);
}


function calcularResultado(importe, desde, a) {
  const tasa = tasasDeCambio[desde][a];
  if (tasa) {
    return importe * tasa;
  }
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
  obtenerTasasDeCambio();
  const historialGuardado = localStorage.getItem("historial");

  if (historialGuardado) {
    historial = JSON.parse(historialGuardado);
    mostrarHistorial(); 
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
