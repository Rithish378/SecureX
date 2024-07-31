document.getElementById('loginButton').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  chrome.runtime.sendMessage({ type: "authenticate", username, password }, response => {
    document.getElementById('authResult').innerText = response.authenticated ? "Login Successful" : "Login Failed";
  });
});

document.getElementById('encryptDataButton').addEventListener('click', () => {
  const data = document.getElementById('dataInput').value;
  chrome.runtime.sendMessage({ type: "encryptData", data }, response => {
    document.getElementById('encryptedData').value = response.encryptedData;
  });
});

document.getElementById('encryptButton').addEventListener('click', () => {
  const fileInput = document.getElementById('imageInput');
  const file = fileInput.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      chrome.runtime.sendMessage({ type: "encryptImage", imageData }, response => {
        document.getElementById('encryptedImage').value = response.encryptedImage;
      });
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('hashButton').addEventListener('click', () => {
  const password = document.getElementById('passwordInput').value;
  chrome.runtime.sendMessage({ type: "hashPassword", password }, response => {
    document.getElementById('hashedPassword').value = response.hashedPassword;
  });
});

document.getElementById('faceAuthButton').addEventListener('click', () => {
  const fileInput = document.getElementById('faceInput');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const faceData = reader.result;
      // For simplicity, we simulate face data comparison
      const simulatedFaceData = "sample_face"; // This should be a result from an actual face recognition API
      chrome.runtime.sendMessage({ type: "faceAuthenticate", faceData: simulatedFaceData }, response => {
        document.getElementById('faceAuthResult').innerText = response.authenticated ? "Face Authentication Successful" : "Face Authentication Failed";
      });
    };
    reader.readAsDataURL(file);
  }
});
