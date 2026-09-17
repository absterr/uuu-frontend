let accessToken: string | null = null;
const listeners = new Set<() => void>();

const REFRESH_TOKEN_KEY = "refresh_token";

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

export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string) {
  sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function clearRefreshToken() {
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function setSession(session: {
  access_token: string;
  refresh_token: string;
}) {
  setAccessToken(session.access_token);
  setRefreshToken(session.refresh_token);
}

export function clearSession() {
  clearAccessToken();
  clearRefreshToken();
}

export function subscribeAuth(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
