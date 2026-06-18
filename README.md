# @hrtbrxkxr/shared-utils

Framework-agnostic utility functions shared across shell and modules.

## Modules

- `date/` — formatting, relative time
- `number/` — currency, rounding
- `string/` — slugify, truncate
- `storage/` — typed localStorage wrapper
- `logger/` — structured logger
- `debounce/` — debounce/throttle
- `validation/` — common zod-free validators

## This repo runs standalone

No UI here — clone it on its own and run its test suite directly:

```bash
git clone git@github.com:hrtbrxkxr/poc-blueprint-shared-utils.git
cd poc-blueprint-shared-utils
pnpm install
pnpm test
```

## Build

```bash
pnpm build       # tsc -> dist/ (JS + .d.ts)
pnpm dev         # tsc --watch, keeps dist/ live while editing
```

## Publishing

Published to GitHub Packages, not the public npm registry. After merging a change to `main`:

```bash
npm version patch
git push origin main --tags
```

Pushing the version tag triggers `.github/workflows/publish.yml` (build + `pnpm publish`). See [docs/submodule-guide.md](../../docs/submodule-guide.md#publishing-shared-ui--shared-utils) in the consumer repo for the full flow.
