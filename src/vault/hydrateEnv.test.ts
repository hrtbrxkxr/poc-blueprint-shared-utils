import { afterEach, describe, expect, it, vi } from "vitest";
import { hydrateEnvFromVault } from "./hydrateEnv";

describe("hydrateEnvFromVault", () => {
  const original = { ...process.env };

  afterEach(() => {
    process.env = { ...original };
    vi.unstubAllGlobals();
  });

  it("is a no-op when Vault AppRole credentials are absent", async () => {
    delete process.env.VAULT_ADDR;
    delete process.env.VAULT_ROLE_ID;
    delete process.env.VAULT_SECRET_ID;
    process.env.JWT_ISSUER = "local-issuer";

    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    await hydrateEnvFromVault({ keys: ["JWT_ISSUER"], logger: { info: () => {}, warn: () => {} } });

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(process.env.JWT_ISSUER).toBe("local-issuer");
  });
});
