function getDirection() {
  return document.querySelector('input[name=langdir]:checked').value;
}

function translate() {
  const direction = getDirection();
  const text = document.getElementById('input').value;
  const prompt = direction === 'en-ru'
    ? `Translate this to Russian: ${text}`
    : `Translate this to English: ${text}`;

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt}]
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('output').innerText = data.choices[0].message.content;
  });
}

function speak(field) {
  const text = document.getElementById(field).value || document.getElementById(field).innerText;
  const direction = getDirection();
  const lang = (field === 'input')
    ? (direction === 'en-ru' ? 'en-US' : 'ru-RU')
    : (direction === 'en-ru' ? 'ru-RU' : 'en-US');

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  speechSynthesis.speak(utter);
}
