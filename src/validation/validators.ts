export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}
