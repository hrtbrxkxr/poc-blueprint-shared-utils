export interface VaultAppRoleConfig {
  addr: string;
  roleId: string;
  secretId: string;
  /** KV v2 data path, e.g. "secret/data/consumer-a" */
  secretPath: string;
}

interface VaultLoginResponse {
  auth: { client_token: string; lease_duration: number };
}

interface VaultKvV2Response {
  data: { data: Record<string, string> };
}

/**
 * Authenticates to Vault with AppRole and reads a KV v2 secret.
 * Throws on any non-2xx response — callers decide whether that's fatal
 * (production) or safe to fall back from (local dev without Vault).
 */
export async function fetchVaultSecrets(config: VaultAppRoleConfig): Promise<Record<string, string>> {
  const loginResponse = await fetch(`${config.addr}/v1/auth/approle/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role_id: config.roleId, secret_id: config.secretId }),
  });

  if (!loginResponse.ok) {
    throw new Error(`Vault AppRole login failed: ${loginResponse.status} ${loginResponse.statusText}`);
  }

  const { auth } = (await loginResponse.json()) as VaultLoginResponse;

  const secretResponse = await fetch(`${config.addr}/v1/${config.secretPath}`, {
    headers: { "X-Vault-Token": auth.client_token },
  });

  if (!secretResponse.ok) {
    throw new Error(`Vault secret read failed: ${secretResponse.status} ${secretResponse.statusText}`);
  }

  const { data } = (await secretResponse.json()) as VaultKvV2Response;
  return data.data;
}
