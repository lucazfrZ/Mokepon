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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')


/*Inicio Variables Globales*/
let mokepones = []
let ataqueJugador = []
let ataqueOponente = []
let opcionMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador 
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponOponente
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueOponente
let victoriasJugador = 0
let victoriasOponente = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = '../assets/mokemap.png'

/*Fin Variables Globales*/

/*Inicio clase*/
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0

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
    sectionVerMapa.style.display='none'
    
    mokepones.forEach((mokepon) => {
        opcionMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`
            //ForEach recorre un arreglo
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
    // sectionSeleccionarAtaque.style.display = 'flex'
   

   
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id/*innerHTML es una propiedad que permite manipular el DOM */
        mascotaJugador = inputHipodoge.id
    }
    else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }
    else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }
    else{
        alert("ELIGE UN PERSONAJE")
        location.reload()
    }
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    seleccionarMascotaOponente()
}

function seleccionarMascotaOponente(){
    let mascotaAleatorio = aleatorio(0,mokepones.length-1) //calcula el tamaño del arreglo y toma su maximo valor
    
    spanMascotaOponente.innerHTML = mokepones[mascotaAleatorio].nombre //imprime de forma aleatoria el nommbre de la mascota sin necesidad de condicionales
    ataquesMokeponOponente = mokepones[mascotaAleatorio].ataques
    secuenciaAtaque()
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
    
}

function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener('click', (e) => {
           if(e.target.textContent === '🔥'){
            ataqueJugador.push('FUEGO')
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            boton.style.cursor = 'no-drop'
            boton.disabled = true
           }
           else if(e.target.textContent === '💧'){
            ataqueJugador.push('AGUA')
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            boton.style.cursor = 'no-drop'
            boton.disabled = true
           }
           else{
            ataqueJugador.push('TIERRA')
            console.log(ataqueJugador)
            boton.style.background = '#112f58'
            boton.style.cursor = 'no-drop'
            boton.disabled = true
           }
           ataqueAleatorioOponente()
        })
    })
    
    
}


function ataqueAleatorioOponente(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponOponente.length-1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueOponente.push('FUEGO')
    }
    else if(ataqueAleatorio == 3 || ataqueAleatorio == 4 ){
        ataqueOponente.push('AGUA')
    }
    else{
        ataqueOponente.push('TIERRA')
    }
    console.log(ataqueOponente)
    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, oponente){
     indexAtaqueJugador = ataqueJugador[jugador]
     indexAtaqueOponente = ataqueOponente[oponente]
}

function combate(){

    for(let index = 0; index < ataqueJugador.length; index++){
        if(ataqueJugador[index] === ataqueOponente[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATE")
        }
        else if(ataqueJugador[index] == 'FUEGO' && ataqueOponente[index] == 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else if(ataqueJugador[index] == 'AGUA' && ataqueOponente[index] == 'FUEGO'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        } 
        else if(ataqueJugador[index] == 'TIERRA' && ataqueOponente[index] == 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidaJugador.innerHTML = victoriasJugador
        }
        else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasOponente++
            spanVidaOponente.innerHTML = victoriasOponente
        }
        revisarVictorias()
    }
 
}

function revisarVictorias(){
    if(victoriasJugador == victoriasOponente){
        crearMensajeFinal("EMPATASTE")
    }
    else if(victoriasJugador > victoriasOponente){
        crearMensajeFinal("GANASTE, FELICIDADES!!!")
    }
    else{
        crearMensajeFinal("LO SIENTO, PERDISTE")
    }
}
function crearMensaje(resultado){
    /*Podre declarar variables pero nunca podre declarar mi amor a ella */
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelOponente = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelOponente.innerHTML = indexAtaqueOponente
// let parrafo = document.createElement('p') /* Este método permite crear elementos com por ejemplp <p> en el HTML*/
 // parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota de tu oponente atacó con " + ataqueOponente + " - " + resultado
 /*Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento. */
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelOponente.appendChild( nuevoAtaqueDelOponente)
}

function crearMensajeFinal(resultadoFinal){
    
     /* Este método permite crear elementos com por ejemplp <p> en el HTML*/
    sectionMensaje.innerHTML = resultadoFinal

    /*Si el hijo(Child) es una referencia(hace referencia) hacia un nodo existente en el documento actual, este es quitado del padre actual para ser puesto en el nodo padre nuevo. La clave está en si el (Child) es una referencia a un nodo existente en el documento. */
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

function pintarCanvas(){
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height
        
    )
    lienzo.drawImage(mascotaJugadorObjeto.mapaFoto
        ,mascotaJugadorObjeto.x
        ,mascotaJugadorObjeto.y
        ,mascotaJugadorObjeto.ancho
        ,mascotaJugadorObjeto.alto
 )}

function moverDerecha(){
    capipepo.velocidadX = 5
}

function moverIzquierda(){
    capipepo.velocidadX = -5
}

function moverAbajo(){
    capipepo.velocidadY = 5
}

function moverArriba(){
   capipepo.velocidadY = -5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
   
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mapa.width = 320
    mapa.height = 240
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for(let i = 0; i<mokepones.length; i++){
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

window.addEventListener('load', iniciarJuego)
/*Permite que cuando el evento load se produzca ejecute la funcion IniciarJuego */