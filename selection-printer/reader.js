document.addEventListener("DOMContentLoaded", async () => {
  const data = await chrome.storage.local.get("selectedText");
  const contentDiv = document.getElementById("content");

  if (data.selectedText) {
    contentDiv.textContent = data.selectedText;
  } else {
    contentDiv.textContent = "No text selected.";
  }

  // Optional: Read aloud feature using Web Speech API
  document.getElementById("speak-btn").addEventListener("click", () => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(contentDiv.textContent);
    window.speechSynthesis.speak(utterance);
  });

  // Optional: Trigger browser print dialog
  document.getElementById("print-btn").addEventListener("click", () => {
    window.print();
  });
});