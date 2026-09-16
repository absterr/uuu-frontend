import { useSyncExternalStore } from "react";
import { getAccessToken, subscribeAuth } from "@/lib/auth";

export function useAuth() {
  return useSyncExternalStore(subscribeAuth, () => getAccessToken() !== null);
}
