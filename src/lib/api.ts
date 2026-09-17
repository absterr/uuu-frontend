import { getAccessToken } from "@/lib/auth";
import { refreshAccessToken } from "@/lib/refresh";

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAccessToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message ?? "Something went wrong");
    (error as { status?: number }).status = response.status;
    throw error;
  }

  return data;
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    return await request<T>(path, options);
  } catch (error) {
    if ((error as { status?: number }).status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return await request<T>(path, options);
      }
    }
    throw error;
  }
}
