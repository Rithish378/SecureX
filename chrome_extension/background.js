// Import the crypto library for encryption
importScripts("lib/crypto-js.js");
importScripts("lib/sha256.js");

const maliciousUrls = ["http://malicious.com", "http://phishing.com"];

chrome.runtime.onInstalled.addListener(() => {
  console.log("SecureX Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "encryptImage") {
    // Handle image encryption
    const encryptedImage = CryptoJS.AES.encrypt(request.imageData, 'secret-key').toString();
    sendResponse({ encryptedImage });
  } else if (request.type === "hashPassword") {
    // Handle password hashing
    const hashedPassword = CryptoJS.SHA256(request.password).toString();
    sendResponse({ hashedPassword });
  } else if (request.type === "encryptData") {
    // Handle data encryption
    const encryptedData = CryptoJS.AES.encrypt(request.data, 'secret-key').toString();
    sendResponse({ encryptedData });
  } else if (request.type === "authenticate") {
    // Handle authentication
    chrome.storage.local.get(['username', 'password'], result => {
      if (result.username === request.username && result.password === CryptoJS.SHA256(request.password).toString()) {
        sendResponse({ authenticated: true });
      } else {
        sendResponse({ authenticated: false });
      }
    });
  } else if (request.type === "checkMalware") {
    // Check if the URL is malicious
    const isMalware = maliciousUrls.includes(request.url);
    sendResponse({ isMalware });
  } else if (request.type === "faceAuthenticate") {
    // Simulated face authentication
    if (request.faceData === "sample_face") {
      sendResponse({ authenticated: true });
    } else {
      sendResponse({ authenticated: false });
    }
  }
  return true; // Indicates response will be sent asynchronously
});
