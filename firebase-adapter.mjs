import {validatePublicConfig} from './firebase-config.mjs';
import {confirmSource} from './runtime-policy.mjs';
import {buildPrompt} from './product.mjs';
// Firebase JS SDK v12.14.0. No API or billing project is provisioned by this app.
import {initializeApp,deleteApp} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {initializeAppCheck,ReCaptchaEnterpriseProvider,getToken} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app-check.js";
import {getAI,getGenerativeModel,GoogleAIBackend,InferenceMode,InferenceSource} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-ai.js";
let initialized;
export async function connect(config,siteKey) {
  if(initialized)throw new Error("Reload to change Firebase configuration.");
  const checked=validatePublicConfig(config,siteKey);
  const app=initializeApp(checked.config,"shroud");
  try {
    const appCheck=initializeAppCheck(app,{provider:new ReCaptchaEnterpriseProvider(checked.siteKey),isTokenAutoRefreshEnabled:true});
    const token=await getToken(appCheck);
    if(!token||typeof token.token!=="string"||!token.token)throw Error("App Check attestation unavailable.");
    initialized=getAI(app,{backend:new GoogleAIBackend()});
    return {appCheck:"TOKEN_OBTAINED"};
  } catch(error) {
    await deleteApp(app).catch(()=>{});
    throw new Error("App Check initialization or attestation failed. Check the registered web app, authorized domain and site key.");
  }
}
export async function infer(payload,decision,progress,task='summary') {
  if(!initialized)throw new Error("Connect Firebase first.");
  if(!["DEVICE_ONLY","REVIEW_REDACTED","REVIEW_REDACTED_CLOUD"].includes(decision))throw new Error("Policy blocked.");
  const mode=decision==="DEVICE_ONLY"?InferenceMode.ONLY_ON_DEVICE:decision==="REVIEW_REDACTED_CLOUD"?InferenceMode.ONLY_IN_CLOUD:InferenceMode.PREFER_ON_DEVICE;
  if(typeof mode!=="string")throw Error("Requested SDK inference mode unavailable.");
  // Pin the supported no-billing cloud model instead of the retired SDK default.
  const model=getGenerativeModel(initialized,decision==="DEVICE_ONLY"?{mode}:{mode,inCloudParams:{model:"gemini-3.5-flash-lite"}});
  if(decision!=="REVIEW_REDACTED_CLOUD"){
    const initialization=model.initializeDeviceModel(progress);
    if(decision==="DEVICE_ONLY")await initialization;
    else initialization.catch(()=>{});
  }
  const prompt=buildPrompt(payload,task);
  const result=await model.generateContent(prompt);
  const source=confirmSource(decision,result.response.inferenceSource,InferenceSource);
  return {source,text:result.response.text(),prompt};
}
