// elementos temporizador
const barra = document.querySelector(".barra");
const tempMsj = document.querySelector(".temp-msj-valor");
const cicloMsj = document.querySelector(".ciclo-msj-valor");
const ciclosTMsj = document.querySelector(".ciclosT-msj-valor");
const elementoMinutos = document.querySelector(".minutos");
const elementoSegundos = document.querySelector(".segundos");
// elementos guia
const cuadroGuia = document.querySelector(".guia-uso");
// elementos modificar
const inputDuracionTemp = document.querySelector("#inputMinutos");
const inputDuracionDesc = document.querySelector("#inputMinutosDescanso");
const inputDescansoLargo = document.querySelector("#inputMinutosDescansoLargo");
const inputCiclos = document.querySelector("#inputCiclos");
// iconos modificar
const iconoErrorTempo = document.querySelector(".inpTemSpan");
const iconoErrorDescanso = document.querySelector(".inpCicSpan");
const iconoErrorDesLargo = document.querySelector(".inpDesLarSpan");
const iconoErrorCiclo = document.querySelector(".inpTemSpan");
// botones temporizador
const botonIniciar = document.querySelector(".iniciar");
const botonPausar = document.querySelector(".pausar");
const botonDetener = document.querySelector(".detener");
// botones guia
const botonGuia = document.querySelector(".boton-guia");
const botonCerrarGuia = document.querySelector(".cerrar-guia");
// botones modificar
const botonAplicar = document.querySelector(".confirmar-cambios");

// timbre-notificacion
const timbreNotificacion = new Audio(
  "./multimedia/audio/notificacion-pommedoro.mp3"
);

let numeroMinutos = 25; // 25
let numeroSegundos = 0; // dev

elementoMinutos.innerText =
  numeroMinutos < 10 ? "0" + numeroMinutos : numeroMinutos;
elementoSegundos.innerText =
  numeroSegundos < 10 ? "0" + numeroSegundos : numeroSegundos;

let numMinDescanso = 5; // 5
let numMinDescansoLargo = 15; // 15
// let numSegDescansoLargo = 2; // dev
// let numSegDescanso = 1; // dev

let ciclosNecesarios = 3;
let ciclosActuales = 0;
let ciclosTotales = 0;

duracion = numeroMinutos * 60 || numeroSegundos;
tiempoRestante = duracion;
let intervalo = null;

function actualizarTemporizador() {
  let minutos = Math.floor(tiempoRestante / 60);
  let segundos = tiempoRestante % 60;

  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  elementoMinutos.innerText = minutos;
  elementoSegundos.innerText = segundos;

  const porcentaje = (tiempoRestante / duracion) * 100;
  barra.style.width = porcentaje + "%";
}

function iniciarTemporizador() {
  if (intervalo !== null) return;

  intervalo = setInterval(() => {
    if (tiempoRestante <= 0) {
      if (duracion === numeroMinutos * 60) {
        timbreNotificacion.play();
        ciclosActuales++;
        ciclosTotales++;
        tempMsj.innerText = "trabajo";
        cicloMsj.innerText = ciclosActuales;
        ciclosTMsj.innerText = ciclosTotales;

        if (ciclosActuales === ciclosNecesarios) {
          ciclosActuales = 0;
          tempMsj.innerText = "descanso largo";
          duracion = numMinDescansoLargo
            ? numMinDescansoLargo * 60
            : numSegDescansoLargo;
        } else {
          duracion = numMinDescanso * 60;
          tempMsj.innerText = "descanso";
        }

        tiempoRestante = duracion;
        actualizarTemporizador();
      } else if (
        duracion === numMinDescanso * 60 ||
        duracion === numMinDescansoLargo * 60
      ) {
        timbreNotificacion.play();
        tempMsj.innerText = "trabajo";
        duracion = numeroMinutos * 60;
        tiempoRestante = duracion;
        actualizarTemporizador();
      }

      clearInterval(intervalo);
      intervalo = null;
      return;
    }

    tiempoRestante--;
    actualizarTemporizador();
  }, 1000);
}

function pausarTemporizador() {
  if (intervalo === null) return;

  clearInterval(intervalo);
  intervalo = null;
  parpadearNumeros("add");
}

function resetTemporizador() {
  clearInterval(intervalo);
  intervalo = null;
  numeroMinutos = parseInt(elementoMinutos.innerText);
  tiempoRestante = duracion;
  parpadearNumeros("remove");
  actualizarTemporizador();
}

function parpadearNumeros(resp) {
  switch (resp) {
    case "add":
      elementoMinutos.classList.add("parpadeo");
      elementoSegundos.classList.add("parpadeo");
      break;
    case "remove":
      elementoMinutos.classList.remove("parpadeo");
      elementoSegundos.classList.remove("parpadeo");
      break;
    default:
      break;
  }
}

botonIniciar.addEventListener("click", () => {
  iniciarTemporizador();
  parpadearNumeros("remove");
});

botonPausar.addEventListener("click", () => pausarTemporizador());

botonDetener.addEventListener("click", () => resetTemporizador());

botonGuia.addEventListener("click", () => {
  cuadroGuia.classList.add("mostrar");
});

cuadroGuia.addEventListener("click", (e) => {
  if (e.target === cuadroGuia) {
    cuadroGuia.classList.remove("mostrar");
  }
});

botonCerrarGuia.addEventListener("click", () => {
  cuadroGuia.classList.remove("mostrar");
});

botonAplicar.addEventListener("click", () => {
  numeroMinutos = inputDuracionTemp.value
    ? parseInt(inputDuracionTemp.value)
    : numeroMinutos;
  numMinDescanso = inputDuracionDesc.value
    ? parseInt(inputDuracionDesc.value)
    : numMinDescanso;
  ciclosNecesarios = inputCiclos.value
    ? parseInt(inputCiclos.value)
    : ciclosNecesarios;
  numMinDescansoLargo = inputDescansoLargo.value
    ? parseInt(inputDescansoLargo.value)
    : numMinDescansoLargo;

  if (numeroMinutos === numMinDescanso) {
    inputDuracionDesc.classList.add("error");
    mostrarError();
    return;
  }
  if (numeroMinutos === numMinDescansoLargo) {
    inputDescansoLargo.classList.add("error");
    mostrarError();
    return;
  }

  duracion = numeroMinutos * 60;
  tiempoRestante = duracion;

  inputDuracionDesc.classList.remove("error");
  inputDescansoLargo.classList.remove("error");
  mostrarInfo();

  actualizarTemporizador();
});

function mostrarInfo() {
  const modalInfo = document.querySelector(".info");
  modalInfo.classList.add("mostrar");
  setTimeout(() => {
    modalInfo.classList.remove("mostrar");
  }, 2500);
}

function mostrarError() {
  const modalError = document.querySelector(".error-modal");
  modalError.classList.add("mostrar");
  setTimeout(() => {
    modalError.classList.remove("mostrar");
  }, 2500);
}
