# Acceptance gate — SHROUD

## Automated acceptance

- Run `node --test`.
- Browser smoke: desktop 1440×900 and mobile 390×844, navigation, no horizontal page overflow, no uncaught errors, route consent gates, receipt export and invalidation. External calls are blocked or stubbed; this is not live AI verification.
- [CI for cloud model fix](https://github.com/Gaucon2021/SHROUD/actions/runs/45932500646) passed.

## Observed live evidence

The owner configured Firebase Spark, Gemini Developer API and Fraud Defense App Check. The console showed Basic enforcement for Firebase AI Logic and a registered web app. The browser reported successful token acquisition and exported three successful inference receipts. See [evidence](../evidence/README.md).

- Hybrid to on-device: observed.
- Device-only to on-device: observed.
- Explicit redacted cloud-only to cloud: observed.
- Automatic hybrid fallback to cloud: not observed.
- Network-level independent attestation: not provided.

## Remaining release checks

Capture automatic fallback on an environment without an available local model if required by the competition; record the exact route and actual source without substituting the cloud-only run. Complete the demo video and submission. Keep Spark, use synthetic inputs and never publish private credentials. Do not claim full PII detection or independently attested inference.
