# Demo recording and submission

Target: 2 minutes 30 seconds, English subtitles, public YouTube video, no voiceover required. Use the public production URL https://shroud-mu.vercel.app/ and synthetic input only.

## Recording sequence

| Time | Screen | English caption |
| --- | --- | --- |
| 00:00–00:12 | Document boundary | SHROUD — Protect data before inference. |
| 00:12–00:25 | Synthetic support case | Hybrid AI should not mean unrestricted cloud access. |
| 00:25–00:40 | Firebase setup, Connect SDK | Firebase AI Logic with App Check protects the configured runtime. |
| 00:40–01:05 | Device-only, consent off, inspect, run | Sensitive input stays on-device for this inference route. |
| 01:05–01:25 | Device receipt and download | The SDK reports ON_DEVICE. Export prompt integrity metadata. |
| 01:25–01:40 | Hybrid, consent off, inspect | No cloud consent? SHROUD blocks the hybrid request. |
| 01:40–02:00 | Hybrid, consent on, inspect | Review the redacted payload before allowing cloud-capable inference. |
| 02:00–02:20 | Controlled fallback page, consent, inspect, run | Local model unavailable. Firebase hybrid inference automatically falls back to cloud. |
| 02:20–02:30 | Receipt and GitHub | Reproduce prompt hashes. Keep inference provenance transparent. |

## Submission draft

**Tagline:** Protect data before inference.

**Description:** SHROUD is a privacy-aware hybrid AI workbench that gives users explicit control over whether a synthetic document is processed on-device or through a reviewed cloud-capable route. It integrates Firebase AI Logic, Gemini Nano on supported Chrome devices, Gemini 3.5 Flash-Lite in the cloud and Firebase App Check. A deterministic privacy policy blocks detected secret patterns on cloud-capable routes and redacts recognized email, phone and payment-card patterns. Users must consent and review the payload before inference. Unsigned receipts report the SDK source and SHA-256 digest of the full prompt.

**Observed:** Hybrid-to-device, device-only, explicit cloud-only and controlled automatic hybrid fallback have produced live receipts. The controlled fallback uses a document Permissions Policy to restrict Prompt API access, while retaining Firebase PREFER_ON_DEVICE. Pattern redaction is not complete anonymization; the receipts are not signed execution attestations.

**Built with:** Firebase AI Logic Web SDK, Firebase App Check, Gemini, JavaScript, Web Crypto, Node.js, Playwright, Vercel.

**Links:** https://shroud-mu.vercel.app/ and https://github.com/Gaucon2021/SHROUD

**Video:** Pending public YouTube URL. No submission has been sent.
