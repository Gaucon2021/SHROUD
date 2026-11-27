# SHROUD — Verify the privacy boundary before inference

SHROUD is a browser-based privacy-aware hybrid AI workbench for the Google #BuildHybridAI hackathon. It separates the user's original document from a reviewed, pattern-redacted payload before invoking Firebase AI Logic.

[Live demo](https://shroud-mu.vercel.app/) · [Live evidence](evidence/README.md) · [Firebase setup](docs/firebase-setup.md) · [Acceptance criteria](docs/acceptance.md)

## Three explicit inference routes

| Route | Policy |
| --- | --- |
| Device only | Original document; Firebase ONLY_ON_DEVICE; no cloud fallback |
| Redacted hybrid | Explicit consent; redacted preview; PREFER_ON_DEVICE |
| Redacted cloud | Explicit consent; redacted preview; ONLY_IN_CLOUD |

The cloud-capable routes explicitly select Gemini 3.5 Flash-Lite. The browser SDK obtains a Firebase App Check token before enabling inference. The application rejects detected secret patterns for cloud-capable routes, invalidates stale reviews on edits, and rejects unexpected SDK source metadata for device-only or cloud-only requests.

## Live evidence — 27 November 2026

Four owner-provided browser receipts record hybrid-to-device, device-only-to-device, explicit cloud-only-to-cloud inference, and controlled automatic hybrid fallback to cloud. Recomputing SHA-256 from the synthetic fixture and fixed prompt independently confirms the prompt digests. The [controlled fallback page](https://shroud-mu.vercel.app/fallback-test) restricts the browser Prompt API using `Permissions-Policy: language-model=()`, retains `PREFER_ON_DEVICE`, and records `localModelAvailability: unavailable` and SDK-reported `IN_CLOUD`. This is distinct from the cloud-only route. Receipts are unsigned browser metadata, not independent attestations or network traffic audits.

## Run locally

```sh
node --test
python -m http.server 8000
```

Open http://localhost:8000/ for the local workbench. The prefilled production App Check configuration is authorized for the production hostname, not localhost. Do not disable App Check to run the demo. Use synthetic documents only.

## Security boundaries

Pattern redaction is incomplete and does not guarantee anonymity. Names and other unrecognized sensitive data may remain. Consent applies to the exact preview. The receipt hashes the prompt, not the complete model request or response, and does not establish trusted execution. Do not treat SHROUD as a production-certified privacy system. The owner configured Firebase Spark; no billing upgrade is required for the demonstrated run.

MIT license.
