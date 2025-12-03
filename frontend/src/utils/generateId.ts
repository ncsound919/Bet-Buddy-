/**
 * Generates a unique ID using a combination of timestamp, random values, and a counter.
 * This provides better uniqueness guarantees than Date.now() alone.
 * 
 * Format: prefix-timestamp-random
 * Example: bet-1a2b3c4d5e6f7890-x9y8z7
 */

let counter = 0;

export function generateUniqueId(prefix: string = 'id'): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  const counterPart = (counter++).toString(36);
  
  return `${prefix}-${timestamp}-${randomPart}-${counterPart}`;
}

/**
 * Generates a UUID v4-like string for maximum uniqueness.
 * Uses crypto.randomUUID() if available, otherwise falls back to a manual implementation.
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback implementation for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
