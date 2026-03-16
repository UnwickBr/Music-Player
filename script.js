const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const loopBtn = document.getElementById('loop-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const volume = document.getElementById('volume');
const progressTrack = document.getElementById('progress-track');
const progressFill = document.getElementById('progress-fill');
const progressThumb = document.getElementById('progress-thumb');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const vinyl = document.getElementById('vinyl');
const cover = document.getElementById('cover');
const queueList = document.getElementById('queue-list');
const lyricsBody = document.getElementById('lyrics-body');
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
    lyrics: []
  },
  {
    title: 'A Thousand Years',
    artist: 'John Michael Howell, JVKE e ZVC',
    plays: '1.2B plays',
    src: 'A Thousand Years.mp3',
    cover: 'Image2.jpg',
    lyrics: parseLrc(aThousandYearsLrc)
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
let activeLyricIndex = -1;

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

function renderLyrics() {
  if (!lyricsBody) {
    return;
  }

  const track = playlist[currentIndex];
  const lines = Array.isArray(track.lyrics) ? track.lyrics.filter(Boolean) : [];
  const plainLines = lines.map((line) => (typeof line === 'string' ? line : line.text)).filter(Boolean);
  const timedLines = lines.filter((line) => typeof line === 'object' && line !== null && typeof line.time === 'number');

  if (!plainLines.length) {
    lyricsBody.innerHTML = `
      <p class="panel-placeholder">Letra ainda nao adicionada para <strong>${track.title}</strong>.</p>
      <p class="panel-note">Voce pode colar os versos direto no objeto da musica em <code>script.js</code>, no campo <code>lyrics</code>.</p>
    `;
    return;
  }

  if (timedLines.length) {
    lyricsBody.innerHTML = `
      <div class="lyrics-track">
        ${timedLines
          .map((line, index) => `<p class="lyric-line" data-lyric-index="${index}">${line.text}</p>`)
          .join('')}
      </div>
    `;
    activeLyricIndex = -1;
    updateSyncedLyrics(true);
    return;
  }

  lyricsBody.innerHTML = `
    <div class="lyrics-track">
      ${plainLines
        .map((line) => `<p class="lyric-line is-static">${line}</p>`)
        .join('')}
    </div>
  `;
}

function updateSyncedLyrics(forceScroll = false) {
  if (!lyricsBody) {
    return;
  }

  const track = playlist[currentIndex];
  const lines = Array.isArray(track.lyrics) ? track.lyrics.filter((line) => typeof line === 'object' && line !== null && typeof line.time === 'number') : [];

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

  const lyricEls = Array.from(lyricsBody.querySelectorAll('.lyric-line'));
  const activeChanged = nextActiveIndex !== activeLyricIndex;
  activeLyricIndex = nextActiveIndex;

  lyricEls.forEach((lineEl, index) => {
    const distance = activeLyricIndex === -1 ? Infinity : Math.abs(index - activeLyricIndex);
    lineEl.classList.toggle('is-active', index === activeLyricIndex);
    lineEl.classList.toggle('is-near', distance === 1);
    lineEl.classList.toggle('is-far', distance >= 2);
  });

  if (activeLyricIndex === -1) {
    if (forceScroll) {
      lyricsBody.scrollTop = 0;
    }
    return;
  }

  const activeLine = lyricEls[activeLyricIndex];
  if (activeLine && (forceScroll || (activeChanged && activeTab === 'lyrics'))) {
    scrollLyricsToLine(activeLine, forceScroll);
  }
}

function scrollLyricsToLine(activeLine, immediate = false) {
  if (!lyricsBody || !activeLine) {
    return;
  }

  const track = lyricsBody.querySelector('.lyrics-track');
  if (!track) {
    return;
  }

  const viewportHeight = lyricsBody.clientHeight;
  const trackHeight = track.scrollHeight;
  const activeCenter = activeLine.offsetTop + (activeLine.clientHeight / 2);
  const minTranslate = Math.min(0, viewportHeight - trackHeight);
  const maxTranslate = 0;
  const targetTranslate = (viewportHeight / 2) - activeCenter;
  const finalTranslate = Math.max(minTranslate, Math.min(maxTranslate, targetTranslate));

  track.classList.toggle('no-transition', immediate);
  track.style.transform = `translateY(${finalTranslate}px)`;
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
  playBtn.textContent = isPlaying ? '❚❚' : '▶';
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
}

function seek(event) {
  const rect = progressTrack.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  audio.currentTime = ratio * audio.duration;
  updateSyncedLyrics(true);
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

loadTrack(currentIndex);
setActiveTab(activeTab);
audio.volume = Number(volume.value);
paintIdleWave();
updateLoveTimer();
setInterval(updateLoveTimer, 50);
