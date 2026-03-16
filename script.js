const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const loopBtn = document.getElementById('loop-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const volume = document.getElementById('volume');
const volumeIcon = document.querySelector('.volume-wrap span');
const progressTrack = document.getElementById('progress-track');
const progressFill = document.getElementById('progress-fill');
const progressThumb = document.getElementById('progress-thumb');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const vinyl = document.getElementById('vinyl');
const cover = document.getElementById('cover');
const queueList = document.getElementById('queue-list');
const lyricsBody = document.getElementById('lyrics-body');
const translationBody = document.getElementById('translation-body');
const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const waveBars = Array.from(document.querySelectorAll('.wave-bar'));
const controlIcons = {
  shuffle: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16 3h5v5"></path>
      <path d="M4 20l6.5-6.5"></path>
      <path d="M15.5 8.5L20 4"></path>
      <path d="M4 4l16 16"></path>
      <path d="M16 16h5v5"></path>
    </svg>
  `,
  prev: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5v14"></path>
      <path d="M18 6l-8 6 8 6V6z"></path>
    </svg>
  `,
  play: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" stroke="none"></path>
    </svg>
  `,
  pause: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5h3v14H8z" fill="currentColor" stroke="none"></path>
      <path d="M13 5h3v14h-3z" fill="currentColor" stroke="none"></path>
    </svg>
  `,
  next: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 5v14"></path>
      <path d="M6 6l8 6-8 6V6z"></path>
    </svg>
  `,
  loop: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17 2l4 4-4 4"></path>
      <path d="M3 11V9a3 3 0 0 1 3-3h15"></path>
      <path d="M7 22l-4-4 4-4"></path>
      <path d="M21 13v2a3 3 0 0 1-3 3H3"></path>
    </svg>
  `,
  volume: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 5L6 9H3v6h3l5 4V5z"></path>
      <path d="M15.5 9.5a4.5 4.5 0 0 1 0 5"></path>
      <path d="M18.5 7a8 8 0 0 1 0 10"></path>
    </svg>
  `
};

const startDate = new Date(2025, 5, 7, 0, 0, 0, 0);

const aThousandYearsLrc = `[ti:A Thousand Years]
[ar:John Michael Howell]
[au:John Michael Howell ,JVKE e ZVC]
[la:EN]
[re:LRCgenerator.com]
[ve:4.00]

[00:00.75]I was a kid looking for love, full of hope inside
[00:12.40]But time was never kind to me, my heart grew cold as ice
[00:16.69]All out of luck, thought I was stuck, alone for all my life
[00:20.88]But I was proven wrong the moment I looked in your eyes

[00:25.03]It's true, until I'm in the grave
[00:29.08]Darling, I'll love you

[00:31.44]For a thousand years, dear
[00:35.51]Time is nothing when I'm here with you, oh-oh-ooh
[00:40.93]All my fears, tears, those memories, they disappear with you, oh-oh-ooh
[00:49.33]Till I turn into dust, I'll carry this love, my dear
[00:56.46]For a thousand years

[01:06.28]Saw very soon, something will bloom, like a lotus flower
[01:11.07]The bluest Moon will soon be Sun and turn to golden hour
[01:15.24]Hours and days, lost in your gaze, losing track of time
[01:19.21]Learning how to slow it down, appreciate our lives

[01:23.39]Just know, until I'm in the grave
[01:27.90]Darling, I'll love you

[01:33.00]For a thousand years, dear
[01:34.56]Time is nothing when I'm here with you, oh-oh-ooh
[01:39.53]All my fears, tears, those memories, they disappear with you, oh-oh-ooh
[01:48.10]Till I turn into dust, I'll carry this love, my dear
[01:55.12]For a thousand years

[02:01.02]Oh-ooh, ayy
[02:05.94]Set it all on fire, let it burn up brighter
[02:09.67]Love is a flame, and it's dancing away, to David playing on a lyre
[02:13.55]Set it all on fire, let the smoke go higher

[02:18.32]'Cause daring, I'll love you

[02:20.43]For a thousand years, dear
[02:24.40]Time is nothing when I'm here with you, oh-oh-ooh
[02:29.69]All my fears, tears, those memories, they disappear with you, oh-oh-ooh
[02:38.41]Till the air leaves my lungs, with each breath, I'll hold you near
[02:46.83]Till I turn into dust, I'll carry this love, my dear
[02:53.96]For a thousand years

[02:59.14]--- www.LRCgenerator.com ---`;

const blueLrc = `[ti:blue]
[ar:young aki]
[la:EN]
[re:LRCgenerator.com]
[ve:4.00]

[00:00.63]Your morning eyes, I could stare like watching stars
[00:25.96]I could walk you by and I'll tell without a thought
[00:32.32]You'd be mine, would you mind if I took your hand tonight?
[00:39.89]Know you're all that I want, this life

[00:47.35]I'll imagine we fell in love
[00:50.62]I'll nap under moonlight skies with you
[00:54.54]I think I'll picture us, you with the waves
[00:58.18]The ocean's colors on your face
[01:01.90]I'll leave my heart with your air
[01:06.05]So let me fly with you
[01:09.67]Will you be forever with me?

[01:46.92]My love will always stay by you
[01:52.39]I'll keep it safe, so don't you worry a thing
[01:57.87]I'll tell you I love you more
[02:01.44]It's stuck with you forever, so promise you won't let it go
[02:08.28]I'll trust the Universe will always bring me to you

[02:16.44]I'll imagine we fell in love
[02:19.36]I'll nap under moonlight skies with you
[02:23.23]I think I'll picture us, you with the waves
[02:26.85]The ocean's colors on your face
[02:30.62]I'll leave my heart with your air
[02:34.74]So let me fly with you
[02:38.46]Will you be forever with me?

[02:47.54]--- www.LRCgenerator.com ---`;

const blueTranslationLrc = `[ti:blue]
[ar:young aki]
[la:PT-BR]

[00:00.63]Seus olhos de manha, eu poderia ficar olhando como quem observa as estrelas
[00:25.96]Eu poderia caminhar ao seu lado e dizer tudo sem nem pensar
[00:32.32]Voce seria minha, se importaria se eu segurasse sua mao esta noite?
[00:39.89]Sei que voce e tudo o que eu quero nesta vida

[00:47.35]Eu vou imaginar que nos apaixonamos
[00:50.62]Vou cochilar com voce sob ceus iluminados pela lua
[00:54.54]Acho que vou imaginar nos dois, voce junto das ondas
[00:58.18]As cores do oceano no seu rosto
[01:01.90]Vou deixar meu coracao no seu ar
[01:06.05]Entao me deixa voar com voce
[01:09.67]Voce vai ficar para sempre comigo?

[01:46.92]Meu amor sempre vai permanecer ao seu lado
[01:52.39]Vou mante-lo seguro, entao nao se preocupe com nada
[01:57.87]Vou te dizer que eu te amo ainda mais
[02:01.44]Isso ficou preso em voce para sempre, entao promete que nao vai deixar escapar
[02:08.28]Vou confiar que o Universo sempre vai me trazer ate voce

[02:16.44]Eu vou imaginar que nos apaixonamos
[02:19.36]Vou cochilar com voce sob ceus iluminados pela lua
[02:23.23]Acho que vou imaginar nos dois, voce junto das ondas
[02:26.85]As cores do oceano no seu rosto
[02:30.62]Vou deixar meu coracao no seu ar
[02:34.74]Entao me deixa voar com voce
[02:38.46]Voce vai ficar para sempre comigo?`;

const aThousandYearsTranslationLrc = `[ti:A Thousand Years]
[ar:John Michael Howell]
[la:PT-BR]

[00:00.75]Eu era uma crianca procurando amor, cheio de esperanca por dentro
[00:12.40]Mas o tempo nunca foi gentil comigo, meu coracao ficou frio como gelo
[00:16.69]Sem sorte nenhuma, achei que estava preso, sozinho por toda a minha vida
[00:20.88]Mas eu provei que estava errado no momento em que olhei nos seus olhos

[00:25.03]E verdade, ate eu estar no tumulo
[00:29.08]Meu bem, eu vou te amar

[00:31.44]Por mil anos, querida
[00:35.51]O tempo nao e nada quando estou aqui com voce, oh-oh-ooh
[00:40.93]Todos os meus medos, lagrimas e lembrancas desaparecem com voce, oh-oh-ooh
[00:49.33]Ate eu virar poeira, vou carregar esse amor, minha querida
[00:56.46]Por mil anos

[01:06.28]Vi bem cedo que algo vai florescer, como uma flor de lotus
[01:11.07]A lua mais azul logo vai virar sol e se transformar em hora dourada
[01:15.24]Horas e dias, perdido no seu olhar, perdendo a nocao do tempo
[01:19.21]Aprendendo a desacelerar, a valorizar as nossas vidas

[01:23.39]So saiba, ate eu estar no tumulo
[01:27.90]Meu bem, eu vou te amar

[01:33.00]Por mil anos, querida
[01:34.56]O tempo nao e nada quando estou aqui com voce, oh-oh-ooh
[01:39.53]Todos os meus medos, lagrimas e lembrancas desaparecem com voce, oh-oh-ooh
[01:48.10]Ate eu virar poeira, vou carregar esse amor, minha querida
[01:55.12]Por mil anos

[02:01.02]Oh-ooh, ayy
[02:05.94]Coloque tudo em chamas, deixe arder ainda mais forte
[02:09.67]O amor e uma chama, e esta dancando ao som de Davi tocando uma lira
[02:13.55]Coloque tudo em chamas, deixe a fumaca subir mais alto

[02:18.32]Porque, meu bem, eu vou te amar

[02:20.43]Por mil anos, querida
[02:24.40]O tempo nao e nada quando estou aqui com voce, oh-oh-ooh
[02:29.69]Todos os meus medos, lagrimas e lembrancas desaparecem com voce, oh-oh-ooh
[02:38.41]Ate o ar sair dos meus pulmoes, a cada respiracao vou te manter por perto
[02:46.83]Ate eu virar poeira, vou carregar esse amor, minha querida
[02:53.96]Por mil anos`;

function parseLrc(lrcText) {
  return lrcText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\[(\d{2}):(\d{2}\.\d{2})\](.*)$/);
      if (!match) {
        return null;
      }

      const minutes = Number(match[1]);
      const seconds = Number(match[2]);
      const text = match[3].trim();

      if (!text) {
        return null;
      }

      return {
        time: minutes * 60 + seconds,
        text
      };
    })
    .filter(Boolean);
}

const playlist = [
  {
    title: 'Blue',
    artist: 'Young Kai',
    plays: '9.5M plays',
    src: 'blue.mp3',
    cover: 'Image.jpg',
    lyrics: parseLrc(blueLrc),
    translation: parseLrc(blueTranslationLrc)
  },
  {
    title: 'A Thousand Years',
    artist: 'John Michael Howell, JVKE e ZVC',
    plays: '1.2B plays',
    src: 'A Thousand Years.mp3',
    cover: 'Image2.jpg',
    lyrics: parseLrc(aThousandYearsLrc),
    translation: parseLrc(aThousandYearsTranslationLrc)
  }
];

let currentIndex = 0;
let activeTab = 'queue';
let shuffle = false;
let audioContext;
let analyser;
let sourceNode;
let frequencyData;
let animationFrameId;
let waveformReady = false;
const syncedPanelState = {
  lyrics: -1,
  translation: -1
};
const panelInteractionState = {
  lyrics: {
    autoScrolling: false,
    idleTimer: null,
    userScrolling: false
  },
  translation: {
    autoScrolling: false,
    idleTimer: null,
    userScrolling: false
  }
};

function getPanelContainer(panelName) {
  return panelName === 'translation' ? translationBody : lyricsBody;
}

function schedulePanelResync(panelName) {
  const panelState = panelInteractionState[panelName];
  if (!panelState) {
    return;
  }

  window.clearTimeout(panelState.idleTimer);
  panelState.idleTimer = window.setTimeout(() => {
    panelState.userScrolling = false;

    if (activeTab === panelName) {
      updateSyncedPanel(panelName);
    }
  }, 2000);
}

function registerPanelScroll(panelName) {
  const container = getPanelContainer(panelName);
  if (!container) {
    return;
  }

  container.addEventListener('scroll', () => {
    const panelState = panelInteractionState[panelName];
    if (!panelState || panelState.autoScrolling) {
      return;
    }

    panelState.userScrolling = true;
    schedulePanelResync(panelName);
  });
}

function applyControlIcons() {
  shuffleBtn.innerHTML = controlIcons.shuffle;
  prevBtn.innerHTML = controlIcons.prev;
  nextBtn.innerHTML = controlIcons.next;
  loopBtn.innerHTML = controlIcons.loop;
  playBtn.innerHTML = audio.paused ? controlIcons.play : controlIcons.pause;

  if (volumeIcon) {
    volumeIcon.innerHTML = controlIcons.volume;
  }
}

function renderQueue() {
  if (!queueList) {
    return;
  }

  queueList.innerHTML = '';

  playlist.forEach((track, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'queue-item';
    item.dataset.index = String(index);

    if (index === currentIndex) {
      item.classList.add('active');
    }

    const artistLine = track.artist ? `${track.artist} • ${track.plays}` : track.plays;

    item.innerHTML = `
      <span class="queue-thumb-wrap">
        <img class="queue-thumb" src="${track.cover}" alt="Capa de ${track.title}">
      </span>
      <span class="queue-copy">
        <strong>${track.title}</strong>
        <small>${artistLine}</small>
      </span>
      <span class="queue-more" aria-hidden="true">⋮</span>
    `;

    item.addEventListener('click', async () => {
      if (index === currentIndex) {
        await togglePlay();
        return;
      }

      currentIndex = index;
      loadTrack(currentIndex);

      try {
        setupWaveform();
        await audio.play();
      } catch (error) {
        console.error('Falha ao tocar audio:', error);
      }
    });

    queueList.appendChild(item);
  });
}

function renderTimedPanel(container, lines, emptyMessage) {
  if (!container) {
    return;
  }

  const plainLines = lines.map((line) => (typeof line === 'string' ? line : line.text)).filter(Boolean);
  const timedLines = lines.filter((line) => typeof line === 'object' && line !== null && typeof line.time === 'number');

  if (!plainLines.length) {
    container.innerHTML = emptyMessage;
    return;
  }

  if (timedLines.length) {
    container.innerHTML = `
      <div class="lyrics-track">
        ${timedLines
          .map((line, index) => `<p class="lyric-line is-clickable" data-lyric-index="${index}" data-lyric-time="${line.time}">${line.text}</p>`)
          .join('')}
      </div>
    `;

    Array.from(container.querySelectorAll('.lyric-line')).forEach((lineEl) => {
      lineEl.addEventListener('click', async () => {
        const targetTime = Number(lineEl.dataset.lyricTime);
        if (!Number.isFinite(targetTime)) {
          return;
        }

        audio.currentTime = targetTime;
        updateSyncedLyrics(true);
        updateSyncedTranslation(true);

        if (!audio.paused) {
          return;
        }

        try {
          setupWaveform();
          await audio.play();
        } catch (error) {
          console.error('Falha ao tocar audio:', error);
        }
      });
    });

    return;
  }

  container.innerHTML = `
    <div class="lyrics-track">
      ${plainLines
        .map((line) => `<p class="lyric-line is-static">${line}</p>`)
        .join('')}
    </div>
  `;
}

function renderLyrics() {
  const track = playlist[currentIndex];
  const lines = Array.isArray(track.lyrics) ? track.lyrics.filter(Boolean) : [];

  renderTimedPanel(
    lyricsBody,
    lines,
    `
      <p class="panel-placeholder">Letra ainda nao adicionada para <strong>${track.title}</strong>.</p>
      <p class="panel-note">Voce pode colar os versos direto no objeto da musica em <code>script.js</code>, no campo <code>lyrics</code>.</p>
    `
  );

  syncedPanelState.lyrics = -1;
  updateSyncedPanel('lyrics', true);
}

function renderTranslation() {
  const track = playlist[currentIndex];
  const lines = Array.isArray(track.translation) ? track.translation.filter(Boolean) : [];

  renderTimedPanel(
    translationBody,
    lines,
    `
      <p class="panel-placeholder">Traducao ainda nao adicionada para <strong>${track.title}</strong>.</p>
      <p class="panel-note">Voce pode usar as mesmas linhas do <code>.lrc</code> e trocar o texto, mantendo os timestamps.</p>
    `
  );

  syncedPanelState.translation = -1;
  updateSyncedPanel('translation', true);
}

function updateSyncedPanel(panelName, forceScroll = false) {
  const container = getPanelContainer(panelName);
  if (!container) {
    return;
  }

  const track = playlist[currentIndex];
  const sourceLines = panelName === 'translation' ? track.translation : track.lyrics;
  const lines = Array.isArray(sourceLines) ? sourceLines.filter((line) => typeof line === 'object' && line !== null && typeof line.time === 'number') : [];

  if (!lines.length) {
    return;
  }

  let nextActiveIndex = -1;

  for (let index = 0; index < lines.length; index += 1) {
    if (audio.currentTime >= lines[index].time) {
      nextActiveIndex = index;
    } else {
      break;
    }
  }

  const lyricEls = Array.from(container.querySelectorAll('.lyric-line'));
  const activeChanged = nextActiveIndex !== syncedPanelState[panelName];
  syncedPanelState[panelName] = nextActiveIndex;
  const panelState = panelInteractionState[panelName];

  lyricEls.forEach((lineEl, index) => {
    const distance = syncedPanelState[panelName] === -1 ? Infinity : Math.abs(index - syncedPanelState[panelName]);
    lineEl.classList.toggle('is-active', index === syncedPanelState[panelName]);
    lineEl.classList.toggle('is-near', distance === 1);
    lineEl.classList.toggle('is-far', distance >= 2);
  });

  if (syncedPanelState[panelName] === -1) {
    if (forceScroll) {
      container.scrollTo({ top: 0, behavior: 'auto' });
    }
    return;
  }

  const activeLine = lyricEls[syncedPanelState[panelName]];
  const shouldAutoScroll = forceScroll || (activeChanged && activeTab === panelName && !panelState.userScrolling);

  if (activeLine && shouldAutoScroll) {
    scrollPanelToLine(panelName, container, activeLine, forceScroll);
  }
}

function updateSyncedLyrics(forceScroll = false) {
  updateSyncedPanel('lyrics', forceScroll);
}

function updateSyncedTranslation(forceScroll = false) {
  updateSyncedPanel('translation', forceScroll);
}

function scrollPanelToLine(panelName, container, activeLine, immediate = false) {
  if (!container || !activeLine) {
    return;
  }

  const panelState = panelInteractionState[panelName];
  const track = container.querySelector('.lyrics-track');
  if (!track) {
    return;
  }

  const viewportHeight = container.clientHeight;
  const contentHeight = container.scrollHeight;
  const activeCenter = activeLine.offsetTop + (activeLine.clientHeight / 2);
  const targetScroll = activeCenter - (viewportHeight / 2);
  const maxScroll = Math.max(0, contentHeight - viewportHeight);
  const finalScroll = Math.max(0, Math.min(maxScroll, targetScroll));

  if (panelState) {
    panelState.autoScrolling = true;
  }

  container.scrollTo({
    top: finalScroll,
    behavior: immediate ? 'auto' : 'smooth'
  });

  window.setTimeout(() => {
    if (panelState) {
      panelState.autoScrolling = false;
    }
  }, immediate ? 0 : 320);
}

function setActiveTab(tabName) {
  activeTab = activeTab === tabName ? '' : tabName;

  tabButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === activeTab);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `panel-${activeTab}`);
  });

  if (activeTab === 'lyrics') {
    updateSyncedLyrics(true);
  }

  if (activeTab === 'translation') {
    updateSyncedTranslation(true);
  }
}

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  document.getElementById('track-title').textContent = track.title;
  document.getElementById('track-artist').textContent = track.artist;

  if (cover) {
    cover.setAttribute('aria-label', `Capa do album de ${track.title}`);
  }

  resetProgress();
  renderQueue();
  renderLyrics();
  renderTranslation();
}

function resetProgress() {
  progressFill.style.width = '0%';
  progressThumb.style.left = '0%';
  currentTimeEl.textContent = '0:00';
  durationEl.textContent = '0:00';
}

function formatTime(time) {
  if (!Number.isFinite(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function pad(value, size = 2) {
  return String(value).padStart(size, '0');
}

function getCalendarDiff(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();
  let milliseconds = to.getMilliseconds() - from.getMilliseconds();

  if (milliseconds < 0) {
    milliseconds += 1000;
    seconds -= 1;
  }

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }

  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }

  if (hours < 0) {
    hours += 24;
    days -= 1;
  }

  if (days < 0) {
    const previousMonthDays = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += previousMonthDays;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds, milliseconds };
}

function updateLoveTimer() {
  const now = new Date();
  const diff = getCalendarDiff(startDate, now);

  yearsEl.textContent = diff.years;
  monthsEl.textContent = diff.months;
  daysEl.textContent = diff.days;
  hoursEl.textContent = pad(diff.hours);
  minutesEl.textContent = pad(diff.minutes);
  secondsEl.textContent = pad(diff.seconds);
  millisecondsEl.textContent = pad(diff.milliseconds, 3);
}

function paintIdleWave() {
  const total = waveBars.length;
  waveBars.forEach((bar, index) => {
    const distanceFromCenter = Math.abs(index - (total - 1) / 2);
    const centerBias = 1 - distanceFromCenter / ((total - 1) / 2);
    const shapedBias = Math.pow(centerBias, 1.7);
    bar.style.height = `${9 + shapedBias * 20}px`;
    bar.style.opacity = `${0.3 + shapedBias * 0.6}`;
  });
}

function setupWaveform() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    audioContext = new AudioContextClass();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.58;
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    waveformReady = true;
  }

  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function drawWaveform() {
  if (!waveformReady || !analyser || audio.paused) {
    paintIdleWave();
    animationFrameId = null;
    return;
  }

  analyser.getByteFrequencyData(frequencyData);
  const totalBars = waveBars.length;

  waveBars.forEach((bar, index) => {
    const mirroredIndex = index < totalBars / 2 ? index : totalBars - 1 - index;
    const sourceIndex = Math.min(mirroredIndex, frequencyData.length - 1);
    const value = frequencyData[sourceIndex] / 255;
    const distanceFromCenter = Math.abs(index - (totalBars - 1) / 2);
    const centerBias = 1 - distanceFromCenter / ((totalBars - 1) / 2);
    const shapedBias = Math.pow(centerBias, 1.85);
    const heightBoost = Math.pow(value, 0.75);
    const pulse = Math.abs(Math.sin(performance.now() * 0.012 + index * 0.45)) * 8;
    const edgeFloor = 8 + centerBias * 4;
    const reactiveHeight = heightBoost * (10 + shapedBias * 42);
    const pulseHeight = pulse * value * (0.35 + shapedBias * 0.9);
    const height = Math.max(10, edgeFloor + reactiveHeight + pulseHeight);
    bar.style.height = `${height}px`;
    bar.style.opacity = `${0.32 + Math.min(0.68, heightBoost * (0.28 + shapedBias * 0.72))}`;
  });

  animationFrameId = window.requestAnimationFrame(drawWaveform);
}

async function togglePlay() {
  if (audio.paused) {
    try {
      setupWaveform();
      await audio.play();
    } catch (error) {
      console.error('Falha ao tocar audio:', error);
    }
  } else {
    audio.pause();
  }
}

function updatePlayUI() {
  const isPlaying = !audio.paused;
  playBtn.innerHTML = isPlaying ? controlIcons.pause : controlIcons.play;
  vinyl.classList.toggle('playing', isPlaying);
  renderQueue();
}

function updateProgress() {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  updateSyncedLyrics();
  updateSyncedTranslation();
}

function seek(event) {
  const rect = progressTrack.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  audio.currentTime = ratio * audio.duration;
  updateSyncedLyrics(true);
  updateSyncedTranslation(true);
}

async function nextTrack() {
  if (shuffle) {
    currentIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentIndex = (currentIndex + 1) % playlist.length;
  }

  loadTrack(currentIndex);

  try {
    setupWaveform();
    await audio.play();
  } catch (error) {
    console.error('Falha ao tocar audio:', error);
  }
}

async function prevTrack() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);

  try {
    setupWaveform();
    await audio.play();
  } catch (error) {
    console.error('Falha ao tocar audio:', error);
  }
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveTab(button.dataset.tab);
  });
});
document.addEventListener('touchstart', setupWaveform, { once: true, passive: true });
document.addEventListener('pointerdown', setupWaveform, { once: true, passive: true });

loopBtn.addEventListener('click', () => {
  audio.loop = !audio.loop;
  loopBtn.classList.toggle('active', audio.loop);
});

shuffleBtn.addEventListener('click', () => {
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('active', shuffle);
});

volume.addEventListener('input', (event) => {
  audio.volume = Number(event.target.value);
});

progressTrack.addEventListener('click', seek);

audio.addEventListener('play', () => {
  updatePlayUI();
  if (!animationFrameId) {
    drawWaveform();
  }
});

audio.addEventListener('pause', () => {
  updatePlayUI();
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  paintIdleWave();
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});
audio.addEventListener('ended', nextTrack);

registerPanelScroll('lyrics');
registerPanelScroll('translation');
applyControlIcons();
loadTrack(currentIndex);
setActiveTab(activeTab);
audio.volume = Number(volume.value);
paintIdleWave();
updateLoveTimer();
setInterval(updateLoveTimer, 50);
