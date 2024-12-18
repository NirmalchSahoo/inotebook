const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Nisghcdeybue@#ghty';

const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and and id to req object
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: 'Please authenticate using avalid token' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using avalid token' });
  }
};

module.exports = fetchUser;
