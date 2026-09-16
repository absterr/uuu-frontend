import { useQuery } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";

import { api } from "@/lib/api";
import { getAccessToken, subscribeAuth } from "@/lib/auth";

export interface UserProfile {
  id: string;
  auth_id: string;
  email: string;
  name: string;
  plan: string;
  analyses_used: number;
  role: string;
  verified: boolean;
  created_at: string;
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(
    subscribeAuth,
    () => getAccessToken() !== null,
  );

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => api<UserProfile>("/auth/profile"),
    enabled: isAuthenticated,
  });

  return {
    isAuthenticated,
    user: profileQuery.data ?? null,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
  };
}
