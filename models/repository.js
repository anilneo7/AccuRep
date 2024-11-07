const mongoose = require('mongoose');

// Define the commit schema
const commitSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  codeContent: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Define the repository schema
const repositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  commits: {
    type: [commitSchema], // Array of commit objects
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the repository model
module.exports = mongoose.model('Repository', repositorySchema);
