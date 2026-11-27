// Only public Firebase web identifiers are accepted. Never persist the configuration.
export function validatePublicConfig(config,siteKey){
 if(!config||typeof config!=="object"||Array.isArray(config))throw Error("Expected a Firebase web configuration object.");
 const {apiKey,projectId,appId}=config;
 if(typeof apiKey!=="string"||!/^AIza[A-Za-z0-9_-]{35}$/.test(apiKey))throw Error("Expected the public Firebase web API key, not a Gemini secret.");
 if(typeof projectId!=="string"||!(/^[a-z][a-z0-9-]{4,28}[a-z0-9]$/).test(projectId))throw Error("Invalid Firebase project ID.");
 if(typeof appId!=="string"||!/^1:[0-9]+:web:[a-fA-F0-9]+$/.test(appId))throw Error("Expected a Firebase Web app ID.");
 if(typeof siteKey!=="string"||!(/^[A-Za-z0-9_-]{20,200}$/).test(siteKey))throw Error("Expected the public reCAPTCHA Enterprise site key.");
 const allowed=new Set(["apiKey","projectId","appId","authDomain","storageBucket","messagingSenderId","measurementId","databaseURL"]);
 if(Object.keys(config).some(key=>!allowed.has(key)))throw Error("Unexpected configuration field. Paste only the Firebase web config.");
 return {config:{apiKey,projectId,appId},siteKey};
}
