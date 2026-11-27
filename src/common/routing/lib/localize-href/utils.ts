export function isAbsolutePath(path: string) {
  return path.startsWith("/") && !path.startsWith("//");
}
