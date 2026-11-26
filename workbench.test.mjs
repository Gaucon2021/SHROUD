import {test} from "node:test";
import assert from "node:assert/strict";
import {prepare} from "./workbench.mjs";
test("device only never enables hybrid",()=>assert.equal(prepare("a@example.com","device",true).decision,"DEVICE_ONLY"));
test("consent is strict",()=>assert.equal(prepare("hello","hybrid","true").decision,"BLOCK"));
test("secret fails closed",()=>assert.equal(prepare("api_key=abcdefghijk","hybrid",true).decision,"BLOCK"));
test("email and phone are removed",()=>{const r=prepare("alex@example.com 0912345678","hybrid",true);assert.equal(r.findings.length,2);assert.ok(!r.payload.includes("alex@"));assert.ok(!r.payload.includes("0912345678"));});
test("oversized input rejected",()=>assert.equal(prepare("x".repeat(12001),"device",false).decision,"BLOCK"));
test("unknown routing fails",()=>assert.equal(prepare("hello","other",true).decision,"BLOCK"));
