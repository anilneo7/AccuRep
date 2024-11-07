const Repository = require('../models/repository');  // Make sure this path matches your repository model
const { v4: uuidv4 } = require('uuid'); // for generating unique commit IDs
const Commit = require('../models/commit');

// Display repositories for the logged-in user
exports.getRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find({ userId: req.session.user._id });
    res.render('repositories', { repos: repositories });
  } catch (error) {
    res.status(500).send('Error retrieving repositories');
  }
};

// Controller for deleting a repository
exports.deleteRepository = async (req, res) => {
  try {
    const repoId = req.params.repoId;
    await Repository.findByIdAndDelete(repoId);
    res.redirect('/repositories'); // Redirect to the list of repositories after deletion
  } catch (error) {
    console.error('Error deleting repository:', error);
    res.status(500).send('Error deleting repository');
  }
};



// Controller for viewing repository details
exports.viewRepository = async (req, res) => {
  try {
    const repoName = req.params.repoName;
    const repository = await Repository.findOne({ name: repoName });
    if (!repository) {
      return res.status(404).send('Repository not found');
    }
    res.render('repositoryDetails', { repository });
  } catch (error) {
    res.status(500).send('Error retrieving repository');
  }
};



// Display repositories for the logged-in user
exports.getRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find({ userId: req.session.user._id });
    res.render('repositories', { repos: repositories });  // "repos" matches with EJS code
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving repositories');
  }
};



// Create a new repository
exports.createRepository = async (req, res) => {
  try {
    const { name } = req.body;
    const repository = new Repository({ name, userId: req.session.user._id });
    await repository.save();
    res.redirect('/repositories');  // Redirect back to the list of repositories
  } catch (error) {
    res.status(500).send('Error creating repository');
  }
};

// Render the "Add Code" form
exports.getAddCodeForm = (req, res) => {
  const repoName = req.params.repoName;
  res.render('add-code', { repoName });  // Render the form with the repository name
};

// Route handler for adding code with a commit message
exports.addCode = async (req, res) => {
  try {
    const { repoName } = req.params;
    const { code, commitMessage } = req.body;

    // Find repository by name and user ID
    const repository = await Repository.findOne({ name: repoName, userId: req.session.user._id });
    
    if (!repository) {
      return res.status(404).send('Repository not found');
    }

    // Create a new commit object with a unique ID
    const commit = {
      id: uuidv4(),      // Unique commit ID
      message: commitMessage,
      codeContent: code,
      createdAt: new Date(),
    };

    // Add the new commit to the repository
    repository.commits.push(commit);
    await repository.save();

    // Redirect to the repository's detail page
    res.redirect(`/repositories/${repoName}`);
  } catch (error) {
    console.error('Error adding code to repository:', error);
    res.status(500).send('Error adding code to repository');
  }
};

// Route handler to view repository details and commit history
exports.viewRepository = async (req, res) => {
  try {
    const { repoName } = req.params;
    const repository = await Repository.findOne({ name: repoName, userId: req.session.user._id });

    if (!repository) {
      return res.status(404).send('Repository not found');
    }

    res.render('repositoryDetail', { repository });
  } catch (error) {
    console.error('Error fetching repository details:', error);
    res.status(500).send('Error fetching repository details');
  }
};
