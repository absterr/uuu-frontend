import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import APIKeyRow from "@/components/app/account/api-keys/APIKeyRows";
import { useAuth } from "@/hooks/use-auth";
import {
  createAPIKey,
  deleteAPIKey,
  getAPIKeys,
  revokeAPIKey,
} from "@/lib/requests";

export const Route = createFileRoute("/_app/_account/api-keys")({
  component: ApiKeysPage,
});

function ApiKeysPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [newKeyName, setNewKeyName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const isEnterprise = user?.plan === "enterprise";
  const apiKeysQuery = useQuery({
    queryKey: ["api-keys"],
    queryFn: getAPIKeys,
  });

  const createMutation = useMutation({
    mutationFn: createAPIKey,
    onSuccess: (data) => {
      setNewKeyName("");
      setCreatedKey(data.api_key.key);
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key created.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const revokeMutation = useMutation({
    mutationFn: revokeAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key revoked.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAPIKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      toast.success("API key deleted.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreate = () => {
    const name = newKeyName.trim();

    if (!name || createMutation.isPending) return;

    createMutation.mutate(name);
  };

  return (
    <>
      <header className="hidden border-b border-foreground/10 pb-4 lg:block">
        <h1 className="text-sm font-medium text-foreground/60">API Keys</h1>
      </header>

      <div className="flex w-full max-w-3xl flex-col lg:py-8">
        <section className="flex flex-col gap-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-medium text-foreground">API keys</h2>
              <p className="pt-1 text-xs text-foreground/50">
                Manage keys used to access your account.
              </p>
            </div>

            {isEnterprise ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(event) => setNewKeyName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleCreate();
                  }}
                  placeholder="Key name"
                  className={`w-28 border border-foreground/15 bg-foreground/5 px-3
                    py-2 text-xs text-foreground outline-none focus:border-accent`}
                />

                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={!newKeyName.trim() || createMutation.isPending}
                  className={`shrink-0 cursor-pointer bg-plum px-3 py-2 text-xs font-medium
                    text-background hover:bg-plum/90 disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {createMutation.isPending ? "Creating..." : "Create key"}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <p className="text-xs text-foreground/50">
                  API keys are available on the Enterprise plan.
                </p>

                <button
                  type="button"
                  className="shrink-0 bg-plum px-3 py-2 text-xs font-medium text-white"
                >
                  Upgrade
                </button>
              </div>
            )}
          </div>

          {createdKey && (
            <div className="border border-foreground/10 bg-foreground/5 p-3">
              <p className="mb-2 text-xs text-foreground/50">
                API key created. Copy it now, as the full key will not be shown
                again.
              </p>
              <code className="block break-all font-mono text-xs text-foreground/70">
                {createdKey}
              </code>
            </div>
          )}

          {apiKeysQuery.isLoading && (
            <p className="text-xs text-foreground/40">Loading API keys...</p>
          )}

          {apiKeysQuery.isError && (
            <p className="text-xs text-red-500">Failed to load API keys.</p>
          )}

          {apiKeysQuery.data && (
            <div>
              {apiKeysQuery.data.api_keys.map((apiKey) => (
                <APIKeyRow
                  key={apiKey.id}
                  apiKey={apiKey}
                  onRevoke={() => revokeMutation.mutate(apiKey.id)}
                  onDelete={() => deleteMutation.mutate(apiKey.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
