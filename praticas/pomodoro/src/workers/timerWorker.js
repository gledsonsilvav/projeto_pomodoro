/* eslint-disable no-restricted-globals */
let interval = null;

self.onmessage = function (event) {
  const data = event.data;

  // Inicia o cronômetro apenas se receber o comando correto
  if (data.type === 'START_TIMER') {
    let seconds = data.seconds;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      seconds -= 1;
      
      if (seconds <= 0) {
        self.postMessage(0);
        clearInterval(interval);
      } else {
        self.postMessage(seconds);
      }
    }, 1000);
  }

  // Para o cronômetro imediatamente
  if (data.type === 'STOP_TIMER') {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }
};