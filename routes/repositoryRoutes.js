
const express = require('express');
const router = express.Router();
const repositoryController = require('../controllers/repositoryController');
const auth = require('../middleware/auth');

// Logout route - must be before any dynamic routes to avoid conflicts
router.get('/logout', auth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/'); // Redirect to home page after logout
  });
});

// Route to display the repositories for the logged-in user
router.get('/', auth, repositoryController.getRepositories);

// Route to view repository details for /repositories/:repoName/view
router.get('/:repoName/view', auth, repositoryController.viewRepository);


// Route to render the add code form for a specific repository
router.get('/:repoName/add-code', auth, repositoryController.getAddCodeForm);

// Route to handle the form submission for adding code to a repository
router.post('/:repoName/add-code', auth, repositoryController.addCode);

// Route to handle the form submission for creating a new repository
router.post('/create', auth, repositoryController.createRepository);

// Route to view repository details
router.get('/:repoName', auth, repositoryController.viewRepository);

// Route to delete a repository
router.delete('/:repoId', auth, repositoryController.deleteRepository);

module.exports = router;
