async function injectScript(){let e=await chrome.tabs.query({active:!0,lastFocusedWindow:!0});chrome.scripting.executeScript({target:{tabId:e[0].id,allFrames:!0},files:["scripts/content.js"]}).then((e=>{console.log("[Popup] done")}))}console.log("[Popup] this is popup script"),injectScript();const form=document.forms.apiKeyForm;chrome.storage.local.get(["key"],(e=>{const o=e.key.apiKey;console.log("[Popup] ApiKey value: "+o),o&&(form.apiKey.value=o)})),form.addEventListener("submit",(e=>{e.preventDefault();const o={apiKey:form.apiKey.value};chrome.storage.local.set({key:o},(()=>{console.log("[Popup] Updated store")}))}));