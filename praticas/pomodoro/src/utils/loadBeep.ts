import gravitationalBeep from '../assets/audios/gravitational_beep.mp3';

const audio = new Audio(gravitationalBeep);

audio.load();

export function unlockBeep() {
  audio.volume = 0;

  audio
    .play()
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    })
    .catch(() => {
      audio.volume = 1;
    });
}

export function playBeep() {
  audio.muted = false;
  audio.volume = 1;
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.log(error);
  });
}