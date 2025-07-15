/* global SelectorGenerator */
let clickedElement;

document.addEventListener("contextmenu", (event) => {
  clickedElement = event.target;
  console.log("Clicked element (contextmenu):", clickedElement);
}, true);

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("Copied to clipboard:", text);
  }).catch(err => {
    console.error("Clipboard write failed:", err);
  });
}

chrome.runtime.onMessage.addListener((request) => {
  if (request && request.target === "copy") {
    if (!clickedElement) {
      console.warn("No element was clicked before copying!");
      return;
    }

    let selectorGenerator = new SelectorGenerator({
      querySelectorAll: window.document.querySelectorAll.bind(window.document)
    });

    let selector = selectorGenerator.getSelector(clickedElement);
    console.log("Generated selector:", selector);

    copyToClipboard(selector);
  }
});
