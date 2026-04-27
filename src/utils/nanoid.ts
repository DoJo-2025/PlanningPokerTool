/** Lightweight crypto-based nanoid – no external dependency needed */
export function nanoid(size = 12): string {
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  return Array.from(bytes, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, size)
}
