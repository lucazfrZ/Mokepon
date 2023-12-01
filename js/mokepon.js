let ataqueJugador /*Variable global*/
let ataqueOponente
let vidaJugador = 3
let vidaOponente = 3

function iniciarJuego(){
    
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById('boton-Reiniciar')
    sectionReiniciar.style.display='none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById('boton-Reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
    
}

/*Esta función permite seleccionar la mascota del jugador */ 
function seleccionarMascotaJugador(){
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
    sectionSeleccionarMascota.style.display = 'none'

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
    sectionSeleccionarAtaque.style.display = 'block'

    let inputHipodege = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let spanMascotaJugador = document.getElementById('mascota-Jugador')

    if(inputHipodege.checked){
        spanMascotaJugador.innerHTML = "Hipodoge"/*innerHTML es una propiedad que permite manipular el DOM */
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "Capipepo"
    }
    else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = "Ratigueya"
    }
    else{
        alert("Hola querido usuario, selecciona una mascota")
    }

    seleccionarMascotaOponente()
}

function seleccionarMascotaOponente(){
    let mascotaAleatorio = aleatorio(1,3)
    let spanMascotaOponente = document.getElementById('mascota-Oponente')

    if(mascotaAleatorio == 1){
        spanMascotaOponente.innerHTML = "Hipodoge"
    }
    else if(mascotaAleatorio == 2){
        spanMascotaOponente.innerHTML = "Capipepo"
    }
    else{
        spanMascotaOponente.innerHTML = "Ratigueya"
    }
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO'
    ataqueAleatorioOponente()
}
function ataqueAgua(){
    ataqueJugador = 'AGUA'
    ataqueAleatorioOponente()
}
function ataqueTierra(){
    ataqueJugador = 'TIERRA'
    ataqueAleatorioOponente()
}

function ataqueAleatorioOponente(){
    let ataqueAleatorio = aleatorio(1,3)

    if(ataqueAleatorio == 1){
        ataqueOponente = 'FUEGO'
    }
    else if(ataqueAleatorio == 2){
        ataqueOponente = 'AGUA'
    }
    else{
        ataqueOponente = 'TIERRA'
    }
    combate()
}

function combate(){
    

    let spanVidaJugador = document.getElementById('vida-Jugador')
    let spanVidaOponente = document.getElementById('vida-Oponente')


    if(ataqueOponente == ataqueJugador){
        crearMensaje("EMPATE😐🤨")
    }
    else if(ataqueJugador == 'FUEGO' && ataqueOponente == 'TIERRA'){
        crearMensaje("GANASTE🎉😀")
        vidaOponente--
        spanVidaOponente.innerHTML = vidaOponente
    }
    else if(ataqueJugador == 'AGUA' && ataqueOponente == 'FUEGO'){
        crearMensaje("GANASTE🎉😀")
        vidaOponente--
        spanVidaOponente.innerHTML = vidaOponente
    }
    else if(ataqueJugador == 'TIERRA' && ataqueOponente == 'AGUA'){
        crearMensaje("GANASTE🎉😀")
        vidaOponente--
        spanVidaOponente.innerHTML = vidaOponente
    }
    else{
        crearMensaje("PERDISTE😥😭")
    vidaJugador--
    spanVidaJugador.innerHTML = vidaJugador
    }

    revisarVida()
}

function revisarVida(){
    if(vidaOponente == 0){
        crearMensajeFinal("Felicitaciones Ganaste")
    }
    else if(vidaJugador == 0){
        crearMensajeFinal("Lo siento te han derrotado")
    }
}

function crearMensaje(resultado){
    let sectionMensaje = document.getElementById('mensajes')

    let parrafo = document.createElement('p') /* Este método permite crear elementos com por ejemplp <p> en el HTML*/
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota de tu oponente atacó con " + ataqueOponente + " - " + resultado

    sectionMensaje.appendChild(parrafo) /*Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento. */
}

function crearMensajeFinal(resultadoFinal){
    let sectionMensaje = document.getElementById('mensajes')

    let parrafo = document.createElement('p') /* Este método permite crear elementos com por ejemplp <p> en el HTML*/
    parrafo.innerHTML = resultadoFinal

   sectionMensaje.appendChild(parrafo) /*Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento. */

   let botonFuego = document.getElementById('boton-fuego')
    botonFuego.disabled = true
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.disabled = true
    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.disabled = true

    let botonReiniciar = document.getElementById('boton-Reiniciar')
    botonReiniciar.addEventListener('click', reiniciarJuego)
    
    let sectionReiniciar = document.getElementById('boton-Reiniciar')
    sectionReiniciar.style.display='block'

}

function reiniciarJuego(){
   botonReinciar = location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', iniciarJuego)
/*Permite que cuando el evento load se produzca ejecute la funcion IniciarJuego */