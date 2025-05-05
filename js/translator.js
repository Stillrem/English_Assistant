function translate() {
  const text = document.getElementById('input').value;
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
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