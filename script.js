
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const micBtn = document.getElementById("micBtn");
const speakOriginalBtn = document.getElementById("speakOriginalBtn");
const speakTranslatedBtn = document.getElementById("speakTranslatedBtn");
const swapBtn = document.getElementById("swapBtn");

swapBtn.onclick = () => {
  const temp = fromLang.value;
  fromLang.value = toLang.value;
  toLang.value = temp;
};

translateBtn.onclick = async () => {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Translate from ${fromLang.value} to ${toLang.value}: ${inputText.value}`
      }]
    })
  });
  const data = await res.json();
  outputText.value = data.choices[0].message.content.trim();
};

micBtn.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = fromLang.value === "auto" ? "en-US" : fromLang.value;
  recognition.onresult = (event) => {
    inputText.value = event.results[0][0].transcript;
  };
  recognition.onerror = (e) => alert("Speech recognition error: " + e.error);
  recognition.start();
};

speakOriginalBtn.onclick = () => {
  const utter = new SpeechSynthesisUtterance(inputText.value);
  utter.lang = fromLang.value === "ru" ? "ru-RU" : "en-US";
  speechSynthesis.speak(utter);
};

speakTranslatedBtn.onclick = () => {
  const utter = new SpeechSynthesisUtterance(outputText.value);
  utter.lang = toLang.value === "ru" ? "ru-RU" : "en-US";
  speechSynthesis.speak(utter);
};
