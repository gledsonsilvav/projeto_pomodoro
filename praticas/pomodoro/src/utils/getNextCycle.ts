export function getNextCycle(currentCycle: number) {
  // Se o ciclo atual for 0 (início) ou 8 (fim da jornada), o próximo é o 1.
  // Caso contrário, apenas avança um número.
  return currentCycle === 0 || currentCycle === 8 ? 1 : currentCycle + 1;
}