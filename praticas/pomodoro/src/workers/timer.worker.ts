let timer: ReturnType<typeof setInterval> | null = null;

self.onmessage = (event: MessageEvent) => {
  const { command, seconds } = event.data;

  if (command === 'start') {
    let currentSeconds = seconds;

    if (timer) {
      clearInterval(timer);
    }

    timer = setInterval(() => {
      currentSeconds -= 1;

      self.postMessage(currentSeconds);

      if (currentSeconds <= 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    }, 1000);
  }

  if (command === 'stop') {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
};