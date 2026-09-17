import { clearSession, getRefreshToken, setSession } from "@/lib/auth";

const API_URL = import.meta.env.VITE_API_URL;

let inFlight: Promise<string | null> | null = null;

async function refresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      clearSession();
      return null;
    }

    const data = await response.json();
    setSession(data.session);
    return data.session.access_token as string;
  } catch {
    clearSession();
    return null;
  }
}

export function refreshAccessToken(): Promise<string | null> {
  if (!inFlight) {
    inFlight = refresh().finally(() => {
      inFlight = null;
    });
  }

  return inFlight;
}
