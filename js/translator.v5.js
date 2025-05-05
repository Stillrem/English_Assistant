async function speak(field) {
  const input = document.getElementById(field);
  const text = input.value || input.innerText;
  const direction = document.querySelector('input[name=langdir]:checked').value;
  const lang = (field === 'input')
    ? (direction === 'en-ru' ? 'en' : 'ru')
    : (direction === 'en-ru' ? 'ru' : 'en');

  const voiceId = lang === 'en' ? '21m00Tcm4TlvDq8ikWAM' : 'EXAVITQu4vr4xnSDxMaL'; // Rachel / Dmitry
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'xi-api-key': 'sk_b29c85460c5e3f1e52c3bd05105d621a6c69302638168152',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.4, similarity_boost: 0.75 }
    })
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const player = document.getElementById('player');
  player.src = url;
  player.style.display = 'block';
  player.play();
}

function translate() {
  const direction = document.querySelector('input[name=langdir]:checked').value;
  const text = document.getElementById('input').value.trim();
  const prompt = direction === 'en-ru'
    ? `Переведи это на разговорный русский: "${text}"`
    : `Translate this to natural, conversational English: "${text}"`;

  document.getElementById('output').innerText = 'Переводим...';

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const result = data.choices[0].message.content.trim();
    document.getElementById('output').innerText = result;
  })
  .catch(error => {
    document.getElementById('output').innerText = 'Ошибка перевода';
    console.error(error);
  });
}
