# SHROUD — Firebase live acceptance

The production domain https://shroud-mu.vercel.app/ has prefilled public web identifiers for the owner-configured Spark project. No service account credentials or Gemini API secret should be entered.

## Configuration for a separate project

1. Create a Firebase Spark project without Cloud Billing.
2. Enable Firebase AI Logic with Gemini Developer API and register a Web app.
3. Register that app with Fraud Defense (formerly reCAPTCHA Enterprise), authorize the hosting domain and check Firebase AI Logic enforcement.
4. Enter public Firebase web configuration and site key in Firebase setup; connect SDK. Token acquisition alone does not establish server-side enforcement.
5. Follow [Chrome device requirements](https://firebase.google.com/docs/ai-logic/hybrid/web/get-started) for local inference.

## Judge walkthrough

- Connect SDK on the authorized production domain.
- Device-only: inspect synthetic input and run. Expect ON_DEVICE if supported.
- Hybrid without consent: expect BLOCK.
- Hybrid with consent: inspect the redacted preview and run. The SDK prefers local inference and can fall back to cloud. Only an actual IN_CLOUD result under this hybrid route demonstrates fallback.
- Redacted cloud: explicitly select cloud-only and consent, inspect and run. Expect IN_CLOUD. This is distinct from automatic fallback.
- Download proof metadata before changing inputs or refreshing. The client receipt hashes the prompt, does not export raw input or output, and is unsigned.

See [observed evidence](../evidence/README.md). Use synthetic inputs only.
