/**
 * 2C = Dos de Clubs - Tréboles
 * 2D = Dos de Diamonds - Diamantes
 * 2H = Dos de Hearts - Corazones
 * 2S = Dos de Spades - Espadas
 */

// PATRÓN MÓDULO: Crea un ámbito para que no se pueda llamar directamente
const miJuego = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let arrPuntos = [];


    // Referencias del HTML
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          puntosHtml = document.querySelectorAll('small');
    
    // válido cuando tenemos sólo un jugador
          //divCartasJugador = document.querySelector('#jugador-cartas'),
          //divCartasPc = document.querySelector('#computadora-cartas'),

    //let arrDivCartas = [divCartasJugador, divCartasPc];

    // Para N jugadores
    let arrDivCartas = document.querySelectorAll('.divCartas');


    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        console.log({numJugadores});

        // El último jugador será el PC
        for (let index = 0; index < numJugadores; index++) {
           arrPuntos.push(0);
        }

        puntosHtml.forEach(elem=> elem.innerText = 0);
        arrDivCartas.forEach(capa => capa.innerHTML = '');
    }

    // Crear baraja de cartas
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            } 
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            } 
        }

        return _.shuffle(deck);
    }

    // Coger una carta
    const pedirCarta = () => {

        if(deck.length === 0) {
            throw 'No quedan cartas';
        }

        return deck.pop();
    }

    // Turno ordenador
    const turnoPc = () => {
        do {
            obtenerNuevaCarta(arrPuntos.length - 1);

        } while (arrPuntos[1] != 0 && arrPuntos[1] <= arrPuntos[0]);
        btnDetener.disabled = true;

        setTimeout(identificarGanador(), 10);
        
    }

    //Identificamos al ganador
    const identificarGanador = () => {
        (arrPuntos[0] > arrPuntos[1]) ? puntosHtml[0].innerHTML += '<b> GANADOR!!</b>' :
        puntosHtml[1].innerHTML += '<b> GANADOR!!</b>';
    }

    // Traduce el valor numérico de cada carta
    const valorCarta = (carta) => {
        
        const valor = carta.substring(0, carta.length-1);
        let puntos = 0;
        if (isNaN(valor)) {
            //Traducimos los valores especiales
            puntos = (valor === 'A') ? 11 : 10;
        } else {
            // Obtenemos el valor numérico, no como cadena
            puntos = valor * 1;
        }

        return puntos;
    }

    const obtenerNuevaCarta = (numJugador) => {
        const carta = pedirCarta();

        // Creamos dinámicamente <img class="carta" src="assets/cartas/2C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        arrDivCartas[numJugador].append(imgCarta);

        // Actualizamos la puntuación
        arrPuntos[numJugador] += valorCarta(carta);
        puntosHtml[numJugador].innerText = arrPuntos[numJugador];

        if(arrPuntos[numJugador] > 21) {
            console.warn('Te has pasado de 21');
            btnPedir.disabled = true;
            puntosHtml[numJugador].innerHTML = '<b>Límite superado</b>';
            arrPuntos[numJugador] = 0;
            if (numJugador == 0) {
                turnoPc();
            }
        } else if (arrPuntos[numJugador] === 21) {
            console.log('GENIAL!');
            if (numJugador == 0) {
                turnoPc();
            }
        }
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        obtenerNuevaCarta(0);
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoPc();
    });

    btnNuevo.addEventListener('click', () => {
        // Reseteamos todo
        inicializarJuego();
        for (let i = 0; i < 2; i++) {
            arrPuntos[i] = 0;
            puntosHtml[i].innerText = 0;
            arrDivCartas[i].innerHTML = '';
        }
    
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });

    return {
        // Sólo lo que pongamos aquí va a ser público y visible desde fuera. El resto, no
        // Por ejemplo, si alguien necesita invocar a inicializarJuego()
        nuevoJuego: inicializarJuego
    };

})();


