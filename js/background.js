chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy",
    title: "Copy CSS Selector",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copy") {
    chrome.tabs.sendMessage(tab.id, { target: "copy" });
  }
});
