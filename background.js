// This function is called when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item
  // See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#method-create
  chrome.contextMenus.create({
    id: "exampleContextMenu", // Unique identifier for the context menu item
    title: "Context Menu", // Text to be displayed in the context menu
    contexts: ["selection"], // Show the context menu item only when text is selected
  });
});

// This function is called when a context menu item is clicked
// See: https://developer.chrome.com/docs/extensions/reference/api/contextMenus#event-onClicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Check if the clicked menu item is 'exampleContextMenu'
  if (info.menuItemId === "exampleContextMenu") {
    const selectedText = info.selectionText; // Get the selected text
    console.log(Date.now(), "Selected text: ", selectedText);
  }
});



function getGPTResponse(apiKey, message, sendResponse) {
  let data = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": message}]
  }
  let requestBody = JSON.stringify(data);
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    body: requestBody
  }).then(res => res.json()).then((res) => {
    var result = "No response";
    if (res.choices) {
      result = res.choices[0].message.content;
    }
    console.log("[Background] sending response: " + result);
    sendResponse({ result: result });
  }).catch(err => {
    console.log("error: " + err);
  })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
if (request.type === "getResponse") {
  console.log("[Background] Getting response");
  chrome.storage.local.get(["key"]).then((storageRes) => {
    const localApiKey = storageRes.key["apiKey"];
    console.log("[Background] API_KEY: " + localApiKey);
    const selection = request.selection;
    console.log("[Background] selection: " + selection);
    getGPTResponse(localApiKey, selection, sendResponse);
  });
}
return true;
});

console.log("[Background] Loaded script");
