# SHROUD — Firebase live acceptance

## Free-tier configuration (project owner)
1. Open https://console.firebase.google.com/ and create a project without linking Cloud Billing. Confirm the Spark plan.
2. Under AI Services > AI Logic, choose Get started and Gemini Developer API (not the Agent Platform/Vertex API). Register a Web app and copy its public Firebase config object.
3. In Security > App Check, register that same web app with reCAPTCHA Enterprise and authorize the Production hostname shroud-mu.vercel.app. Confirm enforcement for Firebase AI Logic in the APIs tab. Use only the no-cost allowance.
4. On https://shroud-mu.vercel.app/#firebase paste the public web config JSON and public reCAPTCHA site key. Never paste a service account, Gemini API secret, debug token or private key. Connect SDK. Successful token acquisition is necessary but not proof that server-side enforcement is enabled.
5. Follow Chrome device requirements at https://firebase.google.com/docs/ai-logic/hybrid/web/get-started; allow model download on a supported machine. Use synthetic text only.

## Judge walkthrough
- Device-only: inspect the synthetic document, run inference, obtain SDK-reported ON_DEVICE receipt. If unavailable, stop; do not claim offline success.
- Hybrid without consent: expect BLOCK and disabled inference.
- Hybrid with consent: inspect redacted text and run. A real IN_CLOUD result is required to demonstrate cloud fallback; if the result is ON_DEVICE, repeat on a supported fallback test configuration without intentionally sending raw sensitive data.
- Download the receipt metadata from Inference evidence. The hash binds the full prompt; no raw text or response is exported. These client-generated receipts are not independent attestations.
- Record the real UI and source labels in the demo; keep all failed runtime attempts visible and accurately described.

## Current boundary
No provisioned Firebase project, live attestation, or real inference is asserted here. CI tests use synthetic inputs and cannot establish SDK availability or the owner's Chrome device capability.
