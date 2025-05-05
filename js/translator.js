function translate() {
  const text = document.getElementById('input').value;
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: `Translate this to Russian: ${text}`}]
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('output').innerText = data.choices[0].message.content;
  });
}

function speak(lang) {
  const text = lang === 'en' ? document.getElementById('input').value : document.getElementById('output').innerText;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang === 'en' ? 'en-US' : 'ru-RU';
  speechSynthesis.speak(utter);
}
