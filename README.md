# SHROUD — Privacy Boundary Workbench

## Development workbench

Explicit device-only and redacted hybrid modes, review invalidation on edit, pattern-based redaction, SHA-256 inference payload receipt and Firebase AI Logic browser adapter.

## Run locally

```sh
node --test
python -m http.server 8000
```

Open http://localhost:8000/. Node 22 recommended. Tests are included; no test or live platform result is asserted without independent verification.

## Integration status

Configure an eligible Firebase AI Logic project and production App Check; verify a real on-device and redacted fallback call. Pattern redaction is not a complete PII classifier.

Use synthetic inputs only. This is a development release, not a production-security or hackathon-completion claim. No paid infrastructure or mainnet transaction is required for the local lab.
