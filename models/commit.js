const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
  repository: { type: String, required: true },
  message: { type: String, required: true },
  code: { type: String, required: true },  // New field to store code content
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Commit', commitSchema);
