export function confirmSource(decision,source,sources){
 if(!sources||typeof sources.ON_DEVICE!=="string"||typeof sources.IN_CLOUD!=="string"||sources.ON_DEVICE===sources.IN_CLOUD)throw Error("SDK source enum unavailable");
 if(!["DEVICE_ONLY","REVIEW_REDACTED","REVIEW_REDACTED_CLOUD"].includes(decision))throw Error("Policy blocked");
 if(source!==sources.ON_DEVICE&&source!==sources.IN_CLOUD)throw Error("Inference provenance unavailable");
 if(decision==="DEVICE_ONLY"&&source!==sources.ON_DEVICE)throw Error("Device-only provenance unavailable");
 if(decision==="REVIEW_REDACTED_CLOUD"&&source!==sources.IN_CLOUD)throw Error("Cloud-only provenance unavailable");
 return source===sources.ON_DEVICE?"ON_DEVICE":"IN_CLOUD";
}
