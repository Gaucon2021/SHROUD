import{test}from "node:test";import assert from "node:assert/strict";import{confirmSource}from "./runtime-policy.mjs";
const s={ON_DEVICE:"on_device",IN_CLOUD:"in_cloud"};
test("device source enum",()=>assert.equal(confirmSource("DEVICE_ONLY",s.ON_DEVICE,s),"ON_DEVICE"));
test("hybrid local",()=>assert.equal(confirmSource("REVIEW_REDACTED",s.ON_DEVICE,s),"ON_DEVICE"));
test("hybrid cloud",()=>assert.equal(confirmSource("REVIEW_REDACTED",s.IN_CLOUD,s),"IN_CLOUD"));
test("device rejects cloud",()=>assert.throws(()=>confirmSource("DEVICE_ONLY",s.IN_CLOUD,s)));
test("missing source fails closed",()=>assert.throws(()=>confirmSource("REVIEW_REDACTED",undefined,s)));
test("blocked route cannot return evidence",()=>assert.throws(()=>confirmSource("BLOCK",s.ON_DEVICE,s)));

test("cloud-only accepts only reported cloud provenance",()=>assert.equal(confirmSource("REVIEW_REDACTED_CLOUD",s.IN_CLOUD,s),"IN_CLOUD"));
test("cloud-only rejects device provenance",()=>assert.throws(()=>confirmSource("REVIEW_REDACTED_CLOUD",s.ON_DEVICE,s)));
