let accessToken: string | null = null;
const listeners = new Set<() => void>();

export function getAccessToken() {
  return accessToken;
}

export function setAccessToken(token: string) {
  accessToken = token;
  listeners.forEach((l) => l());
}

export function clearAccessToken() {
  accessToken = null;
  listeners.forEach((l) => l());
}

export function subscribeAuth(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
