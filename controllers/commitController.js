const Commit = require('../models/commit');

// // Create a new repository (optional, placeholder logic)
// exports.createRepository = (req, res) => {
//   const repoName = req.body.repository;
//   // You could add repository tracking logic here
//   res.status(201).json({ message: `Repository ${repoName} created.` });
// };

// Create repository (optional feature)
exports.createRepository = async (req, res) => {
  const { repoName } = req.body;

  if (repoName) {
    // Placeholder commit to represent a new repository entry
    const commit = new Commit({
      repository: repoName,
      message: "Repository initialized",
      userId: req.session.user._id,
    });
    await commit.save();
  }
  res.redirect('/repositories');
};


// // Create a new commit
// exports.createCommit = async (req, res) => {
//   try {
//     const commit = new Commit({
//       repository: req.body.repository,
//       message: req.body.message,
//     });
//     await commit.save();
//     res.status(201).json({ message: 'Commit created.', commit });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create commit.' });
//   }
// };

exports.createCommit = async (req, res) => {
  try {
    const { repository, message } = req.body;

    const commit = new Commit({
      repository,
      message,
      userId: req.session.user._id,  // Associate commit with logged-in user
    });

    await commit.save();
    res.redirect(`/commits/${repository}`);
  } catch (error) {
    res.status(500).send('Error creating commit.');
  }
};


// List all commits in a repository
exports.getCommits = async (req, res) => {
  try {
    const commits = await Commit.find({
      repository: req.params.repository,
      userId: req.session.user._id,  // Only fetch commits belonging to this user
    });

    res.render('commits', { repository: req.params.repository, commits });
  } catch (error) {
    res.status(500).send('Error loading commits.');
  }
};



// Delete a commit
exports.deleteCommit = async (req, res) => {
  try {
    await Commit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Commit deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete commit.' });
  }
};

// exports.getRepositories = async (req, res) => {
//   const repos = await Commit.distinct('repository', { userId: req.session.user._id });
//   res.render('repositories', { repos });
// };
exports.getRepositories = async (req, res) => {
  try {
    // Get distinct repositories for the logged-in user
    const repos = await Commit.distinct('repository', { userId: req.session.user._id });

    res.render('repositories', { repos });
  } catch (error) {
    res.status(500).send('Error loading repositories.');
  }
};


exports.getCommits = async (req, res) => {
  try {
    const commits = await Commit.find({
      repository: req.params.repository,
      userId: req.session.user._id,  // Only fetch commits belonging to this user
    });

    res.render('commits', { repository: req.params.repository, commits });
  } catch (error) {
    res.status(500).send('Error loading commits.');
  }
};

// Render the form for adding code to a repository
exports.renderAddCode = (req, res) => {
  const { repository } = req.params;
  res.render('add-code', { repository });
};

// Save the code and commit message as a new commit
exports.addCodeCommit = async (req, res) => {
  try {
    const { repository } = req.params;
    const { message, code } = req.body;

    const commit = new Commit({
      repository,
      message,
      code,
      userId: req.session.user._id,
    });

    await commit.save();

    // Redirect to the commits page for the repository
    res.redirect(`/commits/${repository}`);
  } catch (error) {
    res.status(500).send('Error committing code.');
  }
};

