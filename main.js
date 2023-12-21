const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const startPauseBt = document.querySelector('#start-pause');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/Focus/sons/luna-rise-part-one.mp3');
const songTimerZero = new Audio ('/Focus/sons/beep.mp3');
const songTimerStart = new Audio ('/Focus/sons/play.wav');
const songTimerPause = new Audio ('/Focus/sons/pause.mp3');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcon = document.querySelector(".app__card-primary-button-icon")
const tempoNaTela = document.querySelector('#timer')


let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})
const contextos = {
    foco: {
        texto: "Otimize sua produtividade,<br><strong class='app__title-strong'>mergulhe no que importa.</strong>"
    },
    'descanso-curto': {
        texto: "Que tal dar uma respirada? <strong class='app__title-strong'>Faça uma pausa curta!</strong>"
    },
    'descanso-longo': {
        texto: "Hora de voltar à superfície. <strong class='app__title-strong'>Faça uma pausa longa.</strong>"
    }
};

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarcontexto('foco');
    focoBt.classList.add('active')
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarcontexto('descanso-curto');
    curtoBt.classList.add('active')
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarcontexto('descanso-longo');
    longoBt.classList.add('active')
});

function alterarcontexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/Focus/imagens/${contexto}.png`);
    
    if (contextos[contexto]) {
        titulo.innerHTML = contextos[contexto].texto;
    } else {
        titulo.innerHTML = '';
    }
}


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        songTimerZero.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        songTimerPause.play();
        zerar()
        return
    }
    songTimerStart.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcon.setAttribute('src', `/Focus/imagens/pause.png`)
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcon.setAttribute('src', `/Focus/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()