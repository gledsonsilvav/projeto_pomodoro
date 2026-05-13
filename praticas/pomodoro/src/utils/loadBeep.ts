import gravitationalBeep from '../assets/audios/gravitational_beep.mp3';

/**
 * Prepares a short notification sound for playback in the browser.
 *
 * Browsers (especially Safari) often block `HTMLMediaElement.play()` unless
 * audio was “unlocked” in a user-gesture context.
 */

export function loadBeep() {
  const audio = new Audio(gravitationalBeep);

  audio.load();

  return () => {
    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.log('Erro ao tocar áudio', error);
    });
  };
}