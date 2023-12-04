/*Inicio Variables de Función "iniciarJuego"*/
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('boton-Reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-Reiniciar')
/*Fin Variables de Función "iniciarJuego"*/

/*Inicio Variables de Función "seleccionarMascotaJugador"*/
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
// let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const spanMascotaJugador = document.getElementById('mascota-Jugador')
/*Fin Variables de Función "seleccionarMascotaJugador"*/

/*Inicio Variables de Función "seleccionarMascotaOponente"*/
const spanMascotaOponente = document.getElementById('mascota-Oponente');
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

const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

/*Inicio Variables Globales*/
let mokepones = []
let ataqueJugador 
let ataqueOponente
let opcionMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador 
let ataquesMokepon
let botonFuego
let botonAgua
let botonTierra
let botones = []
let vidaJugador = 3
let vidaOponente = 3
/*Fin Variables Globales*/

/*Inicio clase*/
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}
/*Fin Clase*/

let hipodoge = new Mokepon('Hipodoge', '../assets/mokepons_mokepon_hipodoge_attack.webp', 3)
let capipepo = new Mokepon('Capipepo', '../assets/mokepons_mokepon_capipepo_attack.webp', 3)
let ratigueya = new Mokepon('Ratigueya', '../assets/mokepons_mokepon_ratigueya_attack.webp', 3 )


/*Obejetos*/
hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'}
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'}
)
/*Fin Objetos*/

mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = 'none'
    
    mokepones.forEach((mokepon) => {
        opcionMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`

        contenedorTarjetas.innerHTML += opcionMokepones

            inputHipodoge = document.getElementById('Hipodoge')
            inputCapipepo = document.getElementById('Capipepo')
            inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
    botonReiniciar.style.display = 'none'
    
}

/*Esta función permite seleccionar la mascota del jugador */ 
function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display = 'none'    
    sectionSeleccionarAtaque.style.display = 'flex'

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id/*innerHTML es una propiedad que permite manipular el DOM */
        mascotaJugador = inputHipodoge.id
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputCapipepo.id
    }
    else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputRatigueya.id
    }
    else{
        alert("Hola querido usuario, selecciona una mascota")
        location.reload()
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaOponente()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for(let i = 0; i<mokepones.length; i++){
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques 
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id="${ataque.id}" class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.BAtaque')

     console.log(botones)


    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
    
}

function seleccionarMascotaOponente(){
    let mascotaAleatorio = aleatorio(0,mokepones.length-1) //calcula el tamaño del arreglo y toma su maximo valor
    
    spanMascotaOponente.innerHTML = mokepones[mascotaAleatorio].nombre //imprime de forma aleatoria el nommbre de la mascota sin necesidad de condicionales
    
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

    botonReiniciar.style.display='block'

}

function reiniciarJuego(){
   botonReinciar = location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', iniciarJuego)
/*Permite que cuando el evento load se produzca ejecute la funcion IniciarJuego */