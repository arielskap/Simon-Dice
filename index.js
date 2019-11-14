const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 2;
class Juego {
    constructor() {
        this.inicializar();
        this.generarSecuencia();
        setTimeout(() => {
            this.siguienteNivel();
        }, 500);
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.inicializar = this.inicializar.bind(this);
        this.toggleBtnEmpezar()
        this.nivel = 1
        //En javascript si a un atributo le cargamos una variable podemos ahorrarnos de poner por ejemplo así: celeste: celeste y poner directamente el nombre.
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    toggleBtnEmpezar() {
        if (btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide');
        } else {
            btnEmpezar.classList.add('hide');
        }
    }
    generarSecuencia() {
        //Hago que el array sea de 10, los inicializo a todos con 0, esto es importante ya que el map solo recorre si los elementos dentro del array estan cargados
        //Math.floor Redondea para abajo
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(() => {
                this.iluminarColor(color)
            }, 1000 * i);
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');
        setTimeout(() => {
            this.apagarColor(color)
        }, 350);
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick() {
        //El addEvent nos va a cambiar el "this" por el objeto que ejecuta la funcion o sea en este caso el boton. Para poder re aclararle que el this es el objeto Juego, entonces debemos poner el bind() y dentro del parentesis le decimos quien va a hacer nuestro this
        //this.colores.celeste.addEventListener('click', this.elegirColor.bind(this))
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                this.nivel++;
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego();
                } else {
                    // Si lo pongo en una linea puedo sacar el parentesis no se porque
                    //setTimeout(this.siguienteNivel, 1500);
                    setTimeout(() => {
                        this.siguienteNivel()
                    }, 1500);
                }
            }
        } else {
            this.perdioElJuego();
        }
    }

    ganoElJuego() {
        swal('Simon Dice', 'Felicitaciones, ganaste el juego! 😁', 'success')
            .then(() => {
                this.inicializar();
            });
    }

    perdioElJuego() {
        swal('Simon Dice', 'Lo lamentamos, perdiste 😢', 'error')
            .then(() => {
                this.eliminarEventosClick();
                this.inicializar();
            });
    }
}

function empezarJuego() {
    var juego = new Juego()
}