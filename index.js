const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song Titles
const songs = [
  "Ramsey - Goodbye Arcane",
  "Sting - What Could Have Been Arcane",
  "vc - pf20130218",
];

// Keep track of the songs
let songIndex = 2;
// 2 by default because the songs array has 2 index elements total

// Initially Load Songs into DOM
loadSong(songs[songIndex]);

// Update Song Details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

// playSong and pauseSong, prevSong and nextSong
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;

  // if the song is currently at index 0, will loop back to end of array at index 2
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;

  // if the song is currently at index 2, will loop back to beginning of array at index 0
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress(e) {
  //   console.log(e.srcElement.currentTime);
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  console.log(width);
  // this will give the specific timestamp for where you click
  const clickX = e.offsetX;
  console.log(clickX);
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// progress bar for audio
audio.addEventListener("timeupdate", updateProgress);

// point at progress bar and have audio go to that currentTime
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);
