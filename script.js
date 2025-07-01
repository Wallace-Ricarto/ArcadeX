document.addEventListener('DOMContentLoaded', () => {
    // --- Carregamento ---
    const containerCarregamento = document.getElementById('container-carregamento');

    function mostrarCarregamentoCompleto() {
        containerCarregamento.style.display = 'flex';
        containerCarregamento.style.pointerEvents = 'auto';
    }

    function esconderCarregamentoCompleto() {
        containerCarregamento.style.display = 'none';
        containerCarregamento.style.pointerEvents = 'none';
    }

    window.addEventListener('beforeunload', mostrarCarregamentoCompleto);
    window.addEventListener('load', esconderCarregamentoCompleto);

    esconderCarregamentoCompleto();
    
    // --- Lista de Modos de Jogo---
    const modosPadrao = {
        solo: {
            nome: "Solo",
            imagem: "imagens/solo.png"
        },
        cooperativo: {
            nome: "Cooperativo",
            imagem: "imagens/cooperativa.png"
        },
        playerVSplayer: {
            nome: "Player VS Player",
            imagem: "imagens/player_VS_player.png"
        },
        playerVScomputador: {
            nome: "Player VS Computador",
            imagem: "imagens/player_VS_computador.png"
        },
    };

    // --- Listagem de Jogos ---
    const listaDeJogos = [
        {
            nome: "Em breve",
            imagem: "imagens/em_construcao.png",
            modos: ["solo", "cooperativo", "playerVSplayer", "playerVScomputador"],
            url: "jogos/jogo-exemplo/jogo-exemplo.html"
        },
        {
            nome: "Em breve",
            imagem: "imagens/em_construcao.png",
            modos: ["solo", "cooperativo", "playerVSplayer"],
            url: "jogos/jogo-exemplo/jogo-exemplo.html"
        },
        {
            nome: "Em breve",
            imagem: "imagens/em_construcao.png",
            modos: ["solo", "cooperativo"],
            url: "jogos/jogo-exemplo/jogo-exemplo.html"
        },
        {
            nome: "Em breve",
            imagem: "imagens/em_construcao.png",
            modos: ["solo"],
            url: "jogos/jogo-exemplo/jogo-exemplo.html"
        },
        {
            nome: "Em breve",
            imagem: "imagens/em_construcao.png",
            url: "jogos/jogo-exemplo/jogo-exemplo.html"
        },
    ];

    const secaoJogos = document.getElementById('secao-jogos');
    const secaoModosJogo = document.getElementById('secao-modos-jogo');
    const containerListaModos = document.getElementById('container-lista-modos');
    const botaoVoltarJogos = document.getElementById('botao-voltar-jogos');

    let jogoAtualSelecionado = null;

    function exibirCartoesJogos() {
        secaoJogos.innerHTML = '';
        listaDeJogos.forEach(jogo => {
            const cartaoJogo = document.createElement('div');
            cartaoJogo.classList.add('cartao');

            const imagemJogo = document.createElement('img');
            imagemJogo.src = jogo.imagem;
            imagemJogo.alt = `Imagem do jogo ${jogo.nome}`;

            const nomeJogo = document.createElement('h3');
            nomeJogo.textContent = jogo.nome;

            cartaoJogo.appendChild(imagemJogo);
            cartaoJogo.appendChild(nomeJogo);

            cartaoJogo.addEventListener('click', () => {
                selecionarJogo(jogo);
            });

            secaoJogos.appendChild(cartaoJogo);
        });

        secaoJogos.style.display = 'flex';
        secaoModosJogo.style.display = 'none';
    }

    function selecionarJogo(jogo) {
        jogoAtualSelecionado = jogo;
        if (jogo.modos && jogo.modos.length > 0) {
            const modosDoJogo = jogo.modos.map(idModo => modosPadrao[idModo]).filter(Boolean);
            exibirModosJogo(modosDoJogo);
        } else {
            iniciarJogo(null);
        }
    }

    function exibirModosJogo(modos) {
        containerListaModos.innerHTML = '';
        modos.forEach(modo => {
            const cartaoModo = document.createElement('div');
            cartaoModo.classList.add('cartao');

            const imagemModo = document.createElement('img');
            imagemModo.src = modo.imagem;
            imagemModo.alt = `Imagem do modo ${modo.nome}`;

            const nomeModo = document.createElement('h3');
            nomeModo.textContent = modo.nome;

            cartaoModo.appendChild(imagemModo);
            cartaoModo.appendChild(nomeModo);

            cartaoModo.addEventListener('click', () => {
                iniciarJogo(modo.nome);
            });
            containerListaModos.appendChild(cartaoModo);
        });

        secaoJogos.style.display = 'none';
        secaoModosJogo.style.display = 'block';
    }

    function iniciarJogo(modo) {
        if (jogoAtualSelecionado) {
            let urlFinal = jogoAtualSelecionado.url;
            if (modo) {
                urlFinal += `?modo=${encodeURIComponent(modo)}`;
            }
            window.location.href = urlFinal;
        } else {
            console.error("Nenhum jogo selecionado para iniciar.");
            exibirCartoesJogos();
        }
    }

    botaoVoltarJogos.addEventListener('click', () => {
        jogoAtualSelecionado = null;
        exibirCartoesJogos();
    });

    exibirCartoesJogos();

    // --- Elementos de Áudio e Botões ---
    const musicaFundo = document.getElementById('musica-Fundo');
    const botaoAlternarMusica = document.getElementById('alternar-Musica');
    const botaoAlternarEstrelas = document.getElementById('alternar-Estrelas');

    botaoAlternarMusica.addEventListener('click', () => {
        if (musicaFundo.paused) {
            musicaFundo.play();
            botaoAlternarMusica.textContent = '🔊';
        } else {
            musicaFundo.pause();
            botaoAlternarMusica.textContent = '🔇';
        }
    });

    botaoAlternarEstrelas.addEventListener('click', () => {
        if (estrelasAtivadas) {
            pararEstrelas();
            botaoAlternarEstrelas.textContent = '⭐';
        } else {
            iniciarEstrelas();
            botaoAlternarEstrelas.textContent = '💫';
        }
    });

    musicaFundo.addEventListener('play', () => {
        botaoAlternarMusica.textContent = '🔊';
    });
    musicaFundo.addEventListener('pause', () => {
        botaoAlternarMusica.textContent = '🔇';
    });

    if (musicaFundo.autoplay && !musicaFundo.paused) {
        botaoAlternarMusica.textContent = '🔊';
    } else {
        botaoAlternarMusica.textContent = '🔇';
    }

    // --- Estrelas Cadentes ---
    const noite = document.querySelector('.noite-estrelada');
    const quantidadeDeEstrelas = 16;
    const estrelasAtivas = [];
    let intervaloEstrelas;
    let estrelasAtivadas = false;

    function criarEstrela() {
        const estrela = document.createElement('div');
        estrela.classList.add('estrela-cadente');

        estrela.style.left = `${Math.random() * 100}%`;
        estrela.style.top = `${Math.random() * 100}%`;

        const duracao = Math.random() * 3 + 2;
        const atraso = Math.random() * 5;

        estrela.style.animationDuration = `${duracao}s`;
        estrela.style.animationDelay = `${atraso}s`;

        noite.appendChild(estrela);
        estrelasAtivas.push(estrela);

        if (estrelasAtivas.length > quantidadeDeEstrelas) {
            const estrelaMaisAntiga = estrelasAtivas.shift();
            if (estrelaMaisAntiga) {
                estrelaMaisAntiga.remove();
            }
        }

        estrela.addEventListener('animationend', () => {
            const index = estrelasAtivas.indexOf(estrela);
            if (index > -1) {
                estrelasAtivas.splice(index, 1);
            }
            estrela.remove();
        });
    }

    function iniciarEstrelas() {
        for (let i = 0; i < quantidadeDeEstrelas; i++) {
            criarEstrela();
        }
        intervaloEstrelas = setInterval(() => {
            criarEstrela();
        }, 3000);
        estrelasAtivadas = true;
    }

    function pararEstrelas() {
        if (estrelasAtivadas) {
            clearInterval(intervaloEstrelas);
            intervaloEstrelas = null;
            estrelasAtivas.forEach(estrela => estrela.remove());
            estrelasAtivas.length = 0;
            estrelasAtivadas = false;
        }
    }

    iniciarEstrelas();
});