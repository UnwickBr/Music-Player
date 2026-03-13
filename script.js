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
const waveCanvas = document.getElementById('wave-canvas');
const waveContext = waveCanvas.getContext('2d');

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

function resizeWaveCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = waveCanvas.getBoundingClientRect();
  waveCanvas.width = rect.width * ratio;
  waveCanvas.height = rect.height * ratio;
  waveContext.setTransform(1, 0, 0, 1, 0, 0);
  waveContext.scale(ratio, ratio);
}

function drawIdleWave(width, height) {
  waveContext.clearRect(0, 0, width, height);
  const bars = 24;
  const gap = 4;
  const barWidth = (width - gap * (bars - 1)) / bars;
  const centerY = height / 2;

  for (let index = 0; index < bars; index += 1) {
    const x = index * (barWidth + gap);
    const distanceFromCenter = Math.abs(index - (bars - 1) / 2);
    const centerBias = 1 - distanceFromCenter / ((bars - 1) / 2);
    const barHeight = 8 + centerBias * 16;
    const y = centerY - barHeight / 2;
    const gradient = waveContext.createLinearGradient(0, y, 0, y + barHeight);
    gradient.addColorStop(0, 'rgba(102, 217, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 93, 168, 0.22)');
    waveContext.fillStyle = gradient;
    waveContext.fillRect(x, y, barWidth, barHeight);
  }
}

function setupWaveform() {
  if (!audioContext) {
    audioContext = new window.AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.82;
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function drawWaveform() {
  const width = waveCanvas.clientWidth;
  const height = waveCanvas.clientHeight;

  if (!analyser || audio.paused) {
    drawIdleWave(width, height);
    animationFrameId = null;
    return;
  }

  analyser.getByteFrequencyData(frequencyData);
  waveContext.clearRect(0, 0, width, height);

  const bars = frequencyData.length;
  const gap = 3;
  const barWidth = (width - gap * (bars - 1)) / bars;

  for (let index = 0; index < bars; index += 1) {
    const mirroredIndex = index < bars / 2 ? index : bars - 1 - index;
    const value = frequencyData[mirroredIndex] / 255;
    const distanceFromCenter = Math.abs(index - (bars - 1) / 2);
    const centerBias = 1 - distanceFromCenter / ((bars - 1) / 2);
    const barHeight = Math.max(8, value * height * (0.4 + centerBias * 0.7));
    const x = index * (barWidth + gap);
    const y = (height - barHeight) / 2;
    const gradient = waveContext.createLinearGradient(0, y, 0, y + barHeight);
    gradient.addColorStop(0, 'rgba(102, 217, 255, 0.95)');
    gradient.addColorStop(0.5, 'rgba(159, 115, 255, 0.88)');
    gradient.addColorStop(1, 'rgba(255, 93, 168, 0.92)');
    waveContext.fillStyle = gradient;
    waveContext.fillRect(x, y, barWidth, barHeight);
  }

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
  drawIdleWave(waveCanvas.clientWidth, waveCanvas.clientHeight);
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});
audio.addEventListener('ended', nextTrack);

window.addEventListener('resize', () => {
  resizeWaveCanvas();
  if (!animationFrameId) {
    drawIdleWave(waveCanvas.clientWidth, waveCanvas.clientHeight);
  }
});

loadTrack(currentIndex);
audio.volume = Number(volume.value);
resizeWaveCanvas();
drawIdleWave(waveCanvas.clientWidth, waveCanvas.clientHeight);
updateLoveTimer();
setInterval(updateLoveTimer, 50);
