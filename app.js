const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');
const commitRoutes = require('./routes/commitRoutes');  // Routes for commits
const repositoryRoutes = require('./routes/repositoryRoutes');  // Separate routes for repositories
const auth = require('./middleware/auth');
const methodOverride = require('method-override');


app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'yourSecretKey', resave: false, saveUninitialized: false }));

// Connect to MongoDB
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB:', error));

// Route setup
app.use('/', userRoutes);  // Routes for user login/signup

//Serve Static Files in Express
app.use(express.static('public'));


// Protect repository and commit routes with authentication
app.use('/repositories', repositoryRoutes);  // Separate routes for repository-related actions
app.use('/commits', auth, commitRoutes);  // Routes for commit-related actions

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
