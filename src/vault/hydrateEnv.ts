import { fetchVaultSecrets } from "./vaultClient";

export interface HydrateEnvOptions {
  /** Only these keys are copied from Vault onto process.env, even if Vault returns more. */
  keys: readonly string[];
  /** Defaults to "secret/data/<consumer>" via VAULT_SECRET_PATH if not provided. */
  secretPath?: string;
  logger?: { info: (msg: string) => void; warn: (msg: string) => void };
}

/**
 * Reads VAULT_ADDR / VAULT_ROLE_ID / VAULT_SECRET_ID from process.env and, if all three
 * are set, fetches the secret bundle from Vault and overwrites the listed keys on
 * process.env before the rest of the app boots. If Vault env vars are absent (local dev),
 * this is a no-op and whatever is already in process.env / .env is used instead.
 */
export async function hydrateEnvFromVault({ keys, secretPath, logger = console }: HydrateEnvOptions): Promise<void> {
  const { VAULT_ADDR, VAULT_ROLE_ID, VAULT_SECRET_ID, VAULT_SECRET_PATH } = process.env;

  if (!VAULT_ADDR || !VAULT_ROLE_ID || !VAULT_SECRET_ID) {
    logger.info("Vault AppRole credentials not set — skipping Vault, using local environment values.");
    return;
  }

  const resolvedPath = secretPath ?? VAULT_SECRET_PATH;
  if (!resolvedPath) {
    throw new Error("VAULT_ADDR/VAULT_ROLE_ID/VAULT_SECRET_ID are set but no secretPath/VAULT_SECRET_PATH was provided.");
  }

  const secrets = await fetchVaultSecrets({
    addr: VAULT_ADDR,
    roleId: VAULT_ROLE_ID,
    secretId: VAULT_SECRET_ID,
    secretPath: resolvedPath,
  });

  let applied = 0;
  for (const key of keys) {
    if (secrets[key] !== undefined) {
      process.env[key] = secrets[key];
      applied += 1;
    }
  }

  logger.info(`Hydrated ${applied}/${keys.length} env vars from Vault (${resolvedPath}).`);
}
