# Acceptance gate — SHROUD

## Automated acceptance
- Run `node --test`.
- CI browser smoke: desktop 1440×900, mobile 390×844, sidebar, one visible page, no horizontal page overflow, no uncaught browser errors, core product flow. Browser test blocks external network; it does not verify third-party integration.
- Production: verify exact deployed source and HTTP responses, then repeat manual product flow on the public domain.

## Required live evidence (NOT VERIFIED until demonstrated)
Real Firebase Spark project, enforced App Check, one actual device-only inference and one actual redacted hybrid inference, with verified source receipts. Never enter a Gemini secret or upgrade to Blaze.

## Release criteria
- GitHub Actions green for the exact release commit.
- Manual visual review on desktop and mobile, real platform integration and independent evidence.
- No paid infrastructure, no secret collection, no mainnet. Do not submit as complete while any live requirement is open.
