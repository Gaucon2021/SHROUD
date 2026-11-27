// Explicit device-only versus redacted hybrid routing. Pattern detection is incomplete by design.
export function prepare(document, mode, consent) {
  if(typeof document!=="string"||!document.trim()||document.length>12000) return {decision:"BLOCK",reason:"Invalid or oversized document"};
  if(mode==="device")return {decision:"DEVICE_ONLY",payload:document,findings:[]};
  if(!["hybrid","cloud"].includes(mode)||consent!==true)return {decision:"BLOCK",reason:"Explicit cloud consent required"};
  const patterns=[["SECRET",/(?:\b(?:sk-|gh[pousr]_|github_pat_|AIza)[A-Za-z0-9_-]{8,}|\b(?:api[_-]?key|access[_-]?token|password)\s*[:=]\s*["\x27]?[^\s"\x27,;]{8,}|\bbearer\s+[A-Za-z0-9._~-]{8,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/gi],["EMAIL",/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi],["PHONE",/(?<!\d)(?:\+84|0)(?:[ .-]?\d){9}(?!\d)/g],["CARD",/(?<!\d)(?:\d[ -]?){13,19}(?!\d)/g]];
  // Normalize compatibility characters before cloud review, including full-width ASCII.
  let payload=document.normalize("NFKC").replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g,"");const findings=[];
  for(const [type,pattern] of patterns){let count=0;payload=payload.replace(pattern,()=>"[REDACTED_"+type+"_"+(++count)+"]");if(count)findings.push({type,count});}
  if(findings.some(f=>f.type==="SECRET"))return {decision:"BLOCK",reason:"Possible secret detected",findings};
  return {decision:mode==="cloud"?"REVIEW_REDACTED_CLOUD":"REVIEW_REDACTED",payload,findings};
}
export async function receipt(payload,source){const bytes=await globalThis.crypto.subtle.digest("SHA-256",new TextEncoder().encode(payload));return {sha256:Array.from(new Uint8Array(bytes),n=>n.toString(16).padStart(2,"0")).join(""),source};}
