const barra = document.querySelector('.barra')
const elementoMinutos = document.querySelector('.minutos')
const elementoSegundos = document.querySelector('.segundos')
const botonIniciar = document.querySelector('.iniciar')
const botonPausar = document.querySelector('.pausar')
const botonDetener = document.querySelector('.detener')

let numeroMinutos = parseInt(document.querySelector('.minutos').innerText)
let numeroSegundos = parseInt(document.querySelector('.segundos').innerText)

let numMinDescanso = 0;
let numSegDescanso = 5;

duracion = numeroMinutos * 60 || numeroSegundos
tiempoRestante = duracion 
let intervalo = null;

function actualizarTemporizador() {
        let minutos = Math.floor(tiempoRestante / 60)
        let segundos = tiempoRestante % 60

        minutos = minutos < 10 ? "0" + minutos : minutos
        segundos = segundos < 10 ? "0" + segundos : segundos

        elementoMinutos.textContent = minutos
        elementoSegundos.textContent = segundos

        const porcentaje = (tiempoRestante / duracion) * 100;
        barra.style.width = porcentaje + "%"
}

function iniciarTemporizador() {
    if(intervalo !== null) return
    intervalo = setInterval(() => {
        if(tiempoRestante <= 0){
            if(duracion === numeroMinutos * 60 || duracion === numeroSegundos){
                duracion = numMinDescanso ? numMinDescanso * 60 : numSegDescanso
                tiempoRestante = duracion
                actualizarTemporizador()
            } else if (duracion === numMinDescanso * 60 || duracion === numSegDescanso){
                 duracion = numeroMinutos ? numeroMinutos * 60 : numeroSegundos
                 tiempoRestante = duracion
                actualizarTemporizador()
            }

            clearInterval(intervalo)
            intervalo = null
            return
        }
        tiempoRestante--
        actualizarTemporizador()        
    }, 1000)
}

function pausarTemporizador(){
    if(intervalo === null) return

    clearInterval(intervalo);
    intervalo = null
    parpadearNumeros('add')
}

function resetTemporizador(){


      clearInterval(intervalo);
  intervalo = null;

  // Recalcula duración por si el usuario cambia el número manualmente
  numeroMinutos = parseInt(elementoMinutos.innerText);
  tiempoRestante = duracion;

  actualizarTemporizador();
}

function parpadearNumeros(resp){
    switch(resp){
        case 'add':
            elementoMinutos.classList.add('parpadeo')
            elementoSegundos.classList.add('parpadeo')
            break
        case 'remove':
            elementoMinutos.classList.remove('parpadeo')
            elementoSegundos.classList.remove('parpadeo')
            break
        default:
            break;
    }
}

botonIniciar.addEventListener('click', ()=>{
    iniciarTemporizador()
    parpadearNumeros('remove')
})

botonPausar.addEventListener('click', () => {
    pausarTemporizador()
})

botonDetener.addEventListener('click', () => {
    resetTemporizador()
})
