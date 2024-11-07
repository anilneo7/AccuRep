const express = require('express');
const router = express.Router();
const commitController = require('../controllers/commitController');

// Repository routes
router.post('/repository', commitController.createRepository);

// Route to show repositories (GET /repositories)
router.get('/', commitController.getRepositories);

// Commit routes
router.post('/commit', commitController.createCommit);
router.get('/commits/:repository', commitController.getCommits);
router.delete('/commit/:id', commitController.deleteCommit);

router.post('/create', commitController.createRepository);

// Render form to add code
router.get('/:repository/add-code', commitController.renderAddCode);

// Handle form submission for commit
router.post('/:repository/add-code', commitController.addCodeCommit);  



module.exports = router;