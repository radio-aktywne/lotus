export function encodePath(path: string) {
  return new URL(path, "http://localhost").pathname;
}
