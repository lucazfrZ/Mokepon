/*Inicio Variables de Función "iniciarJuego"*/
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('boton-Reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-Reiniciar')
/*Fin Variables de Función "iniciarJuego"*/

/*Inicio Variables de Función "seleccionarMascotaJugador"*/
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
// let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const inputHipodege = document.getElementById('hipodoge')
const inputCapipepo = document.getElementById('capipepo')
const inputRatigueya = document.getElementById('ratigueya')
const spanMascotaJugador = document.getElementById('mascota-Jugador')
/*Fin Variables de Función "seleccionarMascotaJugador"*/

/*Inicio Variables de Función "seleccionarMascotaOponente"*/
const spanMascotaOponente = document.getElementById('mascota-Oponente')
/*Fin Variables de Función "seleccionarMascotaOponente"*/

/*Inicio Variables de Función "combate"*/
const spanVidaJugador = document.getElementById('vida-Jugador')
const spanVidaOponente = document.getElementById('vida-Oponente')
/*Fin Variables de Función "combate"*/

/*Inicio Variables de Funcion "crearMensaje"*/
const sectionMensaje = document.getElementById('resultado')
const ataqueDelJugador = document.getElementById('ataques-del-jugador')
const ataqueDelOponente = document.getElementById('ataques-del-oponente')
/*Fin Variables de Funcion "crearMensaje"*/

/*Inicio Variables Globales*/
let ataqueJugador 
let ataqueOponente
let vidaJugador = 3
let vidaOponente = 3
/*Fin Variables Globales*/

/*Inicio clase*/
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
    }
}

let hipodoge = new Mokepon('Hipodoge', '../assets/mokepons_mokepon_hipodoge_attack.webp', 3)
let capipepo = new Mokepon('Capipepo', '../assets/mokepons_mokepon_capipepo_attack.webp', 3)
let retigueya = new Mokepon('Ratigueya', '../assets/mokepons_mokepon_ratigueya_attack.webp', 3 )
/*Fin Clase*/

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display='none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

/*Esta función permite seleccionar la mascota del jugador */ 
function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'    
    sectionSeleccionarAtaque.style.display = 'flex'

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
        location.reload()
    }
    seleccionarMascotaOponente()
}

function seleccionarMascotaOponente(){
    let mascotaAleatorio = aleatorio(1,3)
    
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
        crearMensajeFinal("Felicitaciones Ganaste!")
    }
    else if(vidaJugador == 0){
        crearMensajeFinal("Lo siento te han derrotado :(")
    }
}

function crearMensaje(resultado){
    /*Podre declarar variables pero nunca podre declarar mi amor a ella */
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelOponente = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelOponente.innerHTML = ataqueOponente
// let parrafo = document.createElement('p') /* Este método permite crear elementos com por ejemplp <p> en el HTML*/
 // parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota de tu oponente atacó con " + ataqueOponente + " - " + resultado
 /*Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento. */
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelOponente.appendChild(nuevoAtaqueDelOponente)
}

function crearMensajeFinal(resultadoFinal){
    

     /* Este método permite crear elementos com por ejemplp <p> en el HTML*/
    sectionMensaje.innerHTML = resultadoFinal

    /*Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento. */

   
    botonFuego.disabled = true
    
    botonAgua.disabled = true
    
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