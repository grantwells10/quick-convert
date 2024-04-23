console.log("[Popup] this is popup script");

async function injectScript() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  chrome.scripting.executeScript({
    target: {tabId: tabs[0].id, allFrames: true},
    files: ["scripts/content.js"],
  }).then(injectionResults => {
    console.log("[Popup] done");
  });
}
injectScript();

const form = document.forms["apiKeyForm"];
chrome.storage.local.get(["key"], (result) => {
  const localApiKey = result.key["apiKey"];
  console.log("[Popup] ApiKey value: " + localApiKey);
  if (localApiKey) {
    form.apiKey.value = localApiKey;
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiKey = form.apiKey.value;
  const store = { apiKey: apiKey };
  chrome.storage.local.set({key: store}, () => {
    console.log("[Popup] Updated store");
  }) 
})
