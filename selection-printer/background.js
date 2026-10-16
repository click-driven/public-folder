chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-selection-tab",
    title: "Open selection in new tab",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "open-selection-tab" && info.selectionText) {
    // Store text temporarily so the new tab can access it
    await chrome.storage.local.set({ selectedText: info.selectionText });
    
    // Open internal reader page in a new tab
    chrome.tabs.create({ url: "reader.html" });
  }
});