const Transcription = require('../models/Transcription');
const { parseId, validateTranscription } = require('../utils/validation');

async function list(_req, res, next) {
  try {
    const records = await Transcription.findAll({
      order: [['updatedAt', 'DESC'], ['id', 'DESC']],
      attributes: ['id', 'title', 'text', 'language', 'createdAt', 'updatedAt']
    });
    res.json(records);
  } catch (error) { next(error); }
}

async function getById(req, res, next) {
  try {
    const record = await Transcription.findByPk(parseId(req.params.id));
    if (!record) return res.status(404).json({ error: 'Transcription not found.' });
    res.json(record);
  } catch (error) { next(error); }
}

async function create(req, res, next) {
  try {
    const record = await Transcription.create(validateTranscription(req.body));
    res.status(201).json(record);
  } catch (error) { next(error); }
}

async function update(req, res, next) {
  try {
    const record = await Transcription.findByPk(parseId(req.params.id));
    if (!record) return res.status(404).json({ error: 'Transcription not found.' });
    await record.update(validateTranscription(req.body));
    res.json(record);
  } catch (error) { next(error); }
}

async function remove(req, res, next) {
  try {
    const record = await Transcription.findByPk(parseId(req.params.id));
    if (!record) return res.status(404).json({ error: 'Transcription not found.' });
    await record.destroy();
    res.status(204).end();
  } catch (error) { next(error); }
}

module.exports = { list, getById, create, update, remove };
