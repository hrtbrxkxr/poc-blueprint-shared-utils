export function createTypedStorage<T>(key: string) {
  return {
    get(): T | null {
      if (typeof window === "undefined") return null;
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    },
    set(value: T): void {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(value));
    },
    remove(): void {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(key);
    },
  };
}
