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
const yearsEl = document.getElementById('years');
const monthsEl = document.getElementById('months');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const waveBars = Array.from(document.querySelectorAll('.wave-bar'));

const startDate = new Date(2025, 5, 7, 0, 0, 0, 0);

const playlist = [
  {
    title: 'Blue',
    artist: 'Young Kai',
    src: 'blue.mp3'
  }
];

let currentIndex = 0;
let shuffle = false;
let audioContext;
let analyser;
let sourceNode;
let frequencyData;
let animationFrameId;
let waveformReady = false;

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  document.getElementById('track-title').textContent = track.title;
  document.getElementById('track-artist').textContent = track.artist;
  if (cover) {
    cover.setAttribute('aria-label', `Capa do album de ${track.title}`);
  }
  resetProgress();
}

function resetProgress() {
  progressFill.style.width = '0%';
  progressThumb.style.left = '0%';
  currentTimeEl.textContent = '0:00';
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
    bar.style.height = `${12 + centerBias * 18}px`;
    bar.style.opacity = `${0.35 + centerBias * 0.55}`;
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
    analyser.smoothingTimeConstant = 0.82;
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
    const height = Math.max(10, 10 + value * 18 + centerBias * 26);
    bar.style.height = `${height}px`;
    bar.style.opacity = `${0.45 + Math.min(0.5, value * 0.6)}`;
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
}

function updateProgress() {
  if (!audio.duration) return;
  const percent = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function seek(event) {
  const rect = progressTrack.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  audio.currentTime = ratio * audio.duration;
}

function nextTrack() {
  if (shuffle) {
    currentIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentIndex = (currentIndex + 1) % playlist.length;
  }
  loadTrack(currentIndex);
  audio.play();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
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
audio.volume = Number(volume.value);
paintIdleWave();
updateLoveTimer();
setInterval(updateLoveTimer, 50);
