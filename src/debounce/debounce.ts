export function debounce<Args extends unknown[]>(fn: (...args: Args) => void, waitMs: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return (...args: Args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), waitMs);
  };
}

export function throttle<Args extends unknown[]>(fn: (...args: Args) => void, intervalMs: number) {
  let lastCall = 0;
  return (...args: Args) => {
    const now = Date.now();
    if (now - lastCall >= intervalMs) {
      lastCall = now;
      fn(...args);
    }
  };
}
