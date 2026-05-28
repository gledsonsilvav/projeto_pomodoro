export class TimerWorkerManager {
  private static instance: TimerWorkerManager;

  private worker: Worker | null = null;

  private constructor() {
    try {
      this.worker = new Worker(
        new URL('./timer.worker.ts', import.meta.url),
        {
          type: 'module',
        },
      );
    } catch (error) {
      console.error(
        'Erro ao inicializar o TimerWorker:',
        error,
      );
    }
  }

  public static getInstance(): TimerWorkerManager {
    if (!TimerWorkerManager.instance) {
      TimerWorkerManager.instance =
        new TimerWorkerManager();
    }

    return TimerWorkerManager.instance;
  }

  public postMessage(message: unknown): void {
    if (this.worker) {
      this.worker.postMessage(message);
    }
  }

  public onmessage(
    callback: (e: MessageEvent) => void,
  ): void {
    if (this.worker) {
      this.worker.onmessage = callback;
    }
  }

  public terminate(): void {
    if (this.worker) {
      this.worker.terminate();

      this.worker = new Worker(
        new URL('./timer.worker.ts', import.meta.url),
        {
          type: 'module',
        },
      );
    }
  }
}