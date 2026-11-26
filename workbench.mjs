// Explicit device-only versus redacted hybrid routing. Pattern detection is incomplete by design.
export function prepare(document, mode, consent) {
  if(typeof document!=="string"||!document.trim()||document.length>12000) return {decision:"BLOCK",reason:"Invalid or oversized document"};
  if(mode==="device")return {decision:"DEVICE_ONLY",payload:document,findings:[]};
  if(mode!=="hybrid"||consent!==true)return {decision:"BLOCK",reason:"Explicit hybrid consent required"};
  const patterns=[["SECRET",/\b(?:sk-|api[_-]?key\s*[:=]\s*|bearer\s+)[A-Za-z0-9_-]{8,}/gi],["EMAIL",/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi],["PHONE",/(?<!\d)(?:\+84|0)\d{9}(?!\d)/g],["CARD",/(?<!\d)(?:\d[ -]?){13,19}(?!\d)/g]];
  let payload=document;const findings=[];
  for(const [type,pattern] of patterns){let count=0;payload=payload.replace(pattern,()=>"[REDACTED_"+type+"_"+(++count)+"]");if(count)findings.push({type,count});}
  if(findings.some(f=>f.type==="SECRET"))return {decision:"BLOCK",reason:"Possible secret detected",findings};
  return {decision:"REVIEW_REDACTED",payload,findings};
}
export async function receipt(payload,source){const bytes=await globalThis.crypto.subtle.digest("SHA-256",new TextEncoder().encode(payload));return {sha256:Array.from(new Uint8Array(bytes),n=>n.toString(16).padStart(2,"0")).join(""),source};}
