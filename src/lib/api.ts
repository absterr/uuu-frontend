import { getAccessToken } from "@/lib/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
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
    throw new Error(data.message ?? "Something went wrong");
  }

  return data;
}
