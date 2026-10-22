function notFound(_req, res) {
  res.status(404).json({ error: 'API route not found.' });
}

function errorHandler(error, _req, res, _next) {
  console.error(error);
  if (error.status) return res.status(error.status).json({ error: error.message });
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }
  res.status(500).json({ error: 'Server could not complete the request.' });
}

module.exports = { notFound, errorHandler };
