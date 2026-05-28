// Ambient declarations for runtime secrets that `wrangler types` doesn't capture.
// LEMMA_API_KEY is the Bearer token for the api.irere.dev content API — it lives in
// .dev.vars locally and is set as a Cloudflare secret in production.
// (No imports/exports here on purpose: this file must stay a global script so it
// merges with the `Cloudflare.Env` interface generated in worker-configuration.d.ts.)
declare namespace Cloudflare {
  interface Env {
    LEMMA_API_KEY: string
  }
}
