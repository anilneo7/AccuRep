const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user = user;
    res.redirect('/repositories');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
      req.session.user = user;
      res.redirect('/repositories');
    } else {
      res.status(400).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send('Error logging in.');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  
  // Fetch the user from the database
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.render('login', { error: 'Invalid username or password' });
  }
  
  // Set session user
  req.session.user = user;

  // Redirect to repositories page after successful login
  res.redirect('/repositories');
};
