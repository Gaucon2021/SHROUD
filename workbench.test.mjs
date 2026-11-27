import {test} from "node:test";
import assert from "node:assert/strict";
import {prepare} from "./workbench.mjs";
test("device only never enables hybrid",()=>assert.equal(prepare("a@example.com","device",true).decision,"DEVICE_ONLY"));
test("consent is strict",()=>assert.equal(prepare("hello","hybrid","true").decision,"BLOCK"));
test("secret fails closed",()=>assert.equal(prepare("api_key=abcdefghijk","hybrid",true).decision,"BLOCK"));
test("email and phone are removed",()=>{const r=prepare("alex@example.com 0912345678","hybrid",true);assert.equal(r.findings.length,2);assert.ok(!r.payload.includes("alex@"));assert.ok(!r.payload.includes("0912345678"));});
test("oversized input rejected",()=>assert.equal(prepare("x".repeat(12001),"device",false).decision,"BLOCK"));
test("unknown routing fails",()=>assert.equal(prepare("hello","other",true).decision,"BLOCK"));

test("formatted Vietnamese phone redacted",()=>{const r=prepare("Phone: +84 912-345-678","hybrid",true);assert.ok(!r.payload.includes("912"));});
test("full-width email normalized and redacted",()=>{const r=prepare("ａｌｅｘ＠ｅｘａｍｐｌｅ．ｃｏｍ","hybrid",true);assert.equal(r.payload,"[REDACTED_EMAIL_1]");});
test("JWT bearer token blocked",()=>assert.equal(prepare("Bearer abcdefgh.ijklmnop.qrstuvwx","hybrid",true).decision,"BLOCK"));
test("private key marker blocked",()=>assert.equal(prepare("-----BEGIN PRIVATE KEY-----","hybrid",true).decision,"BLOCK"));
test("GitHub token prefix blocked",()=>assert.equal(prepare("ghp_abcdefghijklmnop","hybrid",true).decision,"BLOCK"));

test("invisible separator cannot bypass email redaction",()=>assert.equal(prepare("alex\u200b@example.com","hybrid",true).payload,"[REDACTED_EMAIL_1]"));
test("invisible separator cannot bypass secret detection",()=>assert.equal(prepare("ghp_abc\u200bdefghijklmnop","hybrid",true).decision,"BLOCK"));
test("device mode preserves original formatting",()=>assert.equal(prepare("a\u200bb","device",false).payload,"a\u200bb"));
