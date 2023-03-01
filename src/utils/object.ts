export function isEmptyObject<T>(obj: Record<string, unknown> | T): boolean {
  return !!(obj && Object.keys(obj).length === 0);
}
