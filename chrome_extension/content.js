chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "checkMalware") {
    // Simplified check for demonstration purposes
    const isMalware = request.url.includes("malicious");
    sendResponse({ isMalware });
  }
});
