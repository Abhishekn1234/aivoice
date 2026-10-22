function validateTranscription(body) {
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  if (!text) throw Object.assign(new Error('Transcript text is required.'), { status: 400 });
  if (text.length > 60000) throw Object.assign(new Error('Transcript must be 60,000 characters or fewer.'), { status: 400 });
  const language = typeof body.language === 'string' ? body.language.trim().slice(0, 16) : 'en-IN';
  const suppliedTitle = typeof body.title === 'string' ? body.title.trim() : '';
  const title = (suppliedTitle || text.split(/[.!?\n]/)[0] || 'Voice note').slice(0, 120);
  return { title, text, language: language || 'en-IN' };
}

function parseId(raw) {
  const id = Number(raw);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw Object.assign(new Error('Invalid transcription ID.'), { status: 400 });
  }
  return id;
}

module.exports = { validateTranscription, parseId };
